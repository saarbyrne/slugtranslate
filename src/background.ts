console.log('🛠️ Background script loaded, API key:', import.meta.env.VITE_DEEPL_API_KEY);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Received message:', message);

  if (message.type !== 'TRANSLATE') return;
  const authKey = import.meta.env.VITE_DEEPL_API_KEY;
  console.log('🔑 Using auth key:', authKey);

  const params = new URLSearchParams({
    auth_key: authKey,
    text: message.text,
    target_lang: message.targetLang
  });

  fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    body: params
  })
    .then(async res => {
      console.log('🌐 DeepL response status:', res.status);
      const raw = await res.text();
      console.log('🌐 Raw response payload:', raw);

      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error('❌ JSON.parse error:', err);
        console.error('❌ Raw text:', raw);
        return sendResponse({ error: true, message: 'Invalid JSON' });
      }

      console.log('🌐 Parsed JSON:', data);
      if (data.translations?.[0]?.text) {
        sendResponse({ translated: data.translations[0].text });
      } else {
        console.error('❌ Unexpected DeepL payload', data);
        sendResponse({ error: true, message: 'No translation found' });
      }
    })
    .catch(err => {
      console.error('❌ Fetch error translating:', err);
      sendResponse({ error: true, message: err.message });
    });

  return true; // keep the message channel open
});
