import { useCallback, useEffect, useRef, useState } from 'react';

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
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const onColorSchemeChange = ({ matches }) => {
      if (matches !== darkMode) setDarkMode(matches);
    };
    matchMedia.addEventListener('change', onColorSchemeChange);
    setDarkMode(matchMedia.matches); // set initial state

    return () => matchMedia.removeEventListener('change', onColorSchemeChange);
  }, [darkMode]);

  return darkMode;
}

/**
 * A wrapper for useEffect that allows for async functions
 * @param asyncEffect {function}
 * @param dependencies {any[]}
 */
export function useAsyncEffect(asyncEffect, dependencies = undefined) {
  useEffect(() => {
    asyncEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
