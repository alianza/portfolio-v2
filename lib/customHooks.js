import { useEffect, useState } from 'react';

export function useNetlifyIdentityRedirect() {
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
}

export function useDarkMode(options = { initialMode: null }) {
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

/**
 * A wrapper for useEffect that allows for async functions
 * @param asyncEffect {function}
 * @param dependencies {any[]}
 */
export function useAsyncEffect(asyncEffect, dependencies) {
  useEffect(() => {
    asyncEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
