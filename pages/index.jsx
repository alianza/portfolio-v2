import Layout from '@/components/layout/layout/layout';
import { useNetlifyIdentityRedirect } from '@/lib/customHooks';
import { hiddenStyle, transitionBaseStyle } from '@/lib/utils';
import { TransitionScroll } from 'react-transition-scroll';
import Image from 'next/image';
import { getProjects } from '@/lib/services/projectsService';
import utilStyles from '@/styles/utils.module.scss';
import Link from 'next/link';
import StartEndDateLabel from '@/components/common/startEndDateLabel';

export async function getStaticProps() {
  const projects = await getProjects();

  return {
    props: {
      projects,
    },
  };
}

function Home({ projects }) {
  useNetlifyIdentityRedirect();

  return (
    <main className="flex flex-col items-center justify-between p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center">Welcome to my personal portfolio website!</h1>
      <div className="w-full h-full grid grid-cols-3 grid-rows-1 gap-4 mt-6">
        {projects.map((project) => (
          <TransitionScroll key={project.id} className="" baseStyle={transitionBaseStyle} hiddenStyle={hiddenStyle}>
            <Link
              href={`/projects/${project.id}`}
              className={`relative block aspect-video ${utilStyles.hoverEffectSlight}`}
            >
              <Image
                fill
                sizes="100vw"
                alt={`${project.data.title} thumbnail`}
                src={project.data.thumbnail}
                placeholder="blur"
                blurDataURL={`/_next/image?url=${project.data.thumbnail}&w=16&q=1`}
              />
            </Link>
            <div>
              <Link href={`/projects/${project.id}`} className={`${utilStyles.link} text-2xl`}>
                {project.data.title}
              </Link>
              <StartEndDateLabel startDate={project.data.startDate} endDate={project.data.endDate} />
              <p>{project.data.description}</p>
            </div>
          </TransitionScroll>
        ))}
      </div>
    </main>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
