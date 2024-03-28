'use client';

import contentStyles from '@/components/mdContent/mdContent.module.scss';
import {
  useCodeHighlightStyles,
  useDetailTagsAnimation,
  useExternalLinks,
  useGithubLastUpdated,
  useImageZoom,
  useYearsSinceDateTags,
} from '@/lib/markdownEnrichment';

const contentId = 'article-content';

function ArticleContent({ content }) {
  useDetailTagsAnimation(contentId);
  useImageZoom(contentId);
  useExternalLinks(contentId);
  useCodeHighlightStyles();
  useGithubLastUpdated(contentId);
  useYearsSinceDateTags();

  return <div id={contentId} className={contentStyles.markdown} dangerouslySetInnerHTML={{ __html: content }} />;
}

export default ArticleContent;
