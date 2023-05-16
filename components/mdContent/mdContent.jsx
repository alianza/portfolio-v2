import React from 'react';
import contentStyles from './mdContent.module.scss';
import StartEndDateLabel from '@/components/common/startEndDateLabel';
import { useDetailTagsAnimation } from '@/lib/markdownEnrichment';

const MdContent = ({ content: { title, date, startDate, endDate, thumbnail, content }, noDate }) => {
  useDetailTagsAnimation();

  return (
    <article className={contentStyles.content}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className={contentStyles.mainTitle}>{title}</h1>
      </div>
      <div className={contentStyles.metaData}>
        {!noDate && date && <time className="m-0">{date}</time>}
        {startDate && <StartEndDateLabel startDate={startDate} endDate={endDate} />}
      </div>
      {thumbnail && <img className="w-full" alt="thumbnail" src={thumbnail} />}
      <div className="relative z-[1]" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default MdContent;
