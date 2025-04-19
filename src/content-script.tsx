import { render } from 'preact';
import Overlay from './overlay/Overlay';
import './overlay/styles.css';

// Create one floating “T” button, hidden by default
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

// Whenever you change selection, show or hide & reposition the button
document.addEventListener('selectionchange', () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.toString().trim()) {
    translateBtn.style.display = 'none';
    return;
  }

  const range = sel.getRangeAt(0);
  const rects = Array.from(range.getClientRects());
  const rect = rects.length ? rects[rects.length - 1] : range.getBoundingClientRect();

  // Position just below and to the right of the selection
  translateBtn.style.top = `${window.scrollY + rect.bottom + 5}px`;
  translateBtn.style.left = `${window.scrollX + rect.right + 5}px`;
  translateBtn.style.display = 'block';

  // Save this selection for the click handler
  (translateBtn as any)._selection = sel;
});

// On click, mount the overlay with that selection
translateBtn.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  const sel = (translateBtn as any)._selection as Selection;
  if (!sel || !sel.toString().trim()) return;

  // Remove any existing overlay
  document.getElementById('translate-overlay')?.remove();

  // Create and render the Overlay, passing the selection
  const container = document.createElement('div');
  container.id = 'translate-overlay';
  document.body.appendChild(container);
  render(<Overlay selection={sel} />, container);

  // Hide the button until next selection
  translateBtn.style.display = 'none';
});

console.log('✅ Content script (selection version) loaded');
