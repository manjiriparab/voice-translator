'use client'

import { useState, useCallback } from 'react'
import { useSpeechRecognition } from '@/lib/useSpeechRecognition'
import { useSpeechSynthesis } from '@/lib/useSpeechSynthesis'
import { MicButton } from '@/components/MicButton'
import { TranslationCard } from '@/components/TranslationCard'

interface TranslationState {
  original: string
  translated: string
  isTranslating: boolean
  pronounciation: string
}

async function translateText(text: string, from: string, to: string): Promise<{ translatedText: string, pronounciation: string }> {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, sourceLang: from, targetLang: to }),
  })
  if (!res.ok) throw new Error('Translation failed')
  const data = await res.json()
  return data
}

export default function TranslatorPage() {
  const { speak } = useSpeechSynthesis()

  const [englishState, setEnglishState] = useState<TranslationState>({
    original: '',
    translated: '',
    pronounciation: '',
    isTranslating: false,
  })
  const [arabicState, setArabicState] = useState<TranslationState>({
    original: '',
    translated: '',
    pronounciation: '',
    isTranslating: false,
  })

  const [showFooter, setShowFooter] = useState(false)

  const handleEnglishResult = useCallback(async (transcript: string) => {
    setEnglishState((prev) => ({ ...prev, original: transcript, isTranslating: true }))
    setArabicState({ original: '', translated: '', isTranslating: false, pronounciation: '', })
    try {
      const translated_response = await translateText(transcript, 'en', 'ar')
      const translated = translated_response.translatedText
      const pronounciation = translated_response.pronounciation
      setEnglishState((prev) => ({ ...prev, translated, pronounciation, isTranslating: false }))
      speak(translated, 'ar-SA')
    } catch {
      setEnglishState((prev) => ({ ...prev, translated: 'Translation error', isTranslating: false }))
    }
  }, [speak])

  const handleArabicResult = useCallback(async (transcript: string) => {
    setArabicState((prev) => ({ ...prev, original: transcript, isTranslating: true }))
    setEnglishState({ original: '', translated: '', isTranslating: false, pronounciation: '', })
    try {

      const translated_response = await translateText(transcript, 'ar', 'en')
      const translated = translated_response.translatedText
      const pronounciation = translated_response.pronounciation

      setArabicState((prev) => ({ ...prev, translated, pronounciation, isTranslating: false }))
      speak(translated, 'en-US')
    } catch {
      setArabicState((prev) => ({ ...prev, translated: 'Translation error', isTranslating: false }))
    }
  }, [speak])

  const englishSpeech = useSpeechRecognition({
    language: 'en-US',
    onResult: handleEnglishResult,
  })

  const arabicSpeech = useSpeechRecognition({
    language: 'ar-SA',
    onResult: handleArabicResult,
  })

  const isAnyListening = englishSpeech.isListening || arabicSpeech.isListening
  const isTranslating = englishState.isTranslating || arabicState.isTranslating

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f7ff 0%, #f5fff9 100%)',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: '40px 20px',
    }}>
      <style>{`
        @keyframes pulse1 {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            margin: '0 0 8px',
            fontSize: '36px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1a6fd4, #1a9e5e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Voice Translator
          </h1>
          <p style={{ margin: 0, fontSize: '16px', color: '#888' }}>
            English ↔ Arabic — Hold the mic and speak
          </p>
        </div>

        {/* Translation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <TranslationCard
            language="English"
            flag="🇺🇸"
            originalText={englishState.original}
            translatedText={englishState.translated}
            pronounciation={englishState.pronounciation}
            isTranslating={englishState.isTranslating}
            direction="ltr"
          />
          <TranslationCard
            language="Arabic"
            flag="🇸🇦"
            originalText={arabicState.original}
            translatedText={arabicState.translated}
            pronounciation={arabicState.pronounciation}
            isTranslating={arabicState.isTranslating}
            direction="rtl"
          />
        </div>

        {/* Mic Buttons */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '36px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '24px',
        }}>
          <MicButton
            isListening={englishSpeech.isListening}
            isDisabled={arabicSpeech.isListening || isTranslating}
            onStart={englishSpeech.startListening}
            onStop={englishSpeech.stopListening}
            label="Speak English"
            color="blue"
          />

          <div style={{
            width: '1px',
            height: '80px',
            background: '#f0f0f0',
          }} />

          <MicButton
            isListening={arabicSpeech.isListening}
            isDisabled={englishSpeech.isListening || isTranslating}
            onStart={arabicSpeech.startListening}
            onStop={arabicSpeech.stopListening}
            label="تحدث بالعربية"
            color="green"
          />
        </div>

        {/* Status */}
        {!englishSpeech.isSupported && (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#e74c3c', fontSize: '14px' }}>
            ⚠️ Speech recognition is not supported in this browser. Please use Chrome or Edge.
          </p>
        )}

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: '#bbb' }}>
          {/* Footer */}
          {showFooter && <footer style={{ textAlign: 'center', marginTop: '48px', paddingBottom: '32px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#aaa' }}>
              Made with <span style={{ color: '#e74c3c' }}>♥</span> by{' '}
              <span style={{
                fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                fontSize: '22px',
                color: '#444',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}>
                Manjiri Parab
              </span>
            </p>
          </footer>}

          {!showFooter && <div
            onClick={() => setShowFooter(!showFooter)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <span style={{ fontSize: '28px' }}>🌸</span>
          </div>}

        </div>
      </div>
    </main>
  )
}
