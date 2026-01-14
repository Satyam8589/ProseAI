import './globals.css';

export const metadata = {
  title: 'ProseAI - AI-Powered Writing Assistant',
  description: 'Transform your messages with AI-powered tone rewriting. Professional, friendly, casual, and more - all without storing your data.',
  keywords: 'AI writing assistant, tone rewriter, message enhancement, privacy-first, browser extension',
  authors: [{ name: 'ProseAI Team' }],
  openGraph: {
    title: 'ProseAI - AI-Powered Writing Assistant',
    description: 'Transform your messages with AI-powered tone rewriting. Privacy-first, instant, and powerful.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
