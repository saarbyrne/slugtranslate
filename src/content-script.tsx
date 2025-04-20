// src/content-script.ts
console.log('🚀 [SlugTranslate] content script injected');

import { render } from 'preact';
import Overlay from './overlay/Overlay';
import './overlay/styles.css';

// —— Utility: show the overlay for a given Selection ——
function showOverlay(sel: Selection) {
  console.log('▶️ showOverlay with:', sel.toString());
  document.getElementById('translate-overlay')?.remove();
  const container = document.createElement('div');
  container.id = 'translate-overlay';
  document.body.appendChild(container);
  render(<Overlay selection={sel} />, container);
}

// —— 1) Floating “T” button ——
const translateBtn = document.createElement('button');
translateBtn.id = 'translate-selection-btn';
translateBtn.type = 'button';
translateBtn.textContent = 'T';
translateBtn.className = 'translate-btn';
Object.assign(translateBtn.style, {
  position: 'absolute',
  display: 'none',
  zIndex: '2147483647',
});
document.body.appendChild(translateBtn);

// —— 2) On selectionchange, position & store the selection ——
document.addEventListener('selectionchange', () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) {
    translateBtn.style.display = 'none';
    return;
  }

  // position at end of selection
  const range = sel.getRangeAt(0);
  const rects = Array.from(range.getClientRects());
  const rect = rects.length
    ? rects[rects.length - 1]
    : range.getBoundingClientRect();

  translateBtn.style.top = `${window.scrollY + rect.bottom + 5}px`;
  translateBtn.style.left = `${window.scrollX + rect.right + 5}px`;
  translateBtn.style.display = 'block';

  // store it
  (translateBtn as any)._selection = sel;
});

// —— 3) mousedown (not click) uses stored selection ——
translateBtn.addEventListener('mousedown', e => {
  e.preventDefault();
  e.stopPropagation();
  const stored = (translateBtn as any)._selection as Selection;
  if (stored && !stored.isCollapsed && stored.toString().trim()) {
    showOverlay(stored);
    translateBtn.style.display = 'none';
  }
});

// —— 4) Option+A shortcut (capture phase) also uses stored selection ——
window.addEventListener(
  'keydown',
  e => {
    if (e.altKey && e.code === 'KeyA') {
      const stored = (translateBtn as any)._selection as Selection;
      if (stored && !stored.isCollapsed && stored.toString().trim()) {
        e.preventDefault();
        e.stopPropagation();
        showOverlay(stored);
        translateBtn.style.display = 'none';
      }
    }
  },
  true
);
