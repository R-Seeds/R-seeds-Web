import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import favicon from '/public/rseeds.png'; 

export const metadata: Metadata = {
  title: 'R-seeds',
  description: '',
  icons: {
    icon: '/rseeds.png', 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon for browser tab */}
        <link rel="icon" href="/rseeds.png" type="image/png" />
      </head>
      <body className="min-h-screen page-muted-bg">
        {children}
      </body>
    </html>
  );
}
