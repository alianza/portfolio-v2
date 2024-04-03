'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { disableScroll, enableScroll } from '@/lib/utils';
import { useNetlifyIdentityRedirect } from '@/lib/customHooks';
import MenuList from '@/components/layout/layout/header/MenuList';

export default function Header({}) {
  useNetlifyIdentityRedirect();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    menuOpen ? disableScroll() : enableScroll();
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((wasOpen) => !wasOpen);

  return (
    <header className="fixed top-0 z-10 flex h-header w-full items-center justify-between gap-2 bg-neutral-800 bg-opacity-65 px-4 text-neutral-50 backdrop-blur-lg">
      <Link href="/" className="link whitespace-nowrap text-3xl font-extrabold">
        <h1 className="sm:hidden">J.W.</h1>
        <h1 className="hidden sm:block md:hidden">J.W. van Bremen</h1>
        <h1 className="hidden md:block">Jan-Willem van Bremen</h1>
      </Link>

      <button className="hoverStrong z-30 text-3xl hover:duration-75 xs:hidden" onClick={toggleMenu}>
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
        <Suspense fallback={<div>Loading...</div>}>
          <MenuList className="-mt-32 flex-col" />
        </Suspense>
      </nav>

      <nav className="hidden xs:block">
        <Suspense fallback={<div>Loading...</div>}>
          <MenuList />
        </Suspense>
      </nav>
    </header>
  );
}
