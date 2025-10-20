// Type definitions for Chinese-English Tutor

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  messageType?: 'normal' | 'correction' | 'encouragement' | 'cultural' | 'grammar' | 'pronunciation'
  suggestions?: string[]
  chineseExplanation?: string  // Optional Chinese explanation
  errorHighlights?: ErrorHighlight[]
}

export interface ErrorHighlight {
  text: string
  category: string
  correction: string
  explanation: string
  chineseExplanation: string
}

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface UserLevel {
  level: CEFRLevel
  confidence: number
  strengths: string[]
  weaknesses: string[]
  lastAssessed: Date
  grammarScore: number
  vocabularyScore: number
  fluencyScore: number
  pronunciationScore: number
}

export interface VocabularyItem {
  word: string
  definition: string
  chineseTranslation: string
  examples: string[]
  firstSeen: Date
  timesEncountered: number
  masteryLevel: 'learning' | 'familiar' | 'mastered'
  partOfSpeech: string
}

export interface LearningGoal {
  id: string
  type: string
  targetDate?: Date
  progress: number
  milestones: string[]
}

export interface PracticeSession {
  id: string
  startTime: Date
  endTime?: Date
  messagesCount: number
  errorsCount: number
  topicsDiscussed: string[]
  mode: string
}

export interface GrammarPattern {
  pattern: string
  name: string
  chineseExplanation: string
  examples: string[]
  commonErrors: string[]
  difficulty: number
}

export interface ScenarioPrompt {
  id: string
  title: string
  titleChinese: string
  description: string
  descriptionChinese: string
  difficulty: CEFRLevel
  tags: string[]
  systemPrompt: string
  initialMessage: string
}

export interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string
      }
    }
  }
}

export interface SpeechRecognitionErrorEvent {
  error: string
}

export interface SpeechRecognitionInterface {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onend: () => void
  start: () => void
  stop: () => void
}

declare global {
  interface Window {
    SpeechRecognition?: new() => SpeechRecognitionInterface
    webkitSpeechRecognition?: new() => SpeechRecognitionInterface
  }
}
