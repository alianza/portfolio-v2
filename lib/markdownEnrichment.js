import { useEffect } from 'react';
import Accordion from './accordion';
import {
  disableScroll,
  enableScroll,
  getRepositoryLatestCommitDate,
  isExternalLink,
  getYearsSinceDate,
} from '@/lib/utils';
import config from '@/content/config.json';
import { useAsyncEffect, useDarkMode } from '@/lib/customHooks';

const svgClassName =
  'w-8 h-8 dark:text-neutral-50 text-neutral-800 my-4 mx-6 drop-shadow group-hover:stroke-[3] group-focus:stroke-[3] group-active:scale-90 pointer-events-none transition-[stroke-width,transform] group-active:duration-150';

const getSvg = (svg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${svgClassName}">${svg}</svg>`;

const rightSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />`;
const leftSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />`;
const closeSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`;

// todo: All custom hooks dependency arrays are empty. For app router DOM nodes seem to change across re-renders.

export function useDetailTagsAnimation(contentId) {
  useEffect(() => {
    document.querySelectorAll(`#${contentId} details`).forEach((e) => new Accordion(e)); // Set Accordion animation for all details tags
  });
}

export function useImageZoom(containerId) {
  useEffect(() => {
    const eventListener = (e) => {
      const dialog = document.createElement('dialog');
      dialog.innerHTML = `<img src="${e.target.src}" alt="${e.target.alt}" />
                          <button class="fixed right-1 top-1/2 group z-30" data-next>${getSvg(rightSvg)}</button>
                          <button class="fixed left-1 top-1/2 group z-30" data-previous>${getSvg(leftSvg)}</button>
                          <button class="fixed right-0 top-2 group z-30" data-close>${getSvg(closeSvg)}</button>`;

      openDialog();

      const nextButton = document.querySelector('dialog button[data-next]');
      const previousButton = document.querySelector('dialog button[data-previous]');
      const closeButton = document.querySelector('dialog button[data-close]');
      const currentImage = document.querySelector('dialog img');
      const images = document.querySelectorAll(`#${containerId} img:not([alt='icon'])`);
      let currentIndex = Array.from(images).findIndex((img) => img.src === currentImage.src);

      if (images.length === 1) {
        nextButton.remove();
        previousButton.remove();
      }

      const stopPropagationAndDo = (fn) => (e) => {
        e.stopPropagation();
        fn();
      };
      const nextImage = () => setCurrentImage((currentIndex + 1 + images.length) % images.length);
      const previousImage = () => setCurrentImage((currentIndex - 1 + images.length) % images.length);
      const setCurrentImage = (index) => {
        currentIndex = index;
        const nextImage = images[index];
        currentImage.src = nextImage.src;
        currentImage.alt = nextImage.alt;
      };

      function openDialog() {
        document.body.appendChild(dialog);
        disableScroll();
        dialog.showModal();
      }

      function closeDialog() {
        dialog.remove();
        enableScroll();
      }

      const keyListener = (e) => {
        if (e.key === 'ArrowRight') {
          nextButton.focus();
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          previousButton.focus();
          previousImage();
        } else if (e.key === 'Escape') {
          closeDialog();
        }
      };

      dialog.addEventListener('click', closeDialog);
      dialog.addEventListener('keydown', keyListener);
      nextButton.addEventListener('click', stopPropagationAndDo(nextImage));
      previousButton.addEventListener('click', stopPropagationAndDo(previousImage));
      closeButton.addEventListener('click', stopPropagationAndDo(closeDialog));
    };

    const container = document.getElementById(containerId);
    const images = container.querySelectorAll(`img:not([alt='icon'])`);
    images.forEach((img) => img.addEventListener('click', eventListener));
    return () => {
      images.forEach((img) => img.removeEventListener('click', eventListener));
    };
  });
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
  });
}

export function useGithubLastUpdated(contentId) {
  const githubUrl =
    config.accounts.find((a) => a.name.toLowerCase().includes('github'))?.url || 'https://github.com/alianza/';

  useAsyncEffect(async () => {
    const githubButton = document.querySelector(`#${contentId} a[href^='${githubUrl}'] button`);
    if (githubButton && !githubButton.getAttribute('data-has-last-updated')) {
      githubButton.setAttribute('data-has-last-updated', 'true');
      const projectId = githubButton.parentElement.getAttribute('href').split('/').slice(-2).join('/');
      const lastUpdated = await getRepositoryLatestCommitDate(projectId);
      const lastUpdatedDate = new Date(lastUpdated);
      const lastUpdatedString =
        lastUpdatedDate.toString() !== 'Invalid Date' ? lastUpdatedDate.toDateString().replace(/^\S+\s/, '') : '';
      if (lastUpdatedString) {
        githubButton.insertAdjacentHTML('beforeend', `<span><b>Last updated:</b> ${lastUpdatedString}</span>`);
      }
    }
  });
}

export function useCodeHighlightStyles() {
  const darkMode = useDarkMode();

  useEffect(() => {
    if (darkMode === null) return; // Initial mode
    if (darkMode) {
      import('highlight.js/styles/github-dark.min.css');
    } else {
      import('highlight.js/styles/github.min.css');
    }
  }, [darkMode]);
}

export function useYearsSinceDateTags() {
  useEffect(() => {
    const dateTags = document.querySelectorAll('[data-years-since-date]');
    dateTags.forEach((dateTag) => {
      const { dateString } = dateTag.dataset;
      const yearsSinceDate = getYearsSinceDate(dateString);
      dateTag.innerHTML = yearsSinceDate.toString();
      const parent = dateTag.parentElement;

      if (parent.tagName === 'P') {
        parent.style.display = 'inline';
      }

      if (parent.nextElementSibling?.tagName === 'P') {
        const paragraph = parent.nextElementSibling;
        paragraph.style.display = 'inline';
      }

      if (parent.previousElementSibling?.tagName === 'P') {
        const paragraph = parent.previousElementSibling;
        paragraph.style.display = 'inline';
        paragraph.previousElementSibling.style.marginBottom = '1.2em';
      }
    });
  }, []);
}
