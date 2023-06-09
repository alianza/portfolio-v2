import { TransitionScroll } from 'react-transition-scroll';
import { hiddenStyle, transitionBaseStyle } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import StartEndDateLabel from '@/components/common/startEndDateLabel';

export default function ProjectPreview({ project, ...props }) {
  const { id, data } = project;
  console.log(`project`, project);
  return (
    <TransitionScroll key={id} baseStyle={transitionBaseStyle} hiddenStyle={hiddenStyle} {...props}>
      <Link href={`/projects/${id}`} className={`${(data.type = 'Professional' ? '' : '')} hoverSlight relative block`}>
        {' '}
        {/*Todo: Add pro / solo icons */}
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
  );
}
