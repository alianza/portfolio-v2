import contentStyles from './mdContent.module.scss';
import StartEndDateLabel from '@/components/common/StartEndDateLabel';
import Image from 'next/image';
import ArticleContent from '@/components/mdContent/ArticleContent';

const MdContent = ({ content: { title, date, startDate, endDate, thumbnail, content }, noDate }) => {
  if (!content) {
    content = `<h1>Article for ${title} not written yet...</h1>
    <p>Check back later!</p>`;
  }

  return (
    <article className={contentStyles.content}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className={contentStyles.mainTitle}>{title}</h1>
      </div>
      <div className={contentStyles.metaData}>
        {!noDate && date && <time className="m-0">{date}</time>}
        {startDate && <StartEndDateLabel startDate={startDate} endDate={endDate} />}
      </div>
      {thumbnail && (
        <Image
          width={700}
          height={700}
          className={contentStyles.thumbnail}
          alt={`${title} thumbnail`}
          src={thumbnail}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${thumbnail}&w=16&q=1`}
        />
      )}
      <ArticleContent content={content} />
    </article>
  );
};

export default MdContent;
