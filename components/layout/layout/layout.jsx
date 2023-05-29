import Head from 'next/head';
import Header from '../header/header';
import Footer from '../footer/footer';
import dynamic from 'next/dynamic';
import { useDarkMode } from '@/lib/customHooks';
const NextNProgress = dynamic(() => import('nextjs-progressbar'), { loading: () => <div /> });

export default function Layout({ children }) {
  const darkMode = useDarkMode();

  return (
    <div id="app" className="flex min-h-screen flex-col">
      <Head>
        <title>Portfolio Jan-Willem van Bremen</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is the personal portfolio of Jan-Willem van Bremen! Software Engineer, Skateboarder & model!"
        />
        <meta name="application-name" content="Portfolio Jan-Willem van Bremen" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <Header />

      <main id="content">{children}</main>

      <Footer />

      <NextNProgress color={darkMode ? '#eee' : '#eee'} />
    </div>
  );
}
