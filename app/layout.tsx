import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import favicon from '/public/rseeds.png';

// Load Inter font with specific weights
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'R-seeds',
  description: 'R-seeds platform for innovation and collaboration',
  icons: {
    icon: '/rseeds.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link rel="icon" href="/rseeds.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`min-h-screen bg-white text-gray-900 antialiased ${inter.className} relative`}>
        <div className="min-h-screen flex flex-col relative">
          <main className="flex-1 w-full max-w-[1920px] mx-auto">
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
