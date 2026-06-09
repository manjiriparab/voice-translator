import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Voice Translator — English ↔ Arabic',
  description: 'Real-time voice translation between English and Arabic',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <style>{`
          * {
            -webkit-touch-callout: none;
            -webkit-tap-highlight-color: transparent;
          }
          button {
            touch-action: manipulation;
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}
