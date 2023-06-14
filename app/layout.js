import { Inter, Roboto } from 'next/font/google';
import LayoutApp from '@/components/LayoutApp';
import Provider from '@/components/Provider';
import ReactQuery from '@/components/ReactQuery';
import './globals.css';

//theme
import 'primereact/resources/themes/tailwind-light/theme.css';

//core
import 'primereact/resources/primereact.min.css';
// import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Edom-app',
  description: 'Build by fahmi nur rahman',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ReactQuery>
            <main className={roboto.className}>
              <LayoutApp>{children}</LayoutApp>
            </main>
          </ReactQuery>
        </Provider>
      </body>
    </html>
  );
}
