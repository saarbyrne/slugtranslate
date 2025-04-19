chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type !== 'TRANSLATE') return;

  const source = msg.sourceLang;                   // e.g. 'en' or 'es'
  const target = msg.targetLang;

  fetch(
    `https://api.mymemory.translated.net/get` +
      `?q=${encodeURIComponent(msg.text)}` +
      `&langpair=${source}|${target}`
  )
    .then(r => r.json())
    .then(data => {
      console.log('📝 MyMemory response:', data);
      const translated = data.responseData?.translatedText || '';
      sendResponse({ translated });
    })
    .catch(err => {
      console.error('❌ MyMemory error:', err);
      sendResponse({ error: true, message: err.message });
    });

  return true;
});
