import Layout from '@/components/layout/layout/Layout';
import Head from '@/components/layout/layout/Head';
import config from '@/content/config.json';

function Cv() {
  return (
    <>
      <Head title={config.siteTitle} description={config.siteDescription} />

      <iframe
        src={'/Curriculum Vitae Jan-Willem van Bremen - English.pdf'}
        className="w-full grow"
        width="100%"
        height="100%"
      />
    </>
  );
}

Cv.getLayout = (page) => <Layout>{page}</Layout>;
export default Cv;
