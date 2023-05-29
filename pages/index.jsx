import Layout from '@/components/layout/layout/layout';
import { useNetlifyIdentityRedirect } from '@/lib/customHooks';
import { hiddenStyle, transitionBaseStyle, yearsSinceDate } from '@/lib/utils';
import { TransitionScroll } from 'react-transition-scroll';
import Image from 'next/image';
import { getProjects } from '@/lib/services/projectsService';
import utilStyles from '@/styles/utils.module.scss';
import Link from 'next/link';
import StartEndDateLabel from '@/components/common/startEndDateLabel';
import { useEffect, useState } from 'react';
import { use } from 'marked';

export async function getStaticProps() {
  const projects = await getProjects({ content: false, limit: 3 });

  return {
    props: {
      projects,
    },
  };
}

function Home({ projects }) {
  useNetlifyIdentityRedirect();
  const [videoId, setVideoId] = useState(null);

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

      <main className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-12 p-4 sm:p-12">
        <section className="flex w-full flex-col gap-4">
          <h2 id="about" className="scroll-header-offset text-center text-4xl font-bold sm:text-left">
            About me
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col">
              <Image
                src="/portrait.webp"
                alt="Portrait of Jan-Willem van Bremen"
                className="w-full rounded shadow"
                quality={100}
                width={500}
                height={500}
              />
              <div className="mt-1">
                <p className="text-2xl font-bold">Wo I am</p>
                <p>
                  My name is Jan-Willem van Bremen. I&apos;m a {yearsSinceDate('10-10-1998')} year old software
                  engineer, skateboarder and model from Amsterdam! I&apos;m a very social, diligent and precise person
                  who can concentrate for long periods of time. I work well both solo and in development teams!
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <video autoPlay playsInline muted loop className="w-full rounded shadow">
                <source src="/professional.webm" type="video/webm" />
                <source src="/professional.mp4" type="video/mp4" />
              </video>
              <div className="mt-1">
                <p className="text-2xl font-bold">What I do professionally</p>
                <p>
                  Professionally I am a full-stack Software Engineer focussing on web-development. I do this using
                  technologies & techniques like HTML, (S)CSS, Type/JavaScript, Node.js, web frameworks (React,
                  Next.js), Git(hub), Agile Scrum and more! Check out some of my experiences & projects!
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:last-of-type:odd:col-span-full md:last-of-type:odd:col-span-1">
              <Image
                src="/fun.webp"
                alt="Portrait of Jan-Willem van Bremen"
                className="w-full rounded shadow"
                quality={100}
                width={500}
                height={500}
              />
              <div className="mt-1">
                <p className="text-2xl font-bold">What I do for fun</p>
                <p>
                  For fun I have been practicing skateboarding for {yearsSinceDate('1-7-2011')} years on an amateur
                  level. During my skateboarding career I have been sponsored by different brands and shops. Next to
                  that I also do some model work for various street wear brands in Amsterdam.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <h2 id="experiences" className="scroll-header-offset text-center text-4xl font-bold sm:text-left">
            Experiences & Projects
          </h2>
          <div className="mt-6 grid h-full w-full grid-cols-1 grid-rows-1 gap-4 md:grid-cols-3">
            {projects.map(({ data, id }) => (
              <TransitionScroll key={id} className="" baseStyle={transitionBaseStyle} hiddenStyle={hiddenStyle}>
                <Link href={`/projects/${id}`} className={`relative block ${utilStyles.hoverEffectSlight}`}>
                  <Image
                    className="aspect-square rounded object-cover"
                    alt={`${data.title} thumbnail`}
                    width={500}
                    height={500}
                    src={data.thumbnail}
                    placeholder="blur"
                    blurDataURL={`/_next/image?url=${data.thumbnail}&w=16&q=1`}
                  />
                </Link>
                <div>
                  <Link href={`/projects/${id}`} className={`${utilStyles.link} text-2xl font-bold`}>
                    {data.title}
                  </Link>
                  <StartEndDateLabel startDate={data.startDate} endDate={data.endDate} />
                  <p className="font-light">{data.description}</p>
                </div>
              </TransitionScroll>
            ))}
          </div>
        </section>

        <section className="w-full">
          <h2 id="contact" className="scroll-header-offset text-center text-4xl font-bold sm:text-left">
            Contact me
          </h2>
          <div className="mt-6 grid h-full w-full grid-cols-1 grid-rows-1 gap-4 md:grid-cols-3">
            <h3>Send me a message!</h3>
            <form name="contact" method="POST" data-netlify="true" data-netlify-recaptcha="true">
              <input placeholder="Name..." name="name" className="" />
              <input placeholder="Email..." name="email" className="" />
              <textarea placeholder="Message..." name="message" className="" />
              <div data-netlify-recaptcha="true" />
            </form>
          </div>
          <div>
            <TransitionScroll className="" baseStyle={transitionBaseStyle} hiddenStyle={hiddenStyle}>
              <h3>
                Or, Email me directly! @ <a href="mailto:janwillemvanbremen@live.nl">janwillemvanbremen@live.nl</a>
              </h3>
            </TransitionScroll>
          </div>
        </section>
      </main>
    </>
  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
