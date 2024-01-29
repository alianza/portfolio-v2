import { ensureMarkedInstance } from '@/lib/services/markedService';
import config from '../../content/config.json';

const introductions = config.introductions;

function parseIntro(introduction) {
  const marked = ensureMarkedInstance();

  if (introduction.content) return introduction; // Already parsed

  introduction.content = marked.parseInline(introduction.body || '') || '';
  delete introduction.body;

  return introduction;
}

export async function getIntros() {
  return introductions.map((introduction) => parseIntro(introduction));
}
