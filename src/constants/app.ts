// Application-wide constants for Chinese→English learning

// API Configuration
export const API_CONFIG = {
  MAX_TOKENS: 1200,
  MODEL: 'claude-sonnet-4-20250514',
  MAX_HISTORY_MESSAGES: 25,
  RETRY_ATTEMPTS: 3,
  RETRY_INITIAL_DELAY: 1000,
  RETRYABLE_STATUS_CODES: [408, 429, 500, 502, 503, 504]
} as const

// Rate Limiting
export const RATE_LIMIT = {
  WINDOW_MS: 60000, // 1 minute
  MAX_REQUESTS: 30
} as const

// Input Validation
export const INPUT_CONSTRAINTS = {
  MAX_MESSAGE_LENGTH: 1000,
  MIN_MESSAGE_LENGTH: 1
} as const

// Storage Configuration
export const STORAGE_CONFIG = {
  MAX_MESSAGES_STORED: 150,
  QUOTA_MB: 10,
  DEBOUNCE_DELAY: 800
} as const

// English Level Assessment (CEFR-based)
export const LEVEL_ASSESSMENT = {
  MIN_INTERACTIONS: 5,
  SUCCESS_RATE_C2: 0.9,      // Proficiency
  SUCCESS_RATE_C1: 0.8,      // Advanced
  SUCCESS_RATE_B2: 0.7,      // Upper Intermediate
  SUCCESS_RATE_B1: 0.6,      // Intermediate
  SUCCESS_RATE_A2: 0.45,     // Elementary
  SUCCESS_RATE_A1: 0.3,      // Beginner
  COMPLEXITY_C2: 9,
  COMPLEXITY_C1: 7,
  COMPLEXITY_B2: 6,
  COMPLEXITY_B1: 4,
  COMPLEXITY_A2: 3,
  COMPLEXITY_A1: 2
} as const

// Speech Recognition (English with Chinese fallback)
export const SPEECH_CONFIG = {
  LANG: 'en-US',
  RATE: 0.9,
  CONTINUOUS: false,
  INTERIM_RESULTS: false,
  VOICE_SEARCH_PRIORITIES: ['en-US', 'en-GB', 'en-AU', 'en']
} as const

// UI Timeouts
export const UI_TIMEOUTS = {
  LEVEL_ASSESSMENT_DELAY: 2500,
  TYPING_INDICATOR_MIN: 400,
  SUCCESS_MESSAGE_DURATION: 3000
} as const

// LocalStorage Keys
export const STORAGE_KEYS = {
  MESSAGES: 'english-tutor-messages',
  VOCABULARY: 'english-tutor-vocabulary',
  LEVEL: 'english-tutor-level',
  STREAK: 'english-tutor-streak',
  LAST_PRACTICE: 'english-tutor-last-practice',
  TOPICS: 'english-tutor-topics',
  WEAK_AREAS: 'english-tutor-weak-areas',
  MASTERED_PATTERNS: 'english-tutor-mastered'
} as const

// Vocabulary Tracking
export const VOCAB_THRESHOLDS = {
  MASTERED: 50,
  GROWING: 25,
  LIMITED: 10
} as const

// Error Detection (Common Chinese→English errors)
export const ERROR_CATEGORIES = {
  ARTICLES: 'articles',           // a/an/the usage
  PLURAL: 'plural',              // Singular/plural confusion
  TENSE: 'tense',                // Verb tense errors
  WORD_ORDER: 'word_order',      // SVO violations
  PREPOSITIONS: 'prepositions',  // in/on/at confusion
  COUNTABLE: 'countable',        // Countable/uncountable nouns
  MODAL_VERBS: 'modal_verbs',    // Can/could/should/would
  PRONUNCIATION: 'pronunciation', // TH, R, L sounds
  IDIOMS: 'idioms'               // Direct translations
} as const

// Success Rate Thresholds
export const SUCCESS_THRESHOLDS = {
  EXCELLENT: 0.85,
  GOOD: 0.7,
  FAIR: 0.5,
  NEEDS_PRACTICE: 0.35
} as const

// Complexity Scoring (English-specific)
export const COMPLEXITY_SCORING = {
  MAX_SCORE: 10,
  WORDS_PER_POINT: 7,
  MAX_WORD_POINTS: 4,
  CLAUSE_COUNT_BONUS: 1,
  COMPLEX_STRUCTURE_BONUS: 2,
  PHRASAL_VERB_BONUS: 1,
  IDIOM_BONUS: 1
} as const

// Common English learning goals for Chinese students
export const LEARNING_GOALS = {
  IELTS: 'IELTS preparation',
  TOEFL: 'TOEFL preparation',
  BUSINESS: 'Business English',
  DAILY: 'Daily conversation',
  ACADEMIC: 'Academic English',
  TRAVEL: 'Travel English'
} as const

// Practice modes
export const PRACTICE_MODES = {
  FREE_TALK: 'free_talk',
  SCENARIO: 'scenario',
  GRAMMAR_FOCUS: 'grammar_focus',
  PRONUNCIATION: 'pronunciation',
  VOCABULARY_BUILDING: 'vocabulary'
} as const
