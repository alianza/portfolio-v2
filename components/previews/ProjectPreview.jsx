import TransitionScroll from 'react-transition-scroll';
import { hiddenStyle, baseStyle } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import StartEndDateLabel from '@/components/common/StartEndDateLabel';

const pseudoElementBaseClass =
  'after:bg-48px bg-no-repeat after:absolute after:left-1 after:top-1 after:h-12 after:w-12  after:object-cover after:drop-shadow-xl after:content-[""] after:pointer-events-none';

export default function ProjectPreview({ project, preLoad }) {
  const { id, thumbnail, type, title, startDate, endDate, description } = project;
  let projectTypeImageBgClass = '';
  let className = '';

  if (type) {
    switch (type) {
      case 'Professional':
        projectTypeImageBgClass = 'after:bg-pro';
        break;
      case 'Personal':
        projectTypeImageBgClass = 'after:bg-personal';
        break;
      case 'Academic':
        projectTypeImageBgClass = 'after:bg-academic';
        break;
    }

    projectTypeImageBgClass = `${projectTypeImageBgClass} ${pseudoElementBaseClass}`;
  }

  if (preLoad) {
    className = `pointer-events-none invisible absolute h-0 overflow-hidden`;
  }

  return (
    <TransitionScroll
      key={id}
      baseStyle={baseStyle}
      hiddenStyle={hiddenStyle}
      {...(preLoad && { showStyle: { opacity: 0 } })}
      {...{ className }}
    >
      <Link href={`/projects/${id}`} className={`${projectTypeImageBgClass} hoverSlight relative block`}>
        <Image
          className="aspect-square w-full rounded object-cover shadow-lg"
          alt={`${title} thumbnail`}
          title={`${type} project: ${title}`}
          width={500}
          height={500}
          src={thumbnail}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${thumbnail}&w=16&q=1`}
        />
      </Link>
      <div className="my-1">
        <Link href={`/projects/${id}`} className="link my-1 text-2xl font-bold">
          {title}
        </Link>
        <StartEndDateLabel startDate={startDate} endDate={endDate} />
        <p className="line-clamp-3 font-light" title={description?.length > 120 ? description : ''}>
          {description}
        </p>
      </div>
    </TransitionScroll>
  );
}
