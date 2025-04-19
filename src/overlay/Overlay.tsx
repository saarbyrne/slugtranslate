import { h } from 'preact';
import { useState } from 'preact/hooks';
import './styles.css';

interface Props {
  // We now expect a Selection rather than an input element
  selection: Selection;
}

export default function Overlay({ selection }: Props) {
  const original = selection.toString();
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  const translateText = () => {
    setLoading(true);
    chrome.runtime.sendMessage(
      { type: 'TRANSLATE', text: original, targetLang: 'ES' },
      (response) => {
        setLoading(false);
        setTranslated(response.error ? 'Error al traducir' : response.translated);
      }
    );
  };

  const applyTranslation = () => {
    // Replace the selected content in‑place
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(translated));

    // Clean up
    document.getElementById('translate-overlay')?.remove();
  };

  return (
    <div
      className="translate-overlay"
      onMouseDown={e => { e.preventDefault(); e.stopPropagation(); }}
      onClick={e => { e.preventDefault(); e.stopPropagation(); }}
    >
      <div className="header">🔤 Traductor</div>
      <div className="body">
        <label>Original:</label>
        <textarea readOnly value={original} />

        <button type="button" onClick={translateText} disabled={loading || !original}>
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
