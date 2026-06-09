'use client'

import { useCallback } from 'react'

export function useSpeechSynthesis() {
  const speak = useCallback((text: string, language: string) => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    // Try to find a matching voice for the language
    const voices = window.speechSynthesis.getVoices()
    const matchingVoice = voices.find((v) => v.lang.startsWith(language.split('-')[0]))
    if (matchingVoice) utterance.voice = matchingVoice

    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
  }, [])

  return { speak, stop }
}
