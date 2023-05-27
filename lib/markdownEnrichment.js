import { useEffect } from 'react';
import Accordion from './accordion';

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
    const images = container?.querySelectorAll(`img`);
    images?.forEach((img) => img.addEventListener('click', eventListener));
    return () => {
      images?.forEach((img) => img.removeEventListener('click', eventListener));
    };
  }, [containerId]);
}
