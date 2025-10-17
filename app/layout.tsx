import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'R-seeds Graduate Dashboard',
  description: 'Graduate dashboard built with Next.js, TypeScript and Tailwind',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen page-muted-bg">
        {children}
      </body>
    </html>
  );
}


