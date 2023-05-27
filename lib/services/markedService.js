import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

let markedInstance;

export function ensureMarkedInstance() {
  if (markedInstance) return markedInstance;
  markedInstance = marked;

  if (!markedInstance.highlighter) {
    markedInstance.highlighter = 'hljs';
    markedInstance.use(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
      })
    );
  }

  return markedInstance;
}
