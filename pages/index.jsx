import Layout from '@/components/layout/layout/layout';
import { useNetlifyIdentityRedirect } from '@/lib/customHooks';
import { hiddenStyle, baseStyle, yearsSinceDate } from '@/lib/utils';
import { TransitionScroll } from 'react-transition-scroll';
import Image from 'next/image';
import { getProjects } from '@/lib/services/projectsService';
import { useEffect, useState } from 'react';
import ProjectPreview from '@/components/previews/projectPreview';

export async function getStaticProps() {
  const projects = await getProjects({ content: false });

  return {
    props: {
      projects,
    },
  };
}

function Home({ projects }) {
  useNetlifyIdentityRedirect();
  const [videoId, setVideoId] = useState(null);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    setVideoId(Math.floor(Math.random() * 2) + 1);
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 text-neutral-50">
          <h1 className="text-5xl font-bold drop-shadow-lg">Jan-Willem van Bremen</h1>
          <h2 className="text-3xl drop-shadow-lg">Software engineer, Skateboarder & Model!</h2>
        </div>
        <video
          className="pointer-events-none h-[calc(100vh-theme(spacing.header))] w-full object-cover"
          autoPlay
          playsInline
          muted
          loop
        >
          {videoId &&
            [[`cover_video_${videoId}.webm`], [`cover_video_${videoId}.mp4`]].map(([src]) => (
              <source key={src} src={`/${src}`} type={`video/${src.split('.').pop()}`} />
            ))}
        </video>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 p-4 sm:px-12">
        <section className="w-full">
          <h2 id="about" className="scroll-header-offset my-5 text-center text-4xl font-bold sm:text-left">
            About me
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              [
                'Who I am',
                `  My name is Jan-Willem van Bremen. I'm a ${yearsSinceDate('10-10-1998')} year old software
                  engineer, skateboarder and model from Amsterdam! I'm a very social, diligent and precise person
                  who can concentrate for long periods of time. I work well both solo and in development teams!`,
                <Image
                  key="Who I am"
                  src="/portrait.webp"
                  alt="Portrait of Jan-Willem van Bremen"
                  className="w-full rounded shadow"
                  quality={100}
                  width={500}
                  height={500}
                />,
              ],
              [
                'What I do professionally',
                `Professionally I am a full-stack Software Engineer focussing on web-development. I do this using
                  technologies & techniques like HTML, (S)CSS, Type/JavaScript, Node.js, web frameworks (React,
                  Next.js), Git(hub), Agile Scrum and more! Check out some of my experiences & projects!`,
                <video key="What I do professionally" autoPlay playsInline muted loop className="w-full rounded shadow">
                  <source src="/professional.webm" type="video/webm" />
                  <source src="/professional.mp4" type="video/mp4" />
                </video>,
              ],
              [
                'What I do for fun',
                `For fun I have been practicing skateboarding for ${yearsSinceDate('1-7-2011')} years on an amateur
                  level. During my skateboarding career I have been sponsored by different brands and shops. Next to
                  that I also do some model work for various street wear brands in Amsterdam.`,
                <Image
                  key="What I do for fun"
                  src="/fun.webp"
                  alt="Portrait of Jan-Willem van Bremen"
                  className="w-full rounded shadow"
                  quality={100}
                  width={500}
                  height={500}
                />,
              ],
            ].map(([title, description, media]) => (
              <TransitionScroll
                key={title}
                baseStyle={baseStyle}
                hiddenStyle={hiddenStyle}
                className="flex flex-col sm:last-of-type:odd:col-span-full md:last-of-type:odd:col-span-1"
              >
                {media}
                <div className="mt-1">
                  <p className="text-2xl font-bold">{title}</p>
                  <p>{description}</p>
                </div>
              </TransitionScroll>
            ))}
          </div>
        </section>

        <section className="w-full">
          <h2 id="experiences" className="scroll-header-offset my-5 text-center text-4xl font-bold sm:text-left">
            Experiences & Projects
          </h2>
          <div className="mb-4 grid h-full w-full grid-cols-1 grid-rows-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {projects.map((project, i) =>
              i > 5 && !showProjects ? null : <ProjectPreview key={project.id} project={project} />
            )}
          </div>
          {projects.length > 5 && !showProjects && (
            <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle} className="flex justify-center">
              <button className="button button-green" onClick={() => setShowProjects(true)}>
                Load more...
              </button>
            </TransitionScroll>
          )}
        </section>

        <section className="w-full">
          <h2 id="contact" className="scroll-header-offset my-5 text-center text-4xl font-bold sm:text-left">
            Contact me
          </h2>
          <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
            <h3 className="mb-2 text-2xl">Send me a message!</h3>
            <form
              className="grid-col-1 grid grid-rows-4 gap-4 text-neutral-700 sm:grid-cols-2 sm:grid-rows-[repeat(2,_minmax(0,_1fr))_48px]"
              name="contact"
              method="POST"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input
                placeholder="Name..."
                name="name"
                className="h-12 w-full rounded p-2 shadow shadow-neutral-200 dark:shadow-neutral-600"
                required
              />
              <textarea
                placeholder="Message..."
                name="message"
                className="row-span-2 max-h-96 min-h-[112px] w-full rounded p-2 shadow shadow-neutral-200 dark:shadow-neutral-600"
                required
              />
              <input
                placeholder="Email..."
                name="email"
                className="mt-auto h-12 w-full rounded p-2 shadow shadow-neutral-200 dark:shadow-neutral-600"
                required
              />
              <button className={`button button-green col-span-full mx-auto h-12 w-full sm:w-auto`} type="submit">
                Send
              </button>
            </form>
          </TransitionScroll>
          <div>
            <TransitionScroll className="mb-2 mt-4" baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
              <h3 className="font-semibold">
                Or, Email me directly! @{' '}
                <a
                  style={{ wordBreak: 'break-word' }}
                  className="font-bold text-blue-500 underline"
                  href="mailto:janwillemvanbremen@live.nl"
                >
                  janwillemvanbremen@live.nl
                </a>
              </h3>
            </TransitionScroll>
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
