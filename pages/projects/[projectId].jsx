import utils from '../../styles/utils.module.scss';
import Layout from '../../components/layout/layout/layout';
import MdContent from '../../components/mdContent/mdContent';
import { getProject, getProjectIds } from '@/lib/services/projectsService';
import Head from '@/components/layout/head/head';

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

const Experience = ({ project }) => {
  return (
    <>
      <Head item={project} />
      <div className={`max-w-screen-xl mx-auto p-2 mobile:p-6 max-w-screen-desktop`}>
        <MdContent content={project} />
      </div>
    </>
  );
};

Experience.getLayout = (page) => <Layout>{page}</Layout>;

export default Experience;
