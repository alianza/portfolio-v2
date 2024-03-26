import config from '@/content/config.json';
import CoverVideo from '@/components/layout/sections/CoverVideo';
import AboutMe from '@/components/layout/sections/AboutMe';
import Projects from '@/components/layout/sections/Projects';
import Contact from '@/components/layout/sections/Contact';
import { getProjects } from '@/lib/services/projectsService';
import { getIntros } from '@/lib/services/introService';

export const metadata = {
  title: config.siteTitle,
  description: config.siteDescription,
};

async function Page() {
  const projects = await getProjects({ content: false });
  const intros = await getIntros();

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

export default Page;
