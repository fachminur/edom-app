import Head from 'next/head';
import './globals.css';
import "primereact/resources/primereact.min.css";  
import { Inter } from 'next/font/google';
import LayoutApp from '@/components/LayoutApp';
import Provider from '@/components/Provider';

//theme
import 'primereact/resources/themes/tailwind-light/theme.css';

//core
import 'primereact/resources/primereact.min.css';
// import 'primeflex/primeflex.css';
// import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Edom-app',
  description: 'Build by fahmi nur rahman',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <LayoutApp>
            {children}
          </LayoutApp>
        </Provider>
      </body>
    </html>
  );
}
