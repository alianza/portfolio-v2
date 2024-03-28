'use client';

import { useYearsSinceDateTags } from '@/lib/markdownEnrichment';

function AboutMdContent({ content }) {
  useYearsSinceDateTags();

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default AboutMdContent;
