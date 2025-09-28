# 🌟 Slug Translate

A powerful Chrome extension that translates selected text inline between English and Spanish with a single click or keyboard shortcut.

![Slug Translate Demo](https://via.placeholder.com/600x400/4A90E2/FFFFFF?text=Slug+Translate+Demo)

## ✨ Features

- **🔍 Instant Translation**: Select any text on any website and get instant translation
- **🇺🇸🇪🇸 Bilingual Support**: Seamless translation between English and Spanish
- **⌨️ Keyboard Shortcut**: Use `Alt+A` for quick translation
- **🖱️ Floating Button**: Click the "T" button that appears when text is selected
- **🎨 Clean Interface**: Beautiful, non-intrusive popup overlay
- **🔒 Privacy First**: No data collection, uses public translation APIs
- **⚡ Fast & Lightweight**: Minimal performance impact

## 🚀 Installation

### From Chrome Web Store
*Coming soon - extension is ready for Chrome Web Store submission!*

### Manual Installation (Developer Mode)

1. **Clone or download** this repository
2. **Build the extension**:
   ```bash
   npm install
   npm run build
   ```
3. **Load in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project
4. **Start translating!** 🎉

## 📖 Usage

1. **Select Text**: Highlight any text on any webpage
2. **Two Ways to Translate**:
   - Click the floating "T" button that appears
   - Press `Alt+A` keyboard shortcut
3. **View Translation**: Translation appears in a clean overlay popup
4. **Language Toggle**: Switch between EN→ES and ES→EN in the popup
5. **Insert Translation**: Click "Insert Translation" to replace the original text

### Example Usage
- Select "Hello, world!" → Click "T" or press Alt+A → See "¡Hola, mundo!" in overlay
- Click language toggle → See "Hello, world!" (reverse translation)
- Click "Insert Translation" → Original text is replaced

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd slugtranslate

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
slugtranslate/
├── src/
│   ├── background.ts          # Background service worker
│   ├── content-script.tsx     # Main content script with UI
│   ├── overlay/
│   │   ├── Overlay.tsx        # Translation overlay component
│   │   └── styles.css         # Overlay styling
│   └── main.ts               # Entry point
├── public/
│   └── icon.png              # Extension icon
├── dist/                     # Built extension files
├── manifest.json             # Extension configuration
└── package.json              # Dependencies and scripts
```

### Technologies Used
- **⚡ Vite** - Fast build tool and dev server
- **⚛️ Preact** - Lightweight React alternative
- **📝 TypeScript** - Type-safe JavaScript
- **🎨 CSS3** - Custom styling with modern features
- **🔧 Chrome Extension Manifest V3** - Latest extension standard

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **🐛 Bug Reports**: Use GitHub Issues for bug reports
2. **💡 Feature Requests**: Suggest new features via Issues
3. **🔧 Code Contributions**:
   - Fork the repository
   - Create a feature branch
   - Make your changes
   - Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write clean, readable code with comments
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MyMemory Translation API** - Free translation service
- **Preact Team** - Amazing lightweight React alternative
- **Vite Team** - Incredibly fast build tool

## 📞 Support

If you encounter any issues or have questions:

- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/slugtranslate/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/slugtranslate/discussions)

---

**⭐ If you find this extension helpful, please give it a star!**