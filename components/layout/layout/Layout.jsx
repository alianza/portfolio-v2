import Header from './header/Header';
import Footer from './Footer';
import dynamic from 'next/dynamic';
import { useDarkMode } from '@/lib/customHooks';
const NextNProgress = dynamic(() => import('nextjs-progressbar'), { loading: () => <div /> });
import Head from 'next/head';

export default function Layout({ children }) {
  const darkMode = useDarkMode();

  return (
    <div id="app" className="flex min-h-screen flex-col">
      <Head>
        <meta name="application-name" content="Portfolio Jan-Willem van Bremen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main id="content" className="flex grow flex-col">
        {children}
      </main>

      <Footer />

      <NextNProgress color={darkMode ? '#eee' : '#eee'} />
    </div>
  );
}
