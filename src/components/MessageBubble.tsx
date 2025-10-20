'use client'

import React, { memo } from 'react'
import { Message } from '@/types'

interface MessageBubbleProps {
  message: Message
  onSpeak?: (text: string) => void
}

const MessageBubble: React.FC<MessageBubbleProps> = memo(({ message, onSpeak }) => {
  const isUser = message.isUser

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-800 shadow-md'
        }`}
      >
        {/* Message type indicator */}
        {!isUser && message.messageType && message.messageType !== 'normal' && (
          <div className="text-xs font-semibold mb-2 opacity-70">
            {message.messageType === 'correction' && '✏️ Correction 纠正'}
            {message.messageType === 'encouragement' && '💪 Encouragement 鼓励'}
            {message.messageType === 'cultural' && '🌍 Cultural Note 文化注释'}
            {message.messageType === 'grammar' && '📚 Grammar Point 语法要点'}
            {message.messageType === 'pronunciation' && '🗣️ Pronunciation 发音'}
          </div>
        )}

        {/* Main content */}
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>

        {/* Chinese explanation if available */}
        {!isUser && message.chineseExplanation && (
          <div className="mt-2 pt-2 border-t border-gray-200 text-sm text-gray-600">
            <span className="font-semibold">中文:</span> {message.chineseExplanation}
          </div>
        )}

        {/* Error highlights */}
        {!isUser && message.errorHighlights && message.errorHighlights.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.errorHighlights.map((error, idx) => (
              <div key={idx} className="text-sm bg-red-50 p-2 rounded">
                <div className="font-semibold text-red-700">
                  ❌ {error.text}
                </div>
                <div className="text-green-700">
                  ✅ {error.correction}
                </div>
                <div className="text-gray-600 mt-1">
                  {error.explanation}
                </div>
                {error.chineseExplanation && (
                  <div className="text-gray-500 text-xs mt-1">
                    {error.chineseExplanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Suggestions */}
        {!isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 space-y-1">
            <div className="text-xs font-semibold opacity-70">
              Try these: 试试这些:
            </div>
            {message.suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="text-sm bg-blue-50 px-2 py-1 rounded"
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {/* Timestamp and actions */}
        <div className="flex items-center justify-between mt-2 text-xs opacity-60">
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>

          {/* Speak button for assistant messages */}
          {!isUser && onSpeak && (
            <button
              onClick={() => onSpeak(message.content)}
              className="ml-2 hover:opacity-100 transition-opacity"
              aria-label="Read aloud"
              title="Read aloud 朗读"
            >
              🔊
            </button>
          )}
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison for memo
  return (
    prevProps.message.id === nextProps.message.id &&
    prevProps.message.content === nextProps.message.content
  )
})

MessageBubble.displayName = 'MessageBubble'

export default MessageBubble
