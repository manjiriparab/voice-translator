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
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
