import type { Metadata } from 'next';
import LayoutProvider from './LayoutProvider';

export const metadata: Metadata = {
  title: 'Alex Johnson - Full Stack Developer Portfolio',
  description: 'Portfolio website showcasing my projects, skills, and experience in full-stack web development with React, Node.js, and TypeScript.',
  keywords: ['developer', 'portfolio', 'react', 'nextjs', 'typescript', 'full-stack'],
  authors: [{ name: 'Alex Johnson' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourportfolio.com',
    siteName: 'Alex Johnson Portfolio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00d4ff" />
      </head>
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}