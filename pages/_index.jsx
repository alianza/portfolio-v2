import Layout from '@/components/layout/layout/Layout';
import { useNetlifyIdentityRedirect } from '@/lib/customHooks';
import { getProjects } from '@/lib/services/projectsService';
import { getIntros } from '@/lib/services/introService';
import CoverVideo from '@/components/layout/sections/CoverVideo';
import AboutMe from '@/components/layout/sections/AboutMe';
import Contact from '@/components/layout/sections/Contact';
import Projects from '@/components/layout/sections/Projects';
import Head from '@/components/layout/layout/Head';
import config from '@/content/config.json';

export async function getStaticProps() {
  const projects = await getProjects({ content: false });
  const intros = await getIntros();

  return {
    props: {
      projects,
      intros,
    },
  };
}

function Home({ projects, intros }) {
  useNetlifyIdentityRedirect();

  return (
    <>
      <Head title={config.siteTitle} description={config.siteDescription} />

      <CoverVideo />

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 p-4 sm:px-12">
        <section className="w-full">
          <AboutMe intros={intros} />
        </section>

        <section className="w-full">
          <Projects projects={projects} />
        </section>

        <section className="w-full">
          <Contact />
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
