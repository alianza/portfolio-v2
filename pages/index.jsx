import Layout from '@/components/layout/layout/Layout';
import { useNetlifyIdentityRedirect } from '@/lib/customHooks';
import { getProjects } from '@/lib/services/projectsService';
import CoverVideo from '@/components/coverVideo/CoverVideo';
import { getIntros } from '@/lib/services/introService';
import AboutMe from '@/components/aboutMe/AboutMe';
import Contact from '@/components/contact/Contact';
import Projects from '@/components/projects/Projects';

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
