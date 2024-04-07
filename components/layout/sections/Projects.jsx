import { baseStyle, hiddenStyle } from '@/lib/utils';
import ProjectPreview from '@/components/previews/ProjectPreview';
import { getProjects } from '@/lib/services/projectsService';
import TransitionScroll from '@/components/transitionScroll/TransitionScroll';
import Link from 'next/link';

export const initialNumShownProjects = 6;

async function Projects({ shownProjects = initialNumShownProjects }) {
  const projects = await getProjects({ content: false });
  const allProjectsVisible = projects.length <= shownProjects;

  return (
    <section className="w-full">
      <TransitionScroll
        baseStyle={{ ...baseStyle, transitionDuration: '1s' }}
        hiddenStyle={{ ...hiddenStyle, transform: 'none' }}
      >
        <h2 id="experiences" className="my-5 text-center text-4xl font-bold sm:text-left">
          Experiences & Projects
        </h2>
      </TransitionScroll>

      <div className="mb-4 grid h-full w-full grid-cols-1 grid-rows-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {projects.slice(0, shownProjects).map((project) => (
          <ProjectPreview key={project.id} project={project} />
        ))}
        {projects.slice(shownProjects, initialNumShownProjects + shownProjects).map((project) => (
          <ProjectPreview key={project.id} project={project} preLoad />
        ))}
      </div>

      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle} className="flex justify-center">
        {allProjectsVisible ? (
          <Link className="button button-green" href={`/projects`}>
            See all...
          </Link>
        ) : (
          <Link
            className="button button-green"
            scroll={false}
            href={`?shownProjects=${shownProjects + initialNumShownProjects}`}
          >
            See more...
          </Link>
        )}
      </TransitionScroll>
    </section>
  );
}

export default Projects;
