import React, { useEffect } from 'react';
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.scss';

export default function Header({}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    menuOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((wasOpen) => !wasOpen);

  const getMenuList = (extraClasses = '') => (
    <ul className={`${extraClasses} flex flex-nowrap justify-between gap-4 whitespace-nowrap font-medium sm:gap-2`}>
      {[
        ['/#about', 'About me'],
        ['/#experiences', 'Experiences'],
        ['/cv', 'Curriculum Vitae'],
        ['/#contact', 'Contact'],
      ].map(([href, text]) => (
        <li key={href}>
          <Link href={href} className={`${utilStyles.link} py-4`}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-10 flex h-header items-center justify-between gap-2 bg-neutral-800 px-4 text-neutral-50">
      <Link href="/" className={`${utilStyles.link} whitespace-nowrap text-3xl font-extrabold`}>
        <h1 className="sm:hidden">J.W.</h1>
        <h1 className="hidden sm:block md:hidden">J.W. van Bremen</h1>
        <h1 className="hidden md:block">Jan-Willem van Bremen</h1>
      </Link>

      <button className={`${utilStyles.hoverStrong} z-30 text-3xl hover:duration-75 xs:hidden`} onClick={toggleMenu}>
        {!menuOpen ? '☰' : '✕'}
      </button>

      <nav
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          visibility: menuOpen ? 'visible' : 'hidden',
        }}
        className="absolute left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-neutral-900 bg-opacity-80 text-3xl transition-[opacity,visibility] xs:hidden"
        onClick={toggleMenu}
      >
        {getMenuList('flex-col -mt-32')}
      </nav>

      <nav className="hidden xs:block">{getMenuList()}</nav>
    </header>
  );
}
