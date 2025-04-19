import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './styles.css';

type Lang = 'en' | 'es';

interface Props {
  selection: Selection;
}

export default function Overlay({ selection }: Props) {
  const original = selection.toString();
  const [isEnToEs, setIsEnToEs] = useState(true);
  const sourceLang: Lang = isEnToEs ? 'en' : 'es';
  const targetLang: Lang = isEnToEs ? 'es' : 'en';
  const [translated, setTranslated] = useState('');
  const [loading, setLoading] = useState(false);

  const translateText = () => {
    if (!original.trim()) return;
    setLoading(true);
    chrome.runtime.sendMessage(
      { type: 'TRANSLATE', text: original, sourceLang, targetLang },
      (response) => {
        setLoading(false);
        setTranslated(response.error ? 'Error al traducir' : response.translated);
      }
    );
  };

  const applyTranslation = () => {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(translated));
    closeOverlay();
  };

  const closeOverlay = () => {
    document.getElementById('translate-overlay')?.remove();
  };

  // Auto-translate on mount
  useEffect(() => {
    translateText();
  }, []); // run once

  // Keyboard shortcuts: Escape to close, Option+D to translate
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeOverlay();
      }
      if (e.altKey && e.code === 'KeyD') {
        e.preventDefault();
        translateText();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [original, sourceLang, targetLang]);

  return (
    <div
      id="translate-overlay"
      className="translate-overlay"
      onMouseDown={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
    >
      <button
        type="button"
        className="translate-close-btn"
        onClick={closeOverlay}
      >
        ×
      </button>

      <div className="header">🔤 Traductor</div>

      <button
        type="button"
        className="lang-switcher"
        onClick={() => setIsEnToEs(!isEnToEs)}
      >
        {isEnToEs ? 'EN → ES' : 'ES → EN'}
      </button>

      <label>Texto original</label>
      <textarea readOnly value={original} />

      {/* optional manual re-translate button */}
      <button
        type="button"
        onClick={translateText}
        disabled={loading || !original.trim()}
      >
        {loading ? 'Traduciendo…' : 'Traducir ahora'}
      </button>

      <label>Traducción</label>
      <textarea
        value={translated}
        onInput={e => setTranslated((e.target as HTMLTextAreaElement).value)}
      />

      <button
        type="button"
        onClick={applyTranslation}
        disabled={!translated.trim()}
      >
        Insertar traducción
      </button>
    </div>
  );
}
