import React, { useEffect } from 'react';
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.scss';

export default function Header({}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const menuStyle = {
    opacity: menuOpen ? 1 : 0,
    pointerEvents: menuOpen ? 'auto' : 'none',
    visibility: menuOpen ? 'visible' : 'hidden',
  };

  useEffect(() => {
    menuOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((wasOpen) => !wasOpen);
  };

  const getMenuList = (additionalClasses = '') => (
    <ul
      className={`${additionalClasses} flex sm:gap-2 gap-4 justify-between flex-nowrap whitespace-nowrap font-medium`}
    >
      <li>
        <Link className={`${utilStyles.link} py-4`} href="/#about">
          About me
        </Link>
      </li>
      <li>
        <Link className={`${utilStyles.link} py-4`} href="/#experiences">
          Experiences
        </Link>
      </li>
      <li>
        <Link className={`${utilStyles.link} py-4`} href="/#cv">
          Curriculum Vitae
        </Link>
      </li>
      <li>
        <Link className={`${utilStyles.link} py-4`} href="/#contact">
          Contact
        </Link>
      </li>
    </ul>
  );

  return (
    <header id="header" className="sticky top-0 z-10 h-16 px-4 flex gap-2 items-center justify-between bg-amber-700">
      <Link href="/" className={`${utilStyles.link} text-3xl font-extrabold whitespace-nowrap`}>
        <h1 className="sm:hidden">J.W.</h1>
        <h1 className="hidden sm:block md:hidden">J.W. van Bremen</h1>
        <h1 className="hidden md:block">Jan-Willem van Bremen</h1>
      </Link>

      <button className={`${utilStyles.hoverEffectStrong} xs:hidden text-3xl`} onClick={toggleMenu}>
        ☰
      </button>

      <nav
        style={menuStyle}
        className="absolute flex z-20 text-3xl justify-center items-center bg-neutral-900 bg-opacity-80 left-0 top-0 w-full h-screen transition-[opacity,visibility] xs:hidden"
        onClick={toggleMenu}
      >
        {getMenuList('flex-col -mt-32')}
      </nav>

      <nav className="hidden xs:block">{getMenuList()}</nav>
    </header>
  );
}
