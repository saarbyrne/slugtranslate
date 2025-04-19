import { render } from 'preact';
import Overlay from './overlay/Overlay';
import './overlay/styles.css';

// When the page loads, find all inputs and textareas
const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
  'input, textarea'
);

inputs.forEach(el => {
  // Create the translate button
  const btn = document.createElement('button');
  btn.textContent = 'T';
  btn.className = 'translate-btn';
  btn.type = 'button'; // crucial: prevents form submission

  // On click, prevent any default/form behavior and show the overlay
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    showOverlay(el);
  });

  // Insert right after the input/textarea
  el.parentElement?.insertBefore(btn, el.nextSibling);
});

// Function to mount the overlay panel
function showOverlay(target: HTMLInputElement | HTMLTextAreaElement) {
  // Remove any existing overlay
  document.getElementById('translate-overlay')?.remove();

  // Create a container for our Preact component
  const container = document.createElement('div');
  container.id = 'translate-overlay';
  document.body.appendChild(container);

  // Render the overlay into that container
  render(<Overlay target={target} />, container);
}

console.log('✅ Content script loaded');
