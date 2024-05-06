import CoverVideo from '@/components/layout/sections/CoverVideo';
import AboutMe from '@/components/layout/sections/about/AboutMe';
import Projects, { initialNumShownProjects } from '@/components/layout/sections/Projects';
import Contact from '@/components/layout/sections/contact/Contact';

async function Page({ searchParams }) {
  const shownProjects = parseInt(searchParams?.shownProjects, 10) || initialNumShownProjects;

  return (
    <>
      <CoverVideo />

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 p-4 sm:px-12">
        <div className="sr-only">Anchor</div>
        <AboutMe />
        <Projects shownProjects={shownProjects} />
        <Contact />
      </div>
    </>
  );
}

export default Page;
