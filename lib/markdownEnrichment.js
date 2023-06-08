import { useEffect } from 'react';
import Accordion from './accordion';
import { isExternalLink } from '@/lib/utils';

export function useDetailTagsAnimation() {
  useEffect(() => {
    document.querySelectorAll('details').forEach((e) => new Accordion(e)); // Set Accordion animation for all details tags
  }, []);
}

export function useImageZoom(containerId) {
  const eventListener = (e) => {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `<img src="${e.target.src}" alt="${e.target.alt}" />`;
    dialog.addEventListener('click', () => {
      dialog.remove();
      document.body.classList.remove('no-scroll');
    });
    document.body.appendChild(dialog);
    document.body.classList.add('no-scroll');
    dialog.showModal();
  };

  useEffect(() => {
    const container = document.getElementById(containerId);
    const images = container?.querySelectorAll(`img:not([alt='icon'])`);
    images?.forEach((img) => img.addEventListener('click', eventListener));
    return () => {
      images?.forEach((img) => img.removeEventListener('click', eventListener));
    };
  }, [containerId]);
}

export function useExternalLinks(contentId) {
  useEffect(() => {
    const content = document.getElementById(contentId);
    const links = content?.querySelectorAll('a');
    links?.forEach((link) => {
      if (isExternalLink(link.href)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }, [contentId]);
}

export function useCodeHighlightStyles(darkMode) {
  useEffect(() => {
    if (darkMode === null) return; // Initial mode
    if (darkMode) {
      import('highlight.js/styles/a11y-dark.css');
    } else {
      import('highlight.js/styles/a11y-light.css');
    }
  }, [darkMode]);
}
