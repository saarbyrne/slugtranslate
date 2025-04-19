import { h } from 'preact';
import { useState } from 'preact/hooks';
import './styles.css';

interface Props {
  target: HTMLInputElement | HTMLTextAreaElement;
}

export default function Overlay({ target }: Props) {
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  const translateText = () => {
    setLoading(true);
    chrome.runtime.sendMessage(
      { type: 'TRANSLATE', text: target.value, targetLang: 'ES' },
      (response) => {
        setLoading(false);
        if (response.error) {
          setTranslated('Error al traducir');
        } else {
          setTranslated(response.translated);
        }
      }
    );
  };

  const applyTranslation = () => {
    console.log('🚀 Applying translation:', translated, 'to', target);

    // 1) Set the new value
    target.value = translated;

    // 2) Dispatch input & change events
    const inputEvt = new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      data: translated,
    });
    target.dispatchEvent(inputEvt);
    const changeEvt = new Event('change', { bubbles: true });
    target.dispatchEvent(changeEvt);

    // 3) Fallback DOM replace
    try {
      target.setRangeText(translated, 0, target.value.length, 'end');
      target.dispatchEvent(inputEvt);
    } catch (e) {
      console.warn('⚠️ setRangeText fallback failed:', e);
    }

    // 4) Refocus and move cursor to end
    target.focus();
    const pos = translated.length;
    try {
      target.setSelectionRange(pos, pos);
    } catch {}

    // 5) Remove the overlay
    document.getElementById('translate-overlay')?.remove();
  };

  return (
    <div
      id="translate-overlay"
      className="translate-overlay"
      onMouseDown={e => { e.preventDefault(); e.stopPropagation(); }}
      onClick={e => { e.preventDefault(); e.stopPropagation(); }}
    >
      <div className="header">🔤 Traductor</div>
      <div className="body">
        <label>Original:</label>
        <textarea readOnly value={target.value} />

        <button
          type="button"
          onClick={translateText}
          disabled={loading || !target.value}
        >
          {loading ? '…' : 'Traducir'}
        </button>

        <label>Traducción (editable):</label>
        <textarea
          value={translated}
          onInput={e => setTranslated((e.target as HTMLTextAreaElement).value)}
        />

        <button
          type="button"
          onClick={applyTranslation}
          disabled={!translated}
          style={{ marginTop: '8px' }}
        >
          Insertar traducción
        </button>
      </div>
    </div>
  );
}
