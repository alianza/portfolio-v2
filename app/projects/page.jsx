import { getProjects } from '@/lib/services/projectsService';
import ProjectPreview from '@/components/previews/ProjectPreview';

async function projectPage({}) {
  const projects = await getProjects({ content: false });

  return (
    <div className="mx-auto mt-header flex max-w-5xl flex-col items-center justify-between gap-12 p-4 sm:px-12">
      <section className="w-full">
        <h2 id="experiences" className="scroll-header-offset my-5 text-center text-4xl font-bold sm:text-left">
          Experiences & Projects
        </h2>
        <div className="grid h-full w-full grid-cols-1 grid-rows-1 gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default projectPage;
