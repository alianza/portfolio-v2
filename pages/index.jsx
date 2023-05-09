import Layout from '@/components/layout/layout/layout';

function Home() {
  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <h1 className="text-4xl font-bold text-center">Welcome to my personal portfolio website!</h1>
    </main>
  );
}

Home.getLayout = (children) => <Layout>{children}</Layout>;

export default Home;
