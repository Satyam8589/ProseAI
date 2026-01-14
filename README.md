# ProseAI ✍️✨

ProseAI is a production-ready, privacy-first AI writing assistant browser extension. It helps you rewrite your messages in various tones (Professional, Friendly, Casual, etc.) directly within your favorite web applications like WhatsApp, Telegram, and LinkedIn.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Satyam8589/ProseAI)

---

## 🚀 Key Features

- **Instant Rewriting**: Transform your messages with a single click without leaving the chat box.
- **6 Tone Presets**:
  - 💼 **Professional**: Formal and business-appropriate.
  - 😊 **Friendly**: Warm and approachable.
  - 😎 **Casual**: Relaxed and informal.
  - 😂 **Comedy**: Funny and witty.
  - 🙏 **Polite**: Courteous and respectful.
  - 💪 **Confident**: Assertive and authoritative.
- **Platform Support**: Optimized for WhatsApp Web, Telegram Web, and LinkedIn.
- **Multi-Provider AI**: Integrated with Google Gemini (Primary), OpenAI GPT, and Anthropic Claude.
- **Privacy First**: No messages are stored or logged. Everything is processed on-demand.
- **Cross-Browser**: Compatible with both Chrome and Firefox.

---

## 🛠️ Tech Stack

### Extension (Client side)
- **Manifest V3**: Latest extension standard.
- **Vanilla JavaScript**: High performance with zero runtime dependencies.
- **Custom CSS**: Premium, non-intrusive floating UI panels.
- **Chrome Storage API**: Securely saves user preferences.

### Backend (AI Service)
- **Next.js 15**: Robust API routes and landing page.
- **AI Integration**: Custom library supporting fallback providers.
- **Tailwind CSS**: Modern landing page design.

---

## 📦 Installation & Setup

### 1. Backend Setup (Next.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/Satyam8589/ProseAI.git
   cd ProseAI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   # API Keys (at least one is required)
   GEMINI_API_KEY=your_gemini_key
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key

   # API Configuration
   AI_PROVIDER_PRIORITY=gemini,openai,claude
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### 2. Extension Installation

#### Google Chrome / Edge / Brave
1. Open `chrome://extensions/`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the `extension` folder from this repository.

#### Firefox
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select the `manifest-firefox.json` file from the `extension` folder.

---

## 📖 Usage

1. **Onboarding**: On the first install, the onboarding page will open. Select the applications you want ProseAI to work with.
2. **Auto-Activation**: Navigate to WhatsApp, Telegram, or LinkedIn. A floating button will appear near the message input field.
3. **Rewrite**:
   - Type your message in the chat box.
   - Click the ProseAI button or select a tone from the floating panel.
   - Watch your message transform instantly!

---

## 📂 Project Structure

```bash
ProseAI/
├── extension/          # Browser extension source code
│   ├── background/     # Service worker
│   ├── content/        # UI injection and DOM manipulation
│   ├── popup/          # Extension settings popup
│   ├── onboarding/     # First-time user setup
│   └── utils/          # API client and storage helpers
├── src/                # Next.js source code (Backend API)
│   ├── app/            # Landing page and API routes
│   └── lib/            # AI service logic and provider integration
├── test-ai.js          # AI service test suite
└── .env.local          # Private API keys
```

---

## 🧪 Testing

You can test the AI service and tone generation locally:

```bash
node test-ai.js
```

This will verify:
- Tone availability
- English detection logic
- AI provider connectivity (Gemini/OpenAI/Claude)

---

## 🔒 Privacy & Security

We take your privacy seriously:
- **No data retention**: Messages are sent to the AI strictly for processing and are never stored.
- **No logging**: We do not log your message content or metadata.
- **Encrypted communication**: All API calls are made via HTTPS.
- **On-Demand Processing**: The extension only processes text when you explicitly click a tone button.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ✨ Developed By

**Satyam Kumar Singh**
- GitHub: [@Satyam8589](https://github.com/Satyam8589)
- Portfolio: [satyam8589.dev](https://satyam8589.dev)

---

*Made with ❤️ for better communication.*
