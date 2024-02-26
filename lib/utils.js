export const baseStyle = { transitionDuration: '650ms', transitionTimingFunction: 'ease-out' };

export const hiddenStyle = { opacity: 0, transform: 'translateY(3em)', filter: 'blur(4px)' };

export function getYearsSinceDate(dateString) {
  const now = new Date();
  const diff = Math.abs(now - new Date(dateString));
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); // Years since date
}

export function isExternalLink(url = '') {
  return url.startsWith('http://') || url.startsWith('https://');
}

export async function getRepositoryLatestCommitDate(repository) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/commits`);
    const commits = await response.json();
    return commits[0].commit.committer.date;
  } catch (error) {
    return error;
  }
}

export const disableScroll = () => document.body.classList.add('no-scroll');

export const enableScroll = () => document.body.classList.remove('no-scroll');

export const isImage = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];
export const isVideo = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4', '.webm'];
