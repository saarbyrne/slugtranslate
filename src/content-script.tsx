// src/content-script.ts
console.log('🚀 [SlugTranslate] content script injected');

import { render } from 'preact';
import Overlay from './overlay/Overlay';

// Inject CSS styles
const css = `
/* ===== Reset any inherited colors ===== */
#translate-overlay,
#translate-overlay * {
  background: unset !important;
  color: unset !important;
  border-color: unset !important;
}

/* ===== Panel container (always white bg, black text) ===== */
#translate-overlay {
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  width: 280px !important;
  background: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #ccc !important;
  border-radius: 6px !important;
  padding: 12px !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
  z-index: 2147483647 !important;
}

/* ===== Close button ===== */
.translate-close-btn {
  position: absolute !important;
  top: 6px !important;
  right: 6px !important;
  width: 24px !important;
  height: 24px !important;
  background: transparent !important;
  border: none !important;
  font-size: 1.2em !important;
  line-height: 1 !important;
  color: #000 !important;
  cursor: pointer !important;
}
.translate-close-btn:hover {
  color: #333 !important;
}

/* ===== Header ===== */
#translate-overlay .header {
  margin: 0 !important;
  font-size: 1em !important;
  font-weight: bold !important;
}

/* ===== Language switcher ===== */
.lang-switcher {
  display: block !important;
  margin: 8px auto !important;
  background: transparent !important;
  border: 1px solid #333 !important;
  border-radius: 4px !important;
  padding: 4px 8px !important;
  font-size: 0.9em !important;
  color: #000 !important;
  cursor: pointer !important;
}
.lang-switcher:hover {
  background: #f0f0f0 !important;
}

/* ===== Labels ===== */
#translate-overlay label {
  display: block !important;
  margin-top: 10px !important;
  font-size: 0.85em !important;
}

/* ===== Textareas ===== */
#translate-overlay textarea {
  width: 100% !important;
  height: 65px !important;
  margin-top: 4px !important;
  padding: 4px 6px !important;
  font-size: 0.9em !important;
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
  background: #fafafa !important;
  color: #000 !important;
  resize: vertical !important;
  overflow: auto !important;
  transition: height 0.4s ease !important;
}

/* ===== Action buttons ===== */
#translate-overlay .body button {
  display: block !important;
  width: auto !important;
  margin: 10px 0 0 !important;
  padding: 6px 10px !important;
  background: transparent !important;
  border: 1px solid #333 !important;
  border-radius: 4px !important;
  font-size: 0.9em !important;
  color: #000 !important;
  cursor: pointer !important;
}
#translate-overlay .body button:disabled {
  color: #aaa !important;
  border-color: #eee !important;
  cursor: default !important;
}
#translate-overlay .body button:not(:disabled):hover {
  background: #f0f0f0 !important;
}
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

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
