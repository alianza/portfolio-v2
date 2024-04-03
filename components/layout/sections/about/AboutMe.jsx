import { baseStyle, hiddenStyle, isImage, isVideo } from '@/lib/utils';
import { getIntros } from '@/lib/services/introService';
import TransitionScroll from '@/components/transitionScroll/TransitionScroll';
import AboutMdContent from '@/components/layout/sections/about/AboutMdContent';
import AboutImage from '@/components/layout/sections/about/AboutImage';

function AboutVideo({ title, media, fallbackMedia }) {
  return (
    <video key={title} className="w-full rounded shadow-lg" autoPlay loop muted playsInline>
      <source src={media} type={`video/${media.split('.').pop()}`} />
      {!!fallbackMedia && <source src={fallbackMedia} type={`video/${fallbackMedia.split('.').pop()}`} />}
    </video>
  );
}

const AboutMe = async () => {
  const intros = await getIntros();

  return (
    <>
      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
        <h2 id="about" className="my-5 text-center text-4xl font-bold sm:text-left">
          About me
        </h2>
      </TransitionScroll>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {intros.map(({ title, content, media, fallbackMedia }) => (
          <TransitionScroll
            key={title}
            baseStyle={baseStyle}
            hiddenStyle={hiddenStyle}
            className="flex flex-col sm:last-of-type:odd:col-span-full md:last-of-type:odd:col-span-1"
          >
            {isImage.some((ext) => media.endsWith(ext)) ? (
              <AboutImage title={title} media={media} fallbackMedia={fallbackMedia} />
            ) : (
              isVideo.some((ext) => media.endsWith(ext)) && (
                <AboutVideo title={title} media={media} fallbackMedia={fallbackMedia} />
              )
            )}
            <div className="mt-1">
              <h3 className="text-2xl font-bold">{title}</h3>
              <AboutMdContent content={content} />
            </div>
          </TransitionScroll>
        ))}
      </div>
    </>
  );
};

export default AboutMe;
