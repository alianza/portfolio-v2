import Layout from '../../components/layout/layout/Layout';
import MdContent from '../../components/mdContent/mdContent';
import { getProject, getProjectIds } from '@/lib/services/projectsService';
import Head from '@/components/layout/head/Head';

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
    <>
      <Head item={project} />
      <div className="mx-auto max-w-screen-xl p-2 sm:p-6">
        <MdContent content={project} />
      </div>
    </>
  );
};

Project.getLayout = (page) => <Layout>{page}</Layout>;

export default Project;
