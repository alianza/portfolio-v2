import '@/styles/globals.scss';
import Script from 'next/script';
import Header from '@/components/layout/layout/Header';
import Footer from '@/components/layout/layout/Footer';
import ProgressBarProvider from '@/components/progressBar';

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
  applicationName: 'Portfolio Jan-Willem van Bremen',
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script strategy="lazyOnload" src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <body>
        <div id="app" className="flex min-h-screen flex-col">
          <Header />
          <main id="content" className="flex grow flex-col">
            {children}
          </main>
          <Footer />
          <ProgressBarProvider />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
