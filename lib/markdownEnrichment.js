import { useEffect } from 'react';
import Accordion from './accordion';

function useDetailTagsAnimation() {
  useEffect(() => {
    document.querySelectorAll('details').forEach((e) => new Accordion(e)); // Set Accordion animation for all details tags
  }, []);
}

export { useDetailTagsAnimation };
