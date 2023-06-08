import Layout from '@/components/layout/layout/layout';
import { getProjects } from '@/lib/services/projectsService';
import { TransitionScroll } from 'react-transition-scroll';
import { hiddenStyle, transitionBaseStyle } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import StartEndDateLabel from '@/components/common/startEndDateLabel';

export async function getStaticProps() {
  const projects = await getProjects({ content: false });

  return {
    props: {
      projects,
    },
  };
}

function projectPage({ projects }) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 p-4 sm:px-12">
      <section className="w-full">
        <h2 id="experiences" className="scroll-header-offset my-5 text-center text-4xl font-bold sm:text-left">
          Experiences & Projects
        </h2>
        <div className="grid h-full w-full grid-cols-1 grid-rows-1 gap-4 md:grid-cols-3">
          {projects.map(({ data, id }) => (
            <TransitionScroll key={id} baseStyle={transitionBaseStyle} hiddenStyle={hiddenStyle}>
              <Link href={`/projects/${id}`} className="hoverSlight relative block">
                <Image
                  className="aspect-square w-full rounded object-cover"
                  alt={`${data.title} thumbnail`}
                  width={500}
                  height={500}
                  src={data.thumbnail}
                  placeholder="blur"
                  blurDataURL={`/_next/image?url=${data.thumbnail}&w=16&q=1`}
                />
              </Link>
              <div>
                <Link href={`/projects/${id}`} className="link text-2xl font-bold">
                  {data.title}
                </Link>
                <StartEndDateLabel startDate={data.startDate} endDate={data.endDate} />
                <p className="line-clamp-3 font-light">{data.description}</p>
              </div>
            </TransitionScroll>
          ))}
        </div>
      </section>
    </div>
  );
}

projectPage.getLayout = (page) => <Layout>{page}</Layout>;

export default projectPage;
