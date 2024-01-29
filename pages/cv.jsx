import Layout from '@/components/layout/layout/Layout';

function Cv() {
  return (
    <iframe
      src={'/Curriculum Vitae Jan-Willem van Bremen 500779265 - English.pdf'}
      className="w-full grow"
      width="100%"
      height="100%"
    />
  );
}

Cv.getLayout = (page) => <Layout>{page}</Layout>;
export default Cv;
