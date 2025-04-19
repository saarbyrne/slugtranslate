import { render } from 'preact';
import Overlay from './overlay/Overlay';
import './overlay/styles.css';

// Al cargar la página, busca inputs y textareas
const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
inputs.forEach(el => {
  const btn = document.createElement('button');
  btn.textContent = 'T';
  btn.className = 'translate-btn';
  btn.onclick = () => showOverlay(el);
  el.parentElement?.appendChild(btn);
});

function showOverlay(target: HTMLInputElement | HTMLTextAreaElement) {
  document.getElementById('translate-overlay')?.remove();
  const container = document.createElement('div');
  container.id = 'translate-overlay';
  document.body.appendChild(container);
  render(<Overlay target={target} />, container);
}