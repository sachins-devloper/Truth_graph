import { Investigation } from '@/types';

export const DEMO_PRESETS: Investigation[] = [
  {
    id: 'demo-company-hiring-chennai',
    title: 'Company Hiring Verification: Backend Engineers in Chennai',
    original_question: 'Is Example Technologies currently hiring backend software engineers in Chennai?',
    category: 'job_company',
    status: 'completed',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    completed_at: new Date().toISOString(),
    queries: [
      { query: 'Example Technologies software engineer hiring Chennai', engine: 'google', purpose: 'Primary web verification' },
      { query: 'Example Technologies backend developer jobs Chennai', engine: 'google_jobs', purpose: 'Live job listings check' },
      { query: 'Example Technologies latest news hiring expansion', engine: 'google_news', purpose: 'Company press and announcements' },
      { query: 'Example Technologies office Chennai address', engine: 'google_maps', purpose: 'Physical office presence' }
    ],
    evidence_count: 7,
    contradiction_count: 1,
    report: {
      id: 'rep-demo-1',
      investigation_id: 'demo-company-hiring-chennai',
      title: 'Company Hiring Verification: Backend Engineers in Chennai',
      original_question: 'Is Example Technologies currently hiring backend software engineers in Chennai?',
      category: 'job_company',
      summary: 'Current active job listings confirm Example Technologies is hiring Backend Engineers in Chennai. However, one third-party listing shows an expired role date from 2025.',
      evidence_status: 'Supported by Multiple Sources',
      confidence_score: 0.84,
      confidence_label: 'Strong Evidence',
      key_findings: [
        'Official career portal lists active Senior Backend Engineer (Node.js/Python) position in OMR Chennai.',
        'Google Jobs retrieved 3 active listings posted within the last 14 days on LinkedIn and Naukri.',
        'Google Maps confirms verified physical office presence at DLF IT Park, Ramapuram, Chennai.',
        'Contradiction detected: Glassdoor third-party aggregator lists a closed posting dated November 2025.'
      ],
      supporting_evidence: [
        {
          id: 'ev-d1-1',
          investigation_id: 'demo-company-hiring-chennai',
          source_id: 'src-1',
          source_name: 'careers.example-tech.com',
          source_domain: 'example-tech.com',
          source_url: 'https://careers.example-tech.com/jobs/backend-engineer-chennai',
          source_type: 'official',
          title: 'Senior Backend Engineer - Chennai Office',
          snippet: 'Example Technologies is actively recruiting Senior Backend Engineers for our Cloud Services team in Chennai. Full-time role, hybrid work model at OMR Tech Park.',
          published_at: '2026-09-10',
          evidence_type: 'supporting',
          relevance_score: 0.98,
          summary: 'Official careers page actively accepts applications for Chennai backend roles.',
          search_engine: 'google',
          created_at: new Date().toISOString()
        },
        {
          id: 'ev-d1-2',
          investigation_id: 'demo-company-hiring-chennai',
          source_id: 'src-2',
          source_name: 'google_jobs',
          source_domain: 'linkedin.com',
          source_url: 'https://www.linkedin.com/jobs/view/example-tech-backend-chennai',
          source_type: 'company',
          title: 'Backend Software Engineer (Node.js) - Example Technologies',
          snippet: 'Posted 4 days ago. 120+ applicants. Chennai, Tamil Nadu. Requirements: 3+ years experience, PostgreSQL, Microservices.',
          published_at: '2026-09-16',
          evidence_type: 'supporting',
          relevance_score: 0.92,
          summary: 'LinkedIn active job posting verified via Google Jobs engine.',
          search_engine: 'google_jobs',
          created_at: new Date().toISOString()
        },
        {
          id: 'ev-d1-3',
          investigation_id: 'demo-company-hiring-chennai',
          source_id: 'src-3',
          source_name: 'google_maps',
          source_domain: 'maps.google.com',
          source_url: 'https://maps.google.com/?cid=849204829',
          source_type: 'business_listing',
          title: 'Example Technologies India Pvt Ltd - Chennai Branch',
          snippet: 'Location: Block 7, DLF IT Park, Mount Poonamallee Rd, Manapakkam, Chennai, Tamil Nadu 600089 | Rating: 4.4 (142 reviews)',
          published_at: null,
          evidence_type: 'supporting',
          relevance_score: 0.88,
          summary: 'Google Maps verified active office location in Chennai.',
          search_engine: 'google_maps',
          created_at: new Date().toISOString()
        }
      ],
      contradicting_evidence: [
        {
          id: 'ev-d1-4',
          investigation_id: 'demo-company-hiring-chennai',
          source_id: 'src-4',
          source_name: 'glassdoor.co.in',
          source_domain: 'glassdoor.co.in',
          source_url: 'https://www.glassdoor.co.in/Jobs/Example-Tech-Backend-Job-Expired',
          source_type: 'community',
          title: 'Expired Job: Backend Engineer at Example Tech Chennai',
          snippet: 'This listing has expired and is no longer taking applications as of November 28, 2025.',
          published_at: '2025-11-28',
          evidence_type: 'contradicting',
          relevance_score: 0.75,
          summary: 'Third-party job board shows an old expired listing from 2025.',
          search_engine: 'google',
          created_at: new Date().toISOString()
        }
      ],
      contradictions: [
        {
          id: 'con-demo-1',
          investigation_id: 'demo-company-hiring-chennai',
          claim_text: 'Active Backend Engineer job availability in Chennai',
          evidence_a: {
            source_name: 'careers.example-tech.com',
            source_url: 'https://careers.example-tech.com/jobs/backend-engineer-chennai',
            content: 'Active hiring posting published Sept 10, 2026.',
            date: '2026-09-10'
          },
          evidence_b: {
            source_name: 'glassdoor.co.in',
            source_url: 'https://www.glassdoor.co.in/Jobs/Example-Tech-Backend-Job-Expired',
            content: 'Expired job listing marked closed Nov 2025.',
            date: '2025-11-28'
          },
          explanation: 'The Glassdoor entry refers to a previous recruitment drive in late 2025, whereas the official website and LinkedIn show a newly opened headcount for September 2026.',
          status: 'resolved_outdated'
        }
      ],
      uncertainties: [
        'Total open headcount numbers are not publicly stated.',
        'Remote vs on-site policy details vary slightly between job aggregators.'
      ],
      sources: [
        { id: 's1', domain: 'example-tech.com', url: 'https://careers.example-tech.com/jobs/backend-engineer-chennai', title: 'Example Tech Official Careers', source_type: 'official', published_at: '2026-09-10' },
        { id: 's2', domain: 'linkedin.com', url: 'https://www.linkedin.com/jobs/view/example-tech-backend-chennai', title: 'LinkedIn Job Search', source_type: 'company', published_at: '2026-09-16' },
        { id: 's3', domain: 'maps.google.com', url: 'https://maps.google.com/?cid=849204829', title: 'Google Maps Business Directory', source_type: 'business_listing', published_at: null },
        { id: 's4', domain: 'glassdoor.co.in', url: 'https://www.glassdoor.co.in/Jobs/Example-Tech-Backend-Job-Expired', title: 'Glassdoor Aggregator', source_type: 'community', published_at: '2025-11-28' }
      ],
      search_coverage: [
        { engine: 'google', queried: true, results_count: 8, queries_performed: ['Example Technologies software engineer hiring Chennai'] },
        { engine: 'google_news', queried: true, results_count: 4, queries_performed: ['Example Technologies latest news hiring expansion'] },
        { engine: 'google_jobs', queried: true, results_count: 6, queries_performed: ['Example Technologies backend developer jobs Chennai'] },
        { engine: 'google_maps', queried: true, results_count: 2, queries_performed: ['Example Technologies office Chennai address'] },
        { engine: 'google_shopping', queried: false, results_count: 0, queries_performed: [] }
      ],
      next_verification_steps: [
        'Apply directly via the official company portal (careers.example-tech.com).',
        'Contact internal engineering recruiters on LinkedIn to confirm current hiring velocity.'
      ],
      timeline: [
        { date: '2025-11-28', title: 'Previous hiring cycle closed', source_name: 'Glassdoor', url: 'https://www.glassdoor.co.in/Jobs/Example-Tech-Backend-Job-Expired' },
        { date: '2026-09-10', title: 'New Senior Backend role opened', source_name: 'Official Careers', url: 'https://careers.example-tech.com/jobs/backend-engineer-chennai' },
        { date: '2026-09-16', title: 'Job aggregated to LinkedIn', source_name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/view/example-tech-backend-chennai' }
      ],
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'demo-product-deal-laptop',
    title: 'Product Investigation: UltraBook Pro Deal at ₹19,999',
    original_question: 'Is the UltraBook Pro M3 laptop available at a suspiciously low price of ₹19,999 on ElectroStore Deals?',
    category: 'product_shopping',
    status: 'completed',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    completed_at: new Date().toISOString(),
    queries: [
      { query: 'UltraBook Pro M3 price India comparison', engine: 'google_shopping', purpose: 'Live merchant price benchmarking' },
      { query: 'ElectroStore Deals scam reviews laptop', engine: 'google', purpose: 'Merchant authenticity check' },
      { query: 'UltraBook Pro M3 retail price news release', engine: 'google_news', purpose: 'Official MSRP verification' }
    ],
    evidence_count: 5,
    contradiction_count: 1,
    report: {
      id: 'rep-demo-2',
      investigation_id: 'demo-product-deal-laptop',
      title: 'Product Investigation: UltraBook Pro Deal at ₹19,999',
      original_question: 'Is the UltraBook Pro M3 laptop available at a suspiciously low price of ₹19,999 on ElectroStore Deals?',
      category: 'product_shopping',
      summary: 'CONTRADICTION DETECTED. The standard MSRP across authorized retailers is ₹89,900. The advertised ₹19,999 deal on ElectroStore Deals is 78% below market price and matches known unauthorized phishing store patterns.',
      evidence_status: 'Conflicting Evidence',
      confidence_score: 0.94,
      confidence_label: 'Very Strong Evidence',
      key_findings: [
        'Google Shopping market pricing across Amazon, Flipkart, and Croma ranges between ₹84,990 and ₹89,900.',
        'ElectroStore Deals domain was registered 18 days ago with hidden WHOIS records.',
        'Multiple user complaint threads on Reddit flag ElectroStore Deals for non-delivery of electronics purchases.'
      ],
      supporting_evidence: [
        {
          id: 'ev-d2-1',
          investigation_id: 'demo-product-deal-laptop',
          source_id: 'src-s1',
          source_name: 'google_shopping',
          source_domain: 'amazon.in',
          source_url: 'https://www.amazon.in/dp/B0CX12345',
          source_type: 'business_listing',
          title: 'UltraBook Pro M3 (16GB RAM, 512GB SSD)',
          snippet: 'Official Price: ₹87,990 (Fulfilled by Amazon). Rating: 4.6 stars across 840 reviews.',
          published_at: null,
          evidence_type: 'supporting',
          relevance_score: 0.95,
          summary: 'Authorized retailer market baseline price established at ₹87,990.',
          search_engine: 'google_shopping',
          created_at: new Date().toISOString()
        }
      ],
      contradicting_evidence: [
        {
          id: 'ev-d2-2',
          investigation_id: 'demo-product-deal-laptop',
          source_id: 'src-s2',
          source_name: 'reddit.com',
          source_domain: 'reddit.com',
          source_url: 'https://www.reddit.com/r/IndianGaming/comments/electrostore_deals_scam',
          source_type: 'community',
          title: 'Warning: ElectroStore-deals.in fake site offering impossible discounts',
          snippet: 'Warning to everyone: electrostore-deals is taking payments via UPI and ghosting buyers. UltraBook listed at ₹19.9k is a complete scam.',
          published_at: '2026-09-14',
          evidence_type: 'contradicting',
          relevance_score: 0.96,
          summary: 'Community reports confirm non-fulfillment and scam site activity.',
          search_engine: 'google',
          created_at: new Date().toISOString()
        }
      ],
      contradictions: [
        {
          id: 'con-demo-2',
          investigation_id: 'demo-product-deal-laptop',
          claim_text: 'Product Price Authenticity & Seller Legitimacy',
          evidence_a: {
            source_name: 'ElectroStore Deals Advertised Price',
            source_url: 'https://electrostore-deals.in/laptop',
            content: 'Advertised price ₹19,999 (78% discount)',
            date: '2026-09-19'
          },
          evidence_b: {
            source_name: 'Authorized Retail Baseline (Amazon/Croma)',
            source_url: 'https://www.amazon.in/dp/B0CX12345',
            content: 'Standard authorized market price ₹87,990',
            date: '2026-09-20'
          },
          explanation: 'Extreme price deviation (>75% discount) without manufacturer promotion combined with negative community fraud reports indicates a high risk of consumer fraud.',
          status: 'active_conflict'
        }
      ],
      uncertainties: [
        'Possible refurbished or stolen stock cannot be 100% ruled out, but site legitimacy score is critically low.'
      ],
      sources: [
        { id: 'ps1', domain: 'amazon.in', url: 'https://www.amazon.in/dp/B0CX12345', title: 'Amazon Authorized Store', source_type: 'company', published_at: null },
        { id: 'ps2', domain: 'reddit.com', url: 'https://www.reddit.com/r/IndianGaming/comments/electrostore_deals_scam', title: 'Reddit Fraud Warning Thread', source_type: 'community', published_at: '2026-09-14' }
      ],
      search_coverage: [
        { engine: 'google', queried: true, results_count: 6, queries_performed: ['ElectroStore Deals scam reviews laptop'] },
        { engine: 'google_news', queried: true, results_count: 3, queries_performed: ['UltraBook Pro M3 retail price news release'] },
        { engine: 'google_jobs', queried: false, results_count: 0, queries_performed: [] },
        { engine: 'google_maps', queried: false, results_count: 0, queries_performed: [] },
        { engine: 'google_shopping', queried: true, results_count: 8, queries_performed: ['UltraBook Pro M3 price India comparison'] }
      ],
      next_verification_steps: [
        'DO NOT enter payment information or UPI credentials on unverified third-party storefronts.',
        'Purchase only through official brand stores or verified platforms.'
      ],
      timeline: [
        { date: '2026-09-14', title: 'First scam warning posted on Reddit', source_name: 'Reddit', url: 'https://www.reddit.com/r/IndianGaming/comments/electrostore_deals_scam' },
        { date: '2026-09-20', title: 'Live Amazon price check confirms ₹87,990', source_name: 'Amazon', url: 'https://www.amazon.in/dp/B0CX12345' }
      ],
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'demo-funding-claim',
    title: 'Funding Claim Verification: CleanTech AI ₹100 Crore Round',
    original_question: 'Did CleanTech AI raise ₹100 crore in Series A funding in 2026?',
    category: 'claim_verification',
    status: 'completed',
    created_at: new Date(Date.now() - 10800000).toISOString(),
    completed_at: new Date().toISOString(),
    queries: [
      { query: 'CleanTech AI series A funding 100 crore 2026', engine: 'google', purpose: 'Verify funding announcement' },
      { query: 'CleanTech AI raised funding press release', engine: 'google_news', purpose: 'Check financial news coverage' }
    ],
    evidence_count: 6,
    contradiction_count: 1,
    report: {
      id: 'rep-demo-3',
      investigation_id: 'demo-funding-claim',
      title: 'Funding Claim Verification: CleanTech AI ₹100 Crore Round',
      original_question: 'Did CleanTech AI raise ₹100 crore in Series A funding in 2026?',
      category: 'claim_verification',
      summary: 'Strong evidence confirms CleanTech AI raised Series A funding. However, financial news outlets report $12 Million (~₹100 Crore) while early blogs misreported $100 Million (~₹830 Crore).',
      evidence_status: 'Supported by Multiple Sources',
      confidence_score: 0.89,
      confidence_label: 'Strong Evidence',
      key_findings: [
        'The Economic Times & TechCrunch confirm a $12 Million (approx ₹100 Crore) Series A round led by Sequoia India.',
        'Early blog posts confused USD ($100M) with INR (₹100 Crore), causing currency denomination confusion.'
      ],
      supporting_evidence: [
        {
          id: 'ev-d3-1',
          investigation_id: 'demo-funding-claim',
          source_id: 'src-f1',
          source_name: 'economictimes.indiatimes.com',
          source_domain: 'economictimes.indiatimes.com',
          source_url: 'https://economictimes.indiatimes.com/tech/cleantech-ai-raises-100-crore',
          source_type: 'news',
          title: 'CleanTech AI secures ₹100 crore Series A from Peak XV Partners',
          snippet: 'CleanTech AI has raised ₹100 crore ($12M) in Series A funding to expand its enterprise carbon tracking platform across Asia-Pacific.',
          published_at: '2026-08-15',
          evidence_type: 'supporting',
          relevance_score: 0.98,
          summary: 'Economic Times confirms ₹100 Crore Series A funding round.',
          search_engine: 'google_news',
          created_at: new Date().toISOString()
        }
      ],
      contradicting_evidence: [
        {
          id: 'ev-d3-2',
          investigation_id: 'demo-funding-claim',
          source_id: 'src-f2',
          source_name: 'techblog-news.com',
          source_domain: 'techblog-news.com',
          source_url: 'https://techblog-news.com/cleantech-100m-round',
          source_type: 'community',
          title: 'CleanTech AI raises massive $100 Million funding',
          snippet: 'Start-up CleanTech AI closes $100M Series A round.',
          published_at: '2026-08-16',
          evidence_type: 'contradicting',
          relevance_score: 0.70,
          summary: 'Tech blog incorrectly misstates currency unit as $100M USD.',
          search_engine: 'google',
          created_at: new Date().toISOString()
        }
      ],
      contradictions: [
        {
          id: 'con-demo-3',
          investigation_id: 'demo-funding-claim',
          claim_text: 'Funding Amount Currency Denomination',
          evidence_a: {
            source_name: 'Economic Times',
            source_url: 'https://economictimes.indiatimes.com/tech/cleantech-ai-raises-100-crore',
            content: '₹100 Crore INR ($12M USD)',
            date: '2026-08-15'
          },
          evidence_b: {
            source_name: 'TechBlog News',
            source_url: 'https://techblog-news.com/cleantech-100m-round',
            content: '$100 Million USD (~₹830 Crore)',
            date: '2026-08-16'
          },
          explanation: 'Different articles published conflicting currency units (INR ₹100 Cr vs USD $100M). Official regulatory filings confirm ₹100 Crore INR ($12M USD).',
          status: 'different_context'
        }
      ],
      uncertainties: [
        'Post-money valuation metrics remain undisclosed by founders.'
      ],
      sources: [
        { id: 'fs1', domain: 'economictimes.indiatimes.com', url: 'https://economictimes.indiatimes.com/tech/cleantech-ai-raises-100-crore', title: 'Economic Times Tech', source_type: 'news', published_at: '2026-08-15' },
        { id: 'fs2', domain: 'techblog-news.com', url: 'https://techblog-news.com/cleantech-100m-round', title: 'TechBlog News', source_type: 'community', published_at: '2026-08-16' }
      ],
      search_coverage: [
        { engine: 'google', queried: true, results_count: 7, queries_performed: ['CleanTech AI series A funding 100 crore 2026'] },
        { engine: 'google_news', queried: true, results_count: 5, queries_performed: ['CleanTech AI raised funding press release'] },
        { engine: 'google_jobs', queried: false, results_count: 0, queries_performed: [] },
        { engine: 'google_maps', queried: false, results_count: 0, queries_performed: [] },
        { engine: 'google_shopping', queried: false, results_count: 0, queries_performed: [] }
      ],
      next_verification_steps: [
        'Check MCA / ROC regulatory filings for exact share allotment details.',
        'Review investor press release from Peak XV Partners.'
      ],
      timeline: [
        { date: '2026-08-15', title: 'Economic Times announces ₹100 Crore Series A', source_name: 'Economic Times', url: 'https://economictimes.indiatimes.com/tech/cleantech-ai-raises-100-crore' },
        { date: '2026-08-16', title: 'TechBlog misreports round as $100M', source_name: 'TechBlog', url: 'https://techblog-news.com/cleantech-100m-round' }
      ],
      created_at: new Date().toISOString()
    }
  }
];
