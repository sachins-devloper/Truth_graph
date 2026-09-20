import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TruthGraph — Don\'t just search. Investigate.',
  description: 'An AI investigation engine that searches the live web via SerpApi, cross-checks evidence, detects contradictions, and produces source-backed reports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
