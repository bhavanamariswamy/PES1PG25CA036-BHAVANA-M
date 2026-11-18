import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Profile Management System',
  description: 'Next.js Student Profile Management System for WAF-II Experiential Learning Unit-4'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
