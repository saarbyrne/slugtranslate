console.log('🚀 [Translator] content script injected');
import { render } from 'preact';
import Overlay from './overlay/Overlay';
import './overlay/styles.css';

// —— 1) Create a single floating “T” button ——
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

// —— 2) Show/hide & position on selection change ——
document.addEventListener('selectionchange', () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) {
    translateBtn.style.display = 'none';
    return;
  }

  // Get the last client rect of the selection for positioning
  const range = sel.getRangeAt(0);
  const rects = Array.from(range.getClientRects());
  const rect = rects.length ? rects[rects.length - 1] : range.getBoundingClientRect();

  translateBtn.style.top = `${window.scrollY + rect.bottom + 5}px`;
  translateBtn.style.left = `${window.scrollX + rect.right + 5}px`;
  translateBtn.style.display = 'block';

  // Save the current selection for the click handler
  (translateBtn as any)._selection = sel;
});

// —— 3) Click on “T” opens the overlay ——
translateBtn.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  const sel = (translateBtn as any)._selection as Selection;
  if (!sel || !sel.toString().trim()) return;

  // Remove any existing overlay
  document.getElementById('translate-overlay')?.remove();

  // Render the overlay with the saved selection
  const container = document.createElement('div');
  container.id = 'translate-overlay';
  document.body.appendChild(container);
  render(<Overlay selection={sel} />, container);

  // Hide the button until next selection
  translateBtn.style.display = 'none';
});

// Capture-phase listener so we get the event before the page does
window.addEventListener('keydown', (e) => {
  console.log('🔑 [capture] keydown', e.code, 'alt=', e.altKey);
  if (e.altKey && e.code === 'KeyA') {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().trim()) {
      e.preventDefault();
      e.stopPropagation();

      // Tear down & re-render the overlay
      document.getElementById('translate-overlay')?.remove();
      const container = document.createElement('div');
      container.id = 'translate-overlay';
      document.body.appendChild(container);
      render(<Overlay selection={sel} />, container);

      // Hide the “T” button
      translateBtn.style.display = 'none';
    }
  }
}, /* capture */ true);
