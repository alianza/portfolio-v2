'use client';

import Image from 'next/image';

function AboutImage({ title, media, fallbackMedia }) {
  return (
    <Image
      key={title}
      src={media}
      alt={title}
      {...(fallbackMedia && {
        onError(e) {
          e.target.onerror = null;
          e.target.src = fallbackMedia;
          e.target.srcset = fallbackMedia;
        },
      })}
      className="w-full rounded shadow-lg"
      quality={100}
      width={500}
      height={500}
    />
  );
}

export default AboutImage;
