import { TransitionScroll } from 'react-transition-scroll';
import { baseStyle, hiddenStyle } from '@/lib/utils';
import Image from 'next/image';
import { useYearsSinceDateTags } from '@/lib/markdownEnrichment';

const AboutMe = ({ intros }) => {
  useYearsSinceDateTags();

  return (
    <>
      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
        <h2 id="about" className="scroll-header-offset my-5 text-center text-4xl font-bold sm:text-left">
          About me
        </h2>
      </TransitionScroll>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {intros.map(({ title, content, media }) => (
          <TransitionScroll
            key={title}
            baseStyle={baseStyle}
            hiddenStyle={hiddenStyle}
            className="flex flex-col sm:last-of-type:odd:col-span-full md:last-of-type:odd:col-span-1"
          >
            <Image
              key={title}
              src={media}
              alt={title}
              className="w-full rounded shadow-lg"
              quality={100}
              width={500}
              height={500}
            />
            <div className="mt-1">
              <h3 className="text-2xl font-bold">{title}</h3>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </TransitionScroll>
        ))}
      </div>
    </>
  );
};

export default AboutMe;
