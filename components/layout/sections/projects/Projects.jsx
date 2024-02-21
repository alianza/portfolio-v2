import { TransitionScroll } from 'react-transition-scroll';
import { baseStyle, hiddenStyle } from '@/lib/utils';
import ProjectPreview from '@/components/previews/ProjectPreview';
import { useRouter } from 'next/router';
import { useState } from 'react';

const initialNumVisibleProjects = 6;
// let documentHeight = Infinity;

const Projects = ({ projects }) => {
  const [numVisibleProjects, setNumVisibleProjects] = useState(initialNumVisibleProjects);
  const router = useRouter();

  const allProjectsVisible = projects.length <= numVisibleProjects;

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
        {projects.map((project, i) =>
          i >= numVisibleProjects ? null : <ProjectPreview key={project.id} project={project} />,
        )}
      </div>

      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle} className="flex justify-center">
        <button
          className="button button-green"
          onClick={() =>
            allProjectsVisible
              ? router.push('/projects')
              : () => setNumVisibleProjects((prevNumVisibleProjects) => prevNumVisibleProjects + 6)
          }
        >
          <span className="m-2">{allProjectsVisible ? 'See all...' : 'See more...'}</span>
        </button>
      </TransitionScroll>
    </>
  );
};

export default Projects;
