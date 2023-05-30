import React from 'react';
import config from '../../../content/config.json';
import utilStyles from '../../../styles/utils.module.scss';

export default function Footer({}) {
  return (
    <footer id="footer" className="mt-auto flex flex-wrap items-center justify-between bg-neutral-700 px-4">
      <p className="my-2 font-semibold">Author: Jan-Willem van Bremen</p>
      <div className="my-2 flex flex-wrap gap-4 sm:flex-nowrap">
        {config.accounts.map(({ name, url, icon }) => (
          <a className={`${utilStyles.link}`} key={name} href={url}>
            {name}
          </a>
        ))}
      </div>
    </footer>
  );
}
