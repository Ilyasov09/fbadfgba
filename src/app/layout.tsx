import type { Metadata } from 'next';
import './globals.css';
import '../styles/fonts.css';
import '../styles/theme.css';

export const metadata: Metadata = {
  title: 'Deku AI - Futuristic Neural Assistant',
  description: 'Premium AI assistant with sci-fi aesthetic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
