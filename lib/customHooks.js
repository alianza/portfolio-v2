import { useEffect, useState } from 'react';

const useNetlifyIdentityRedirect = () => {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }, []);
};

export function useDarkMode(options = { initialMode: undefined }) {
  const [darkMode, setDarkMode] = useState(options.initialMode);

  useEffect(() => {
    const onColorSchemeChange = ({ matches }) => setDarkMode(matches);
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    matchMedia.addEventListener('change', onColorSchemeChange);
    setDarkMode(matchMedia.matches); // set initial state

    return () => matchMedia.removeEventListener('change', onColorSchemeChange);
  }, []);

  return darkMode;
}

export { useNetlifyIdentityRedirect };
