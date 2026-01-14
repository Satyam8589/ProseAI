# ProseAI - Project Structure

## AI-Powered Writing Assistant Browser Extension

This document outlines the complete folder structure for the ProseAI browser extension project.

---

## 📂 Complete Folder Structure

```
ProseAI/
├── .env.local                          # Environment variables (API keys)
├── .gitignore
├── package.json
├── jsconfig.json                       # JavaScript configuration
├── next.config.js
├── README.md
│
├── src/                                # Source directory
│   ├── app/                            # Next.js App Router
│   │   ├── layout.jsx                  # Root layout
│   │   ├── page.jsx                    # Landing page
│   │   ├── globals.css                 # Global styles
│   │   │
│   │   └── api/                        # Next.js API Routes
│   │       └── rewrite/
│   │           └── route.js            # AI rewrite endpoint
│   │
│   ├── components/                     # React components (for Next.js app)
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   └── Footer.jsx
│   │
│   └── lib/                            # Utility functions
│       ├── ai.js                       # AI prompt logic & API calls
│       └── types.js                    # Type definitions & constants
│
├── extension/                          # Chrome Extension (Manifest V3)
│   ├── manifest.json                   # Extension manifest
│   │
│   ├── background/                     # Service Worker
│   │   └── service-worker.js
│   │
│   ├── content/                        # Content Scripts
│   │   ├── content.js                  # Main content script
│   │   ├── content.css                 # Injected styles
│   │   ├── ui-injector.js              # Floating panel injector
│   │   └── selectors.js                # DOM selectors for WhatsApp/Telegram/LinkedIn
│   │
│   ├── popup/                          # Extension Popup
│   │   ├── popup.html
│   │   ├── popup.js
│   │   └── popup.css
│   │
│   ├── onboarding/                     # First-time user onboarding
│   │   ├── onboarding.html
│   │   ├── onboarding.js
│   │   └── onboarding.css
│   │
│   ├── utils/                          # Extension utilities
│   │   ├── storage.js                  # chrome.storage helpers
│   │   ├── api-client.js               # API communication
│   │   └── language-detector.js        # English text detection
│   │
│   ├── assets/                         # Extension assets
│   │   └── icons/
│   │       ├── icon16.png
│   │       ├── icon48.png
│   │       └── icon128.png
│   │
│   └── types/                          # Type definitions (JSDoc)
│       └── chrome-types.js
│
└── public/                             # Static assets
    ├── logo.svg
    └── demo.gif
```

---

## 📁 Directory Explanations

### **Root Level**
- **`.env.local`** - Environment variables for API keys (Gemini/OpenAI/Claude)
- **`package.json`** - Project dependencies and scripts
- **`jsconfig.json`** - JavaScript configuration (path aliases, module resolution)
- **`next.config.js`** - Next.js configuration
- **`README.md`** - Project documentation

### **`/src`** - Source Directory
Main source code directory following Next.js best practices.

### **`/src/app`** - Next.js Application (App Router)
Main Next.js application for the landing page and backend API.

- **`layout.jsx`** - Root layout component
- **`page.jsx`** - Landing page component
- **`globals.css`** - Global CSS styles
- **`/api/rewrite/route.js`** - Next.js API route that handles AI rewriting requests from the extension

### **`/src/components`** - React Components
React components for the Next.js landing page.

- **`Hero.jsx`** - Hero section component
- **`Features.jsx`** - Features showcase component
- **`Footer.jsx`** - Footer component

### **`/src/lib`** - Shared Logic & Utilities
Reusable functions and configurations.

- **`ai.js`** - AI prompt engineering logic and API integration (Gemini/OpenAI/Claude)
- **`types.js`** - Type definitions, constants, and JSDoc type annotations

### **`/extension`** - Chrome Extension (Manifest V3)
Complete Chrome extension implementation.

#### **`manifest.json`**
Extension configuration file (Manifest V3 format).

#### **`/background`** - Service Worker
- **`service-worker.js`** - Background script for extension lifecycle management

#### **`/content`** - Content Scripts
Scripts injected into web pages (WhatsApp Web, Telegram Web, LinkedIn Web).

- **`content.js`** - Main content script that detects message input fields
- **`content.css`** - Styles for the injected floating panel
- **`ui-injector.js`** - Logic to inject and manage the floating tone selector panel
- **`selectors.js`** - DOM selectors for different platforms (WhatsApp, Telegram, LinkedIn)

#### **`/popup`** - Extension Popup
UI shown when clicking the extension icon.

- **`popup.html`** - Popup HTML structure
- **`popup.js`** - Popup logic and event handlers
- **`popup.css`** - Popup styles

#### **`/onboarding`** - First-Time User Onboarding
Onboarding flow shown on first install.

- **`onboarding.html`** - Onboarding page structure
- **`onboarding.js`** - Onboarding logic (app selection, storage)
- **`onboarding.css`** - Onboarding styles

#### **`/utils`** - Extension Utilities
Helper functions for the extension.

- **`storage.js`** - Chrome storage API helpers (save/load user preferences)
- **`api-client.js`** - API communication with Next.js backend
- **`language-detector.js`** - Detect if text is English

#### **`/assets`** - Extension Assets
Static assets for the extension.

- **`/icons/`** - Extension icons in different sizes (16x16, 48x48, 128x128)

#### **`/types`** - Type Definitions
- **`chrome-types.js`** - JSDoc type definitions for Chrome APIs and shared types

### **`/public`** - Static Assets
Public assets served by Next.js.

- **`logo.svg`** - ProseAI logo
- **`demo.gif`** - Demo animation/screenshot

---

## 🔧 Generated Directories (Build Outputs)

These directories are auto-generated and should be in `.gitignore`:

```
.next/                  # Next.js build output
dist/                   # Extension build output (if using bundler like webpack)
node_modules/           # NPM dependencies
```

---

## 🎯 Key Features by Directory

### Content Scripts (`/extension/content`)
- Auto-detect message input fields
- Inject floating tone selector UI
- Replace text in input field after rewriting

### API Route (`/src/app/api/rewrite`)
- Receive text and tone from extension
- Call AI API (Gemini/OpenAI/Claude)
- Return rewritten text

### Onboarding (`/extension/onboarding`)
- First-time setup screen
- App selection (WhatsApp, Telegram, LinkedIn)
- Save preferences to chrome.storage

### Storage Utils (`/extension/utils/storage.ts`)
- Save/load user preferences
- Track selected apps
- Manage extension state

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, JavaScript
- **Backend**: Next.js API Routes
- **Extension**: Chrome Manifest V3, JavaScript
- **AI**: Gemini / OpenAI / Claude API
- **Storage**: chrome.storage API
- **Styling**: CSS (Minimal, non-intrusive)
- **Type Safety**: JSDoc annotations for IntelliSense

---

## 📝 Notes

- All JavaScript files use `.js` extension (`.jsx` for React components)
- JSDoc comments used for type hints and IntelliSense support
- Extension follows Manifest V3 specifications
- API keys stored securely in `.env.local`
- No user data is stored or logged
- Extension only processes text on explicit user action

---

**Project Status**: Ready for development
**Last Updated**: January 14, 2026
