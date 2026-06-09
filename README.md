# Voice Translator — English ↔ Arabic

A real-time voice translation web app built with Next.js.
Speak in English → get Arabic. Speak in Arabic → get English.
Both text display and voice output included.

## Tech Stack

- **Next.js 14** — fullstack framework (frontend + API routes in one repo)
- **Web Speech API** — speech-to-text (built into browser, free)
- **MyMemory API** — translation engine (free, no API key needed)
- **SpeechSynthesis API** — text-to-speech (built into browser, free)

## Project Structure

```
voice-translator/
├── app/
│   ├── layout.tsx              ← Root HTML layout
│   ├── page.tsx                ← Main translator UI
│   └── api/
│       └── translate/
│           └── route.ts        ← Backend: calls MyMemory API (free)
├── components/
│   ├── MicButton.tsx           ← Hold-to-speak mic button
│   └── TranslationCard.tsx     ← Displays original + translated text
├── lib/
│   ├── useSpeechRecognition.ts ← Hook: captures voice input
│   └── useSpeechSynthesis.ts   ← Hook: speaks translated text aloud
└── package.json
```

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Run the app — that's it, no API key needed!
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How to Use

1. **English speaker**: Hold the blue mic button → speak in English → release
2. App shows the Arabic translation and speaks it aloud
3. **Arabic speaker**: Hold the green mic button → speak in Arabic → release
4. App shows the English translation and speaks it aloud

## MyMemory API — Free Limits

| Plan | Characters/day | Cost |
|---|---|---|
| Free (no key) | 5,000 | $0 |
| Free (with email) | 10,000 | $0 |
| Paid | Unlimited | Paid |

For a learning project, 5,000 chars/day is more than enough.
To get 10,000/day, just add `&de=your@email.com` to the API URL in `route.ts`.

## Browser Support

| Browser | Speech Recognition | Speech Synthesis |
|---|---|---|
| Chrome (desktop) | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Safari (iOS 14.5+) | ✅ | ✅ |
| Firefox | ❌ | ✅ |

> **Recommended**: Use Google Chrome for best experience.