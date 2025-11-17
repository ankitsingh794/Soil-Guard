import type { Metadata } from 'next';
import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: "Soil Guard - Nature's Ally Farmer's Friend | Premium Soil Solutions",
  description: "Nature's Ally Farmer's Friend - Empowering farmers and nature lovers with premium soil solutions. From sustainable farming to lush gardens, quality tested and delivered to your doorstep.",
  keywords: 'soil, garden soil, potting mix, organic soil, industrial soil, remediation, plant soil, sustainable farming, eco-friendly, farmer solutions',
  authors: [{ name: 'Soil Guard' }],
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: "Soil Guard - Nature's Ally Farmer's Friend",
    description: "Premium soil solutions for farmers and nature lovers. AI-powered recommendations, sustainable sourcing, delivered to your door.",
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Soil Guard Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
