import { useEffect } from 'react';
import Accordion from './accordion';
import { getRepositoryLatestCommitDate, isExternalLink } from '@/lib/utils';
import config from '../content/config.json';
import { useAsyncEffect } from '@/lib/customHooks';

const svgClassName =
  'w-6 h-6 dark:text-neutral-50 text-neutral-900 my-4 mx-6 group-hover:stroke-[3] group-active:scale-90 pointer-events-none transition-[stroke-width,transform] group-active:duration-150';

const getSvg = (svg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${svgClassName}">${svg}</svg>`;

const rightSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />`;
const leftSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />`;
const closeSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`;

export function useDetailTagsAnimation(contentId) {
  useEffect(() => {
    document.querySelectorAll('details').forEach((e) => new Accordion(e)); // Set Accordion animation for all details tags
  }, [contentId]);
}

export function useImageZoom(containerId) {
  useEffect(() => {
    const eventListener = (e) => {
      const dialog = document.createElement('dialog');
      dialog.innerHTML = `<img src="${e.target.src}" alt="${e.target.alt}" />
                          <button class="fixed right-1 top-1/2 group z-30" data-next>${getSvg(rightSvg)}</button>
                          <button class="fixed left-1 top-1/2 group z-30" data-previous>${getSvg(leftSvg)}</button>
                          <button class="absolute right-0 top-2 group z-30" data-close>${getSvg(closeSvg)}</button>`;

      dialog.addEventListener('click', () => closeDialog());

      dialog.addEventListener('keydown', (e) => e.key === 'Escape' && closeDialog()); // Close dialog on ESC key instead of closing it

      document.body.appendChild(dialog);
      document.body.classList.add('no-scroll');
      dialog.showModal();

      const nextButton = document.querySelector('dialog button[data-next]');
      const previousButton = document.querySelector('dialog button[data-previous]');
      const currentImage = document.querySelector('dialog img');
      const images = document.querySelectorAll(`#${containerId} img:not([alt='icon'])`);
      let currentIndex = Array.from(images).findIndex((img) => img.src === currentImage.src);

      const keyListener = (e) => {
        if (e.key === 'ArrowRight') {
          nextButton.focus();
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          previousButton.focus();
          previousImage();
        }
      };
      const nextImage = () => setCurrentImage((currentIndex + 1 + images.length) % images.length);
      const previousImage = () => setCurrentImage((currentIndex - 1 + images.length) % images.length);
      const setCurrentImage = (index) => {
        currentIndex = index;
        const nextImage = images[index];
        currentImage.src = nextImage.src;
        currentImage.alt = nextImage.alt;
      };
      const closeDialog = () => {
        dialog.remove();
        document.body.classList.remove('no-scroll');
      };

      dialog.addEventListener('keydown', keyListener);
      dialog.querySelectorAll('button').forEach((button) =>
        button.addEventListener('click', (event) => {
          event.stopPropagation();
          event.target.hasAttribute('data-next')
            ? nextImage()
            : event.target.hasAttribute('data-previous') && previousImage();
          event.target.hasAttribute('data-close') && closeDialog();
        }),
      );
    };

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

export function useGithubLastUpdated(contentId) {
  const githubUrl =
    config.accounts.find((a) => a.name.toLowerCase().includes('github'))?.url || 'https://github.com/alianza/';

  useAsyncEffect(async () => {
    const githubButton = document.querySelector(`a[href^='${githubUrl}'] button`);
    if (githubButton && !githubButton.getAttribute('data-has-last-updated')) {
      githubButton.setAttribute('data-has-last-updated', 'true');
      const projectId = githubButton.parentElement.getAttribute('href').split('/').slice(-2).join('/');
      githubButton.insertAdjacentHTML(
        'beforeend',
        `<span><b>Last updated:</b> ${new Date(await getRepositoryLatestCommitDate(projectId))
          .toDateString()
          .replace(/^\S+\s/, '')}</span>`,
      );
    }
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

export function useYearsSinceDateTags() {
  useEffect(() => {
    const dateTags = document.querySelectorAll('[data-years-since-date]');
    dateTags.forEach((dateTag) => {
      const { dateString } = dateTag.dataset;
      const diff = Math.abs(new Date() - new Date(dateString));
      const yearsSinceDate = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      dateTag.innerHTML = yearsSinceDate.toString();
    });
  }, []);
}
