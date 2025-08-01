
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { APIProvider } from '@/lib/apiClient';
import { Header } from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'لارا - زیبایی و آرایش',
  description: 'جدیدترین محصولات زیبایی را در لارا کشف کنید. مجموعه آرایش، مراقبت از پوست و عطر ما را خریداری کنید.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", "font-body")}>
        <ThemeProvider>
          <APIProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </APIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
