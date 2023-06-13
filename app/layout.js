import Head from 'next/head';
import './globals.css';
import { Inter } from 'next/font/google';
import LayoutApp from '@/components/LayoutApp';

//theme
import 'primereact/resources/themes/tailwind-light/theme.css';

//core
import 'primereact/resources/primereact.min.css';
// import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Edom-app',
  description: 'Build by fahmi nur rahman',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutApp>{children}</LayoutApp>
      </body>
    </html>
  );
}
