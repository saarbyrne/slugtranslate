chrome.runtime.onMessage.addListener(
    (message: { type: 'TRANSLATE'; text: string; targetLang: string }, sender, sendResponse) => {
      if (message.type === 'TRANSLATE') {
        const params = new URLSearchParams();
        params.append('auth_key', import.meta.env.VITE_DEEPL_API_KEY);
        params.append('text', message.text);
        params.append('target_lang', message.targetLang);
  
        fetch('https://api.deepl.com/v2/translate', {
          method: 'POST',
          body: params
        })
          .then(res => res.json())
          .then((data: any) => {
            sendResponse({ translated: data.translations[0].text });
          })
          .catch(err => {
            console.error('Error traduciendo:', err);
            sendResponse({ error: true });
          });
  
        // Mantén el canal abierto para la respuesta asíncrona
        return true;
      }
    }
  );  