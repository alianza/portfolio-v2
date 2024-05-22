import MdContent from '@/components/mdContent/MdContent';
import { getProject, getProjectIds } from '@/lib/services/projectsService';
import config from '@/content/config.json';

export async function generateStaticParams() {
  const projectIds = await getProjectIds();

  return projectIds.map((projectId) => ({ projectId }));
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.projectId);

  return {
    title: `${config.siteTitle} ${project.title}`,
    description: project.description,
  };
}

async function Project({ params }) {
  const project = await getProject(params.projectId);

  project.content = project.content.replaceAll(
    /<a href="([^"]+)">/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">',
  );

  return (
    <div className="mx-auto mt-header max-w-screen-xl p-2 sm:p-6">
      <MdContent content={project} />
    </div>
  );
}

export default Project;
