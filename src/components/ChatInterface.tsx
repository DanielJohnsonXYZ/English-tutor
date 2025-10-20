'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import MessageBubble from './MessageBubble'
import { Message, UserLevel, CEFRLevel, SpeechRecognitionInterface, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '@/types'
import { setItemSafe, getItemSafe, setItemDebounced, truncateMessages, clearAppStorage } from '@/utils/localStorage'
import { postJsonWithRetry } from '@/utils/apiRetry'
import { validateAndSanitizeMessage } from '@/utils/sanitize'
import {
  INPUT_CONSTRAINTS,
  STORAGE_KEYS,
  LEVEL_ASSESSMENT,
  SPEECH_CONFIG,
  PRACTICE_MODES
} from '@/constants/app'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [dailyStreak, setDailyStreak] = useState(0)
  const [lastPracticeDate, setLastPracticeDate] = useState<string | null>(null)
  const [practiceMode, setPracticeMode] = useState<string>(PRACTICE_MODES.FREE_TALK)
  const [showSettings, setShowSettings] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInterface | null>(null)
  const messagesRef = useRef<Message[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Load saved data on mount
  useEffect(() => {
    const savedMessages = getItemSafe<Message[]>(STORAGE_KEYS.MESSAGES, [])
    const savedLevel = getItemSafe<UserLevel | null>(STORAGE_KEYS.LEVEL, null)
    const savedStreak = getItemSafe<number>(STORAGE_KEYS.STREAK, 0)
    const savedLastPractice = getItemSafe<string | null>(STORAGE_KEYS.LAST_PRACTICE, null)

    if (savedMessages.length > 0) {
      setMessages(savedMessages)
      messagesRef.current = savedMessages
    } else {
      // Welcome message for first-time users
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `Hello! 你好！I'm your English tutor. 我是你的英语老师。

I'm here to help you improve your English! We can:
- Practice daily conversation 日常对话练习
- Work on grammar 语法练习
- Improve pronunciation 发音改进
- Learn new vocabulary 学习新词汇

Just start talking in English, and I'll help you along the way! Don't worry about making mistakes - that's how we learn! 不用担心犯错，这是学习的方式！

Try saying: "Hi, I want to practice English!" or start with any topic you like. 😊`,
        isUser: false,
        timestamp: new Date(),
        messageType: 'normal'
      }
      setMessages([welcomeMessage])
      messagesRef.current = [welcomeMessage]
    }

    if (savedLevel) setUserLevel(savedLevel)
    setDailyStreak(savedStreak)
    setLastPracticeDate(savedLastPractice)
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setSpeechSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = SPEECH_CONFIG.CONTINUOUS
        recognitionRef.current.interimResults = SPEECH_CONFIG.INTERIM_RESULTS
        recognitionRef.current.lang = SPEECH_CONFIG.LANG

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Save messages to localStorage (debounced)
  useEffect(() => {
    if (messages.length > 0) {
      const truncated = truncateMessages(messages)
      setItemDebounced(STORAGE_KEYS.MESSAGES, truncated)
      messagesRef.current = truncated
    }
  }, [messages])

  // Text-to-speech for English
  const speakEnglish = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = SPEECH_CONFIG.LANG
      utterance.rate = SPEECH_CONFIG.RATE

      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices()
        const englishVoice = voices.find(voice =>
          SPEECH_CONFIG.VOICE_SEARCH_PRIORITIES.some(lang => voice.lang.includes(lang))
        )
        if (englishVoice) {
          utterance.voice = englishVoice
        }
      }

      setVoice()

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true })
      }

      window.speechSynthesis.speak(utterance)
    }
  }, [])

  // Start voice recording
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting recognition:', error)
        setIsListening(false)
      }
    }
  }

  // Stop voice recording
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  // Update daily streak
  const updateDailyStreak = useCallback(() => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()

    if (lastPracticeDate === today) {
      return
    }

    if (lastPracticeDate === yesterday) {
      setDailyStreak(prev => {
        const newStreak = prev + 1
        setItemSafe(STORAGE_KEYS.STREAK, newStreak)
        return newStreak
      })
    } else if (lastPracticeDate && lastPracticeDate !== yesterday) {
      setDailyStreak(1)
      setItemSafe(STORAGE_KEYS.STREAK, 1)
    } else {
      setDailyStreak(1)
      setItemSafe(STORAGE_KEYS.STREAK, 1)
    }

    setLastPracticeDate(today)
    setItemSafe(STORAGE_KEYS.LAST_PRACTICE, today)
  }, [lastPracticeDate])

  // Assess user level
  const assessLevel = useCallback((messageHistory: Message[]) => {
    const userMessages = messageHistory.filter(m => m.isUser)

    if (userMessages.length < LEVEL_ASSESSMENT.MIN_INTERACTIONS) {
      return
    }

    // Simple heuristic assessment based on message complexity
    const avgLength = userMessages.reduce((sum, m) => sum + m.content.length, 0) / userMessages.length
    const avgWords = userMessages.reduce((sum, m) => sum + m.content.split(' ').length, 0) / userMessages.length

    let level: CEFRLevel = 'A1'
    let confidence = 0.5

    if (avgWords > 15 && avgLength > 80) {
      level = 'B2'
      confidence = 0.7
    } else if (avgWords > 10 && avgLength > 50) {
      level = 'B1'
      confidence = 0.7
    } else if (avgWords > 7 && avgLength > 30) {
      level = 'A2'
      confidence = 0.6
    }

    const newLevel: UserLevel = {
      level,
      confidence,
      strengths: [],
      weaknesses: [],
      lastAssessed: new Date(),
      grammarScore: 0.7,
      vocabularyScore: 0.6,
      fluencyScore: 0.7,
      pronunciationScore: 0.6
    }

    setUserLevel(newLevel)
    setItemSafe(STORAGE_KEYS.LEVEL, newLevel)
  }, [])

  // Send message
  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim()

    if (!textToSend) return

    // Validate and sanitize
    const sanitized = validateAndSanitizeMessage(textToSend)
    if (!sanitized) {
      alert('Invalid message content. Please try again. 消息内容无效，请重试。')
      return
    }

    if (sanitized.length > INPUT_CONSTRAINTS.MAX_MESSAGE_LENGTH) {
      alert(`Message too long. Maximum ${INPUT_CONSTRAINTS.MAX_MESSAGE_LENGTH} characters. 消息太长。`)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: sanitized,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => {
      const updated = [...prev, userMessage]
      messagesRef.current = updated
      return updated
    })
    setInput('')
    setIsLoading(true)

    // Update streak
    updateDailyStreak()

    try {
      const response = await postJsonWithRetry<{ response: string }>('/api/chat', {
        message: sanitized,
        messages: messagesRef.current,
        userLevel: userLevel?.level,
        mode: practiceMode
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        isUser: false,
        timestamp: new Date(),
        messageType: 'normal'
      }

      setMessages(prev => {
        const updated = [...prev, assistantMessage]
        messagesRef.current = updated
        return updated
      })

      // Assess level periodically
      if (messagesRef.current.filter(m => m.isUser).length % 5 === 0) {
        assessLevel(messagesRef.current)
      }

    } catch (error) {
      console.error('Error sending message:', error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again. 抱歉，出现错误。请重试。',
        isUser: false,
        timestamp: new Date(),
        messageType: 'normal'
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Quick action buttons
  const quickActions = [
    { text: 'Help me correct my last message', label: 'Correct 纠正', emoji: '✏️' },
    { text: 'Can you explain that in Chinese?', label: 'Explain 解释', emoji: '💡' },
    { text: 'Can you give me more examples?', label: 'Examples 例子', emoji: '📝' }
  ]

  // Clear chat
  const clearChat = () => {
    if (confirm('Clear all messages? This cannot be undone. 清除所有消息？此操作无法撤消。')) {
      setMessages([])
      messagesRef.current = []
      clearAppStorage()
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">📚</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                English Tutor 英语导师
              </h1>
              <p className="text-sm text-gray-600">
                {userLevel ? `Level: ${userLevel.level}` : 'Let\'s practice!'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Streak indicator */}
            {dailyStreak > 0 && (
              <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-lg">🔥</span>
                <span className="font-semibold text-orange-700">{dailyStreak}</span>
              </div>
            )}

            {/* Settings button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Settings"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Settings panel */}
      {showSettings && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-semibold mb-2">Practice Mode 练习模式</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PRACTICE_MODES).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setPracticeMode(value)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    practiceMode === value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {value.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={clearChat}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Clear Chat 清除对话
            </button>
          </div>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              onSpeak={!message.isUser ? speakEnglish : undefined}
            />
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(action.text)}
              disabled={isLoading}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {action.emoji} {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-end space-x-2">
          {/* Voice input button */}
          {speechSupported && (
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-full transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={isListening ? 'Stop recording' : 'Start recording'}
              title={isListening ? 'Stop recording 停止录音' : 'Start recording 开始录音'}
            >
              🎤
            </button>
          )}

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type in English... 用英语输入..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            maxLength={INPUT_CONSTRAINTS.MAX_MESSAGE_LENGTH}
          />

          {/* Send button */}
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Send 发送
          </button>
        </div>

        {/* Character count */}
        {input.length > INPUT_CONSTRAINTS.MAX_MESSAGE_LENGTH * 0.8 && (
          <div className="max-w-4xl mx-auto mt-1 text-right text-xs text-gray-500">
            {input.length}/{INPUT_CONSTRAINTS.MAX_MESSAGE_LENGTH}
          </div>
        )}
      </div>
    </div>
  )
}
