'use client';

import dynamic from 'next/dynamic';
const ProgressBar = dynamic(() => import('next-nprogress-bar').then((mod) => mod.AppProgressBar), {
  loading: () => <div />,
});

const Providers = () => {
  return <ProgressBar height="3px" color={'#eee'} shallowRouting="true" options={{ easing: 'ease', speed: 500 }} />;
};

export default Providers;
