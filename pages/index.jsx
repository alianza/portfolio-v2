import Layout from '@/components/layout/layout/layout';
import { useNetlifyIdentityRedirectHook } from '@/lib/customHooks';
import { getProjects } from '@/lib/utils';

export async function getStaticProps() {
  const projects = await getProjects();

  return {
    props: {
      projects,
    },
  };
}

function Home({ projects }) {
  useNetlifyIdentityRedirectHook();

  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <h1 className="text-4xl font-bold text-center">Welcome to my personal portfolio website!</h1>
    </main>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
