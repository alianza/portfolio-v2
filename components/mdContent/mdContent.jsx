import React, { useEffect, useRef } from 'react';
import contentStyles from './mdContent.module.scss';
import StartEndDateLabel from '@/components/common/startEndDateLabel';
import { useDetailTagsAnimation, useImageZoom } from '@/lib/markdownEnrichment';
import { useDarkMode } from '@/lib/customHooks';
import Image from 'next/image';

const contentId = 'article-content';

const MdContent = ({ content: { title, date, startDate, endDate, thumbnail, content }, noDate }) => {
  const darkMode = useDarkMode();

  useDetailTagsAnimation();

  useImageZoom(contentId);

  useEffect(() => {
    if (darkMode === undefined) return;
    if (darkMode) {
      import('highlight.js/styles/a11y-dark.css');
    } else {
      import('highlight.js/styles/a11y-light.css');
    }
  }, [darkMode]);

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
          width={0}
          height={0}
          sizes="100vw"
          className={contentStyles.thumbnail}
          alt={`${title} thumbnail`}
          src={thumbnail}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${thumbnail}&w=16&q=1`}
        />
      )}
      <div id={contentId} className={contentStyles.markdown} dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default MdContent;
