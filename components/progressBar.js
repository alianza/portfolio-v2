'use client';

import dynamic from 'next/dynamic';
import { useDarkMode } from '@/lib/customHooks';
const ProgressBar = dynamic(() => import('next-nprogress-bar').then((mod) => mod.AppProgressBar), {
  loading: () => <div />,
});

const ProgressBarProvider = ({ children }) => {
  const darkMode = useDarkMode();

  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color={darkMode ? '#eee' : '#eee'}
        shallowRouting="true"
        options={{ easing: 'ease', speed: 500 }}
      />
    </>
  );
};

export default ProgressBarProvider;
