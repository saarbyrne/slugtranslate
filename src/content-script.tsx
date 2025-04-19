// Confirm injection
console.log('🚀 [SlugTranslate] content script injected');

import { render } from 'preact';
import Overlay from './overlay/Overlay';
import './overlay/styles.css';

// —— Utility: show the overlay for a given Selection ——
function showOverlay(sel: Selection) {
  console.log('▶️ showOverlay called with selection:', sel.toString());

  // Remove any existing overlay
  const old = document.getElementById('translate-overlay');
  if (old) old.remove();

  // Create container and mount your Preact component
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
  zIndex: '2147483647'
});
document.body.appendChild(translateBtn);

// —— 2) Show/hide & position on text selection ——
document.addEventListener('selectionchange', () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) {
    translateBtn.style.display = 'none';
    return;
  }

  // Compute position at end of selection
  const range = sel.getRangeAt(0);
  const rects = Array.from(range.getClientRects());
  const rect = rects.length
    ? rects[rects.length - 1]
    : range.getBoundingClientRect();

  translateBtn.style.top = `${window.scrollY + rect.bottom + 5}px`;
  translateBtn.style.left = `${window.scrollX + rect.right + 5}px`;
  translateBtn.style.display = 'block';

  // Store the Selection for later
  (translateBtn as any)._selection = sel;
});

// —— 3) Mousedown on “T” to open overlay (preserves selection) ——
translateBtn.addEventListener('mousedown', e => {
  e.preventDefault();
  e.stopPropagation();
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed && sel.toString().trim()) {
    showOverlay(sel);
    translateBtn.style.display = 'none';
  }
});

// —— 4) Option+A keyboard shortcut to open overlay (capture phase) ——
window.addEventListener(
  'keydown',
  e => {
    console.log('🔑 [capture] keydown', { code: e.code, alt: e.altKey });
    if (e.altKey && e.code === 'KeyA') {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && sel.toString().trim()) {
        e.preventDefault();
        e.stopPropagation();
        showOverlay(sel);
        translateBtn.style.display = 'none';
      }
    }
  },
  /* capture */ true
);
