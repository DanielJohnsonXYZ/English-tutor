import type { Metadata } from 'next'
import './globals.css'
import ErrorBoundary from '@/components/ErrorBoundary'

export const metadata: Metadata = {
  title: 'English Tutor for Chinese Students | 中国学生英语导师',
  description: 'AI-powered English tutor designed specifically for Chinese students. Practice conversation, grammar, vocabulary, and pronunciation. 专为中国学生设计的AI英语导师。',
  keywords: ['English learning', 'Chinese students', 'English tutor', '英语学习', 'AI tutor', 'IELTS', 'TOEFL'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
