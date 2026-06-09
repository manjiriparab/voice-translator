'use client'

interface TranslationCardProps {
  language: string
  flag: string
  originalText: string
  translatedText: string
  isTranslating: boolean
  direction: 'ltr' | 'rtl'
  pronounciation?: string
}

export function TranslationCard({
  language,
  flag,
  originalText,
  translatedText,
  isTranslating,
  direction,
  pronounciation,
}: TranslationCardProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      border: '1px solid #f0f0f0',
      minHeight: '180px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>{flag}</span>
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>{language}</span>
        {isTranslating && (
          <span style={{
            marginLeft: 'auto',
            fontSize: '12px',
            color: '#999',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
            Translating...
          </span>
        )}
      </div>

      {originalText && (
        <div>
          <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 500, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Original
          </p>
          <p style={{
            margin: 0,
            fontSize: '16px',
            color: '#555',
            lineHeight: 1.6,
            direction,
            textAlign: direction === 'rtl' ? 'right' : 'left',
          }}>
            {originalText}
          </p>
          {language === 'Arabic' && pronounciation && (
            <p style={{
              margin: '6px 0 0',
              fontSize: '13px',
              color: '#888',
              fontStyle: 'italic',
              direction,
              textAlign: 'right',
            }}>
              {pronounciation}
            </p>
          )}
        </div>
      )}

      {translatedText && (
        <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '14px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '11px', fontWeight: 500, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Translation
          </p>
          <p style={{
            margin: 0,
            fontSize: '18px',
            color: '#1a1a1a',
            fontWeight: 500,
            lineHeight: 1.6,
            direction,
            textAlign: direction === 'rtl' ? 'right' : 'left',
          }}>
            {translatedText}
          </p>

          {(language === 'English' && pronounciation) && (
            <p style={{
              margin: '6px 0 0',
              fontSize: '13px',
              color: '#888',
              fontStyle: 'italic',
              direction: 'ltr',
              textAlign: 'left',
            }}>
              🔤 {pronounciation}
            </p>
          )}
        </div>
      )}

      {!originalText && !translatedText && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#ccc' }}>
            Press and hold the mic to speak...
          </p>
        </div>
      )}
    </div>
  )
}
