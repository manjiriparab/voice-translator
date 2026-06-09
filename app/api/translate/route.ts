import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await request.json()

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: 'Missing required fields: text, sourceLang, targetLang' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Translate API key not configured in .env.local' },
        { status: 500 }
      )
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.error?.message || 'Translation failed' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const translatedText = data.data.translations[0].translatedText

    return NextResponse.json({ translatedText })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
