import { TransitionScroll } from 'react-transition-scroll';
import { baseStyle, hiddenStyle } from '@/lib/utils';
import ProjectPreview from '@/components/previews/ProjectPreview';
import { useRouter } from 'next/router';
import { useState } from 'react';

const initialNumVisibleProjects = 6;
// let documentHeight = Infinity;

const Projects = ({ projects }) => {
  const router = useRouter();
  const [numVisibleProjects, setNumVisibleProjects] = useState(initialNumVisibleProjects);
  const allProjectsVisible = projects.length <= numVisibleProjects;

  const revealNextProjects = () => {
    if (allProjectsVisible) return;
    [...Array(initialNumVisibleProjects).keys()].forEach((i) =>
      setTimeout(() => setNumVisibleProjects((prev) => prev + 1), 100 * i),
    );
  };

  // useEffect(() => {
  //   if (numVisibleProjects === initialNumVisibleProjects) return;
  //   if (window.innerWidth < 1024) return;
  //   if ('ontouchstart' in window || navigator.maxTouchPoints) return;
  //   const difference = document.documentElement.scrollHeight - documentHeight;
  //   setTimeout(() => window.scrollBy({ top: difference, behavior: 'smooth' }), 200);
  // }, [numVisibleProjects]);
  // documentHeight = document.documentElement.scrollHeight; When pressing view more projects button

  return (
    <>
      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
        <h2 id="experiences" className="scroll-header-offset my-5 text-center text-4xl font-bold sm:text-left">
          Experiences & Projects
        </h2>
      </TransitionScroll>

      <div className="mb-4 grid h-full w-full grid-cols-1 grid-rows-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {projects.slice(0, numVisibleProjects).map((project) => (
          <ProjectPreview key={project.id} project={project} />
        ))}
        {projects.slice(numVisibleProjects, initialNumVisibleProjects + numVisibleProjects).map((project) => (
          <ProjectPreview key={project.id} project={project} className="invisible h-0" />
        ))}
      </div>

      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle} className="flex justify-center">
        <button
          className="button button-green"
          onClick={() => (allProjectsVisible ? router.push('/projects') : revealNextProjects())}
        >
          <span className="m-2">{allProjectsVisible ? 'See all...' : 'See more...'}</span>
        </button>
      </TransitionScroll>
    </>
  );
};

export default Projects;