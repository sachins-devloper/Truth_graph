import OpenAI from 'openai';

const LLM_API_KEY = process.env.LLM_API_KEY || process.env.NVIDIA_API_KEY || '';
const LLM_BASE_URL =
  process.env.LLM_BASE_URL ||
  (process.env.NVIDIA_API_KEY ? 'https://integrate.api.nvidia.com/v1' : 'https://api.openai.com/v1');
const LLM_MODEL =
  process.env.LLM_MODEL ||
  (process.env.NVIDIA_API_KEY ? 'meta/llama-3.3-70b-instruct' : 'gpt-4o-mini');

export class LLMProvider {
  private openai: OpenAI | null = null;
  private model: string;

  constructor() {
    this.model = LLM_MODEL;
    if (LLM_API_KEY && LLM_API_KEY.trim().length > 0) {
      this.openai = new OpenAI({
        apiKey: LLM_API_KEY,
        baseURL: LLM_BASE_URL
      });
    }
  }

  public isAvailable(): boolean {
    return Boolean(this.openai);
  }

  public async generateStructuredJSON<T>(
    systemPrompt: string,
    userPrompt: string,
    fallbackValue: T
  ): Promise<T> {
    if (!this.openai) {
      console.warn('[LLMProvider] API key missing. Using fallback response.');
      return fallbackValue;
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt + '\nIMPORTANT: Respond ONLY with valid JSON. No markdown codeblocks or commentary.' },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0]?.message?.content || '';
      const cleaned = content.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
      return JSON.parse(cleaned) as T;
    } catch (err: any) {
      console.error('[LLMProvider] Generation failed:', err?.message || err);
      return fallbackValue;
    }
  }
}

export const llmProvider = new LLMProvider();
