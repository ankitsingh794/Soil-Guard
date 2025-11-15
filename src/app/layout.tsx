import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Soil Guard - Smart Soil Solutions for Every Need',
  description: 'Premium quality soil solutions for gardens, indoor plants, and industrial applications. Certified, sustainable, and delivered to your door.',
  keywords: 'soil, garden soil, potting mix, organic soil, industrial soil, remediation, plant soil',
  authors: [{ name: 'Soil Guard' }],
  openGraph: {
    title: 'Soil Guard - Smart Soil Solutions',
    description: 'Premium quality soil solutions with AI-powered recommendations',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
