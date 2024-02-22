import Layout from '../../components/layout/layout/Layout';
import MdContent from '../../components/mdContent/MdContent';
import { getProject, getProjectIds } from '@/lib/services/projectsService';
import Head from '@/components/layout/layout/Head';
import config from '@/content/config.json';

export const getStaticPaths = async () => {
  const projectIds = await getProjectIds();

  return {
    paths: projectIds.map((projectId) => ({ params: { projectId } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const project = await getProject(params.projectId);

  return {
    props: {
      project,
    },
  };
};

const Project = ({ project }) => {
  return (
    <div className="mx-auto mt-header max-w-screen-xl p-2 sm:p-6">
      <Head title={`${config.siteTitle} ${project.title}`} description={project.description} />
      <MdContent content={project} />
    </div>
  );
};

Project.getLayout = (page) => <Layout>{page}</Layout>;

export default Project;
