import { useEffect } from 'react';

const useNetlifyIdentityRedirectHook = () => {
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

export { useNetlifyIdentityRedirectHook };
