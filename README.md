# SlugTranslate - Inline English-Spanish Translation
https://chromewebstore.google.com/detail/slug-translate/cdbloidgfaclhajkkmlfnnamggoledmg?hl=en-GB&utm_source=ext_sidebar
> **Select text → Translate inline** - A Chrome extension for instant, on-page translation between English and Spanish without leaving your current tab.

[![Chrome](https://img.shields.io/badge/Chrome-Extension-blue)](https://www.google.com/chrome/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Preact](https://img.shields.io/badge/Preact-10.26-purple)](https://preactjs.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3-yellow)](https://vitejs.dev/)

**No copy-paste. No new tabs. Just select → translate → read.**

---

## 🎯 What is SlugTranslate?

SlugTranslate is a lightweight Chrome extension that provides **instant, inline translation** between English and Spanish for any selected text on any webpage.

### **The Problem**
Traditional translation tools force you to:
1. Select text
2. Copy
3. Open new tab/window
4. Paste
5. Read translation
6. Switch back to original tab

### **The Solution**
With SlugTranslate:
1. **Select text** (on any webpage)
2. **Click "T" button** or press `Alt+A`
3. **Translation appears** in bottom-right overlay
4. **Optional**: Replace selected text with translation

**That's it.** Stay in flow, keep reading.

---

## ✨ Key Features

### **📍 Inline Translation Overlay**
- **Fixed Position**: Bottom-right corner (non-intrusive)
- **Always on Top**: High z-index (2147483647)
- **Editable**: Modify translation before inserting
- **Clean Design**: Minimal white panel (280px wide)

### **↔️ Bidirectional Translation**
- **English → Spanish** (EN→ES)
- **Spanish → English** (ES→EN)
- **Default**: ES→EN (Spanish to English)
- **Toggle**: Switch direction with one click

### **⌨️ Keyboard Shortcuts**
- **`Alt+A`**: Open translation overlay
- **`Alt+D`**: Re-translate with current settings
- **`Escape`**: Close overlay

### **🔄 Text Replacement**
- **"Insert Translation" button**: Replace selected text with translation
- **Inline editing**: Edit translation before replacing
- **One-click action**: Seamless text replacement

### **🎨 User Experience**
- **Floating "T" button**: Appears near text selection
- **No page modification**: Overlay doesn't disrupt layout
- **Responsive**: Works on all websites
- **Lightweight**: ~10KB total extension size

---

## 🚀 Quick Start

### **For Users (End Users)**

#### **Option 1: Install from Chrome Web Store** (Coming Soon)
1. Visit Chrome Web Store (not yet published)
2. Click "Add to Chrome"
3. Confirm installation
4. Start translating!

#### **Option 2: Manual Installation** (Developer Mode)

```bash
# 1. Clone repository
git clone https://github.com/saarbyrne/slugtranslate.git
cd slugtranslate

# 2. Install dependencies
npm install

# 3. Build extension
npm run build
# Creates /dist directory with production files

# 4. Load in Chrome
# - Open Chrome
# - Navigate to chrome://extensions/
# - Enable "Developer mode" (top-right toggle)
# - Click "Load unpacked"
# - Select the /dist folder
# - Extension icon appears in toolbar
```

### **For Developers**

```bash
# Clone and install
git clone https://github.com/saarbyrne/slugtranslate.git
cd slugtranslate
npm install

# Development with hot reload
npm run dev
# Load /dist as unpacked extension
# Changes rebuild automatically

# Production build
npm run build

# Lint code
npm run lint
```

---

## 📖 How to Use

### **Method 1: Floating "T" Button**
1. **Select text** on any webpage
2. **Click** the floating "T" button that appears near selection
3. **Translation overlay** appears in bottom-right
4. **Read translation**
5. **Optional**: Click "Insert Translation" to replace original text
6. **Close** with X button or `Escape` key

### **Method 2: Keyboard Shortcut**
1. **Select text** on any webpage
2. **Press `Alt+A`**
3. **Translation overlay** appears
4. **Read or edit translation**
5. **Press `Alt+D`** to re-translate if needed
6. **Press `Escape`** to close

### **Translation Direction**
- **Default**: Spanish → English (ES→EN)
- **Toggle**: Click direction toggle button
- **Persists**: Direction remembered during session

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Chrome Extension Manifest V3 | Latest extension standard |
| **Build Tool** | Vite 6.3.1 | Fast, modern bundler |
| **Framework** | Preact 10.26.5 | Lightweight React alternative (~3KB) |
| **Language** | TypeScript 5.7.2 | Type safety |
| **Styling** | Plain CSS3 | Isolated styles with `!important` |
| **Translation API** | MyMemory Translation API | Free, public translation service |

### **Key Dependencies**
```json
{
  "preact": "^10.26.5",
  "@preact/preset-vite": "^2.8.1",
  "@types/chrome": "^0.0.315",
  "typescript": "~5.7.2",
  "vite": "^6.3.1"
}
```

---

## 📁 Project Structure

```
slugtranslate/
├── src/
│   ├── background.ts          # Service worker (24 lines)
│   │   └── Handles API calls to MyMemory
│   │
│   ├── content-script.tsx     # Main content script (197 lines)
│   │   ├── Text selection detection
│   │   ├── Floating "T" button
│   │   ├── Overlay management
│   │   └── Keyboard shortcuts
│   │
│   ├── overlay/
│   │   ├── Overlay.tsx        # Translation UI (116 lines)
│   │   │   ├── Translation display
│   │   │   ├── Direction toggle
│   │   │   ├── Edit & insert controls
│   │   │   └── Keyboard handlers
│   │   │
│   │   └── styles.css         # Overlay styling (110 lines)
│   │       └── Isolated styles with high specificity
│   │
│   └── vite-env.d.ts          # TypeScript env declarations
│
├── public/
│   ├── icon.png               # Extension icon (7.6KB)
│   └── vite.svg               # Unused
│
├── dist/                      # Built extension (git-ignored)
│   ├── background.js
│   ├── contentScript.js
│   ├── contentScript.css
│   ├── manifest.json
│   └── icon.png
│
├── manifest.json              # Extension configuration
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite build config
├── README.md                  # This file
├── privacypolicy.md           # Privacy policy
├── .gitignore                 # Git ignore rules
├── dist.crx                   # Packaged extension
├── dist.pem                   # Extension signing key
├── slugtranslate-extension.zip # Distribution package
└── index.html                 # Unused (Vite boilerplate)
```

---

## 🔌 Translation API

### **MyMemory Translation API**

**Provider**: [MyMemory](https://mymemory.translated.net/)

**Features**:
- **Free**: No API key required
- **Public**: Open translation service
- **Rate Limits**: Reasonable for personal use
- **Quality**: Decent for common phrases

**Example API Call**:
```javascript
const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
// langpair: "es|en" or "en|es"

const response = await fetch(url);
const data = await response.json();
const translation = data.responseData.translatedText;
```

**Limitations**:
- Single language pair per extension
- Quality varies for complex sentences
- No offline support
- Subject to API availability

---

## 🔒 Privacy & Security

### **Privacy-First Design**
- **No Data Collection**: Zero user data stored
- **No Tracking**: No analytics or telemetry
- **No Accounts**: No login required
- **No Permissions**: Minimal permissions (only API access)
- **Open Source**: Code is transparent and auditable

### **Data Flow**
1. User selects text (stays in browser)
2. Text sent to MyMemory API (HTTPS)
3. Translation returned (not stored)
4. Overlay displayed (client-side only)
5. No data persistence

### **Privacy Policy**
See [privacypolicy.md](./privacypolicy.md) for full policy.

---

## 🐛 Known Issues & Limitations

### **Known Issues**
1. **Privacy Policy Inaccuracy**: References wrong API (LibreTranslate vs MyMemory)
2. **Package Name Mismatch**: `package.json` name is "languagekeyboard" instead of "slugtranslate"
3. **Version Inconsistency**: `package.json` (0.0.0) vs `manifest.json` (1.0.0)
4. **Leftover Boilerplate**: `main.ts`, `counter.ts`, `style.css` unused
5. **Security File Committed**: `dist.pem` (signing key) in git (security risk)

### **Limitations**
1. **Single Language Pair**: Only EN↔ES (not extensible to other languages)
2. **No Error Handling UI**: API errors show generic "Error al traducir" message
3. **No Rate Limiting Info**: MyMemory API limits not documented
4. **No Offline Support**: Requires internet for API calls
5. **Translation Quality**: Varies for complex/idiomatic phrases

### **Browser Compatibility**
- **Supported**: Chrome, Edge, Brave (Chromium-based)
- **Not Supported**: Firefox, Safari (different extension APIs)

---

## 🤝 Contributing

Contributions welcome! Areas for improvement:

### **Priority Improvements**
1. **Fix Documentation Gaps**
   - Update privacy policy with correct API
   - Add actual screenshots
   - Fix package naming

2. **Code Cleanup**
   - Remove unused boilerplate files
   - Align version numbers
   - Remove `.pem` file from git

3. **Feature Enhancements**
   - Add more language pairs
   - Improve error handling UI
   - Add rate limit indicators
   - Implement caching for repeated translations

4. **Testing**
   - Add unit tests
   - Add E2E tests with Playwright
   - Test across different websites

### **How to Contribute**
1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes
4. Test thoroughly
5. Commit (`git commit -m 'Add amazing feature'`)
6. Push (`git push origin feature/amazing-feature`)
7. Open Pull Request

---

## 📄 License

Not specified in repository. Consider adding MIT or similar open-source license.

---

## 🔮 Roadmap

### **v1.1 (Next Release)**
- [ ] Fix privacy policy API reference
- [ ] Add actual screenshots to README
- [ ] Fix package.json naming inconsistencies
- [ ] Remove security files from git
- [ ] Add error handling UI improvements

### **v1.2**
- [ ] Add French, German, Italian support
- [ ] Implement translation caching
- [ ] Add keyboard customization
- [ ] Improve translation quality indicators

### **v2.0**
- [ ] Support multiple translation providers
- [ ] Add offline dictionary mode
- [ ] Implement ML-powered context detection
- [ ] Browser-specific builds (Firefox, Safari)

---

## 📞 Support

- **Email**: byrne.saar@gmail.com
- **Privacy Policy**: See [privacypolicy.md](./privacypolicy.md)

---

## 🙏 Credits

**Built by**: [saarbyrne](https://github.com/saarbyrne)

**Technologies**:
- [Preact](https://preactjs.com/) - Lightweight React alternative
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [MyMemory API](https://mymemory.translated.net/) - Free translation service
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

---

**Last Updated**: January 2025
**Version**: 1.0.0 (not yet published to Chrome Web Store)

---

**Built with ❤️ for bilingual readers who want fast, inline translation**

[Privacy Policy](./privacypolicy.md)
