import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/context/Providers';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Shop App Global',
  description: 'Prueba técnica Frontend React SSR',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
