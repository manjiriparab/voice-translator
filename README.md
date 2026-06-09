# Voice Translator — English ↔ Arabic

A real-time voice translation web app built with Next.js.
Speak in English → get Arabic. Speak in Arabic → get English.
Both text display and voice output included.

## Tech Stack

- **Next.js 14** — fullstack framework (frontend + API routes in one repo)
- **Web Speech API** — speech-to-text (built into browser, free)
- **Google Cloud Translation API** — translation engine
- **SpeechSynthesis API** — text-to-speech (built into browser, free)

---

## Project Structure

```
voice-translator/
├── app/
│   ├── layout.tsx                  ← Root HTML layout
│   ├── page.tsx                    ← Main translator UI
│   └── api/
│       └── translate/
│           └── route.ts            ← Backend: calls Google Translate API
├── components/
│   ├── MicButton.tsx               ← Hold-to-speak mic button
│   └── TranslationCard.tsx         ← Displays original + translated text
├── lib/
│   ├── useSpeechRecognition.ts     ← Hook: captures voice input
│   └── useSpeechSynthesis.ts       ← Hook: speaks translated text aloud
├── .env.local                      ← Your API key (never commit this)
├── .gitignore                      ← Excludes .env.local from git
└── package.json
```

---

## Local Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add your Google Translate API key
Open `.env.local` and add your key:
```
GOOGLE_TRANSLATE_API_KEY=your_actual_key_here
```

### 3. Run the app
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Google Translate API — Pricing

| Characters | Cost |
|---|---|
| First 500,000/month | Free forever |
| Beyond 500,000 | $20 per 1 million chars |

---

## How to Use

1. **English speaker** — Hold the blue mic button → speak in English → release
2. App shows Arabic translation on screen and speaks it aloud
3. **Arabic speaker** — Hold the green mic button → speak in Arabic → release
4. App shows English translation on screen and speaks it aloud

---

## Add to mobile home screen
- **iPhone (Safari)** — Share → Add to Home Screen
- **Android (Chrome)** — Menu → Add to Home Screen

---

## Browser Support

| Browser | Speech Recognition | Speech Synthesis |
|---|---|---|
| Chrome (desktop) | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Safari (iOS 14.5+) | ✅ | ✅ |
| Firefox | ❌ | ✅ |

> Recommended: Use **Google Chrome** for the best experience.