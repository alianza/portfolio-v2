export const baseStyle = { transitionDuration: '650ms', transitionTimingFunction: 'ease-out' };

export const hiddenStyle = { opacity: 0, transform: 'translateY(3em)', filter: 'blur(4px)' };

export function yearsSinceDate(dateString) {
  const now = new Date();
  const diff = Math.abs(now - new Date(dateString));
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); // Years since date
}

export function isExternalLink(url = '') {
  return url.startsWith('http://') || url.startsWith('https://');
}

export function getRepositoryLatestCommitDate(repository) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/repos/${repository}/commits`)
      .then((response) => response.json())
      .then((commits) => {
        resolve(commits[0].commit.committer.date);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
