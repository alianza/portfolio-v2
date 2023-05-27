import React from 'react';

export default function Header({}) {
  return (
    <header id="header" className="h-16 px-4 flex items-center bg-amber-700">
      <span className="text-3xl">
        <h1 className="sm:hidden">J.W.</h1>
        <h1 className="hidden sm:block md:hidden">J.W. van Bremen</h1>
        <h1 className="hidden md:block">Jan-Willem van Bremen</h1>
      </span>
    </header>
  );
}
