# English Tutor for Chinese Students | 中国学生英语导师

An AI-powered English learning application specifically designed for Chinese students. Built with Claude AI, this tutor understands the unique challenges Chinese speakers face when learning English and provides targeted, bilingual support.

## 🎯 Key Features | 主要功能

### Designed for Chinese Learners
- **Bilingual Support** 双语支持: Strategic use of Chinese explanations for complex concepts
- **Chinese→English Error Detection** 错误检测: Focuses on common mistakes Chinese learners make (articles, plural forms, tenses, word order, etc.)
- **Cultural Context** 文化背景: Explains English-speaking culture and communication styles
- **Pronunciation Help** 发音帮助: Special focus on difficult sounds (TH, R/L, final consonants)

### Intelligent Teaching
- **Adaptive Level Assessment** 自适应水平评估: Automatically detects your CEFR level (A1-C2)
- **Smart Error Correction** 智能纠错: Clear explanations with examples in both English and Chinese
- **Practice Modes** 练习模式: Free talk, scenarios, grammar focus, pronunciation, vocabulary
- **Real-time Feedback** 实时反馈: Immediate corrections with explanations

### User Experience
- 🗣️ **Voice Input/Output** 语音输入输出: Practice speaking and listening
- 🔥 **Daily Streak Tracking** 每日打卡: Stay motivated with streak counters
- 📊 **Progress Monitoring** 进度监控: Track your improvement over time
- 💾 **Auto-save** 自动保存: Never lose your conversation history
- 📱 **Responsive Design** 响应式设计: Works on desktop and mobile

## 🚀 Quick Start | 快速开始

### Prerequisites | 前置要求
- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation | 安装

1. **Clone or download this project**
   ```bash
   cd chinese-english-tutor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use | 使用方法

### Starting a Conversation | 开始对话
Just type in English! The AI tutor will:
- Understand what you're trying to say
- Gently correct your mistakes
- Explain grammar rules
- Provide Chinese explanations when needed

### Example Conversations | 对话示例

**Student:** "I have cat."

**Tutor:** "Good try! I can understand you mean you own a cat. However, the correct way to say this is:

✅ **Correct:** I have a cat.
❌ **Error:** I have cat.

**Why?** In English, we need to use an article (a/an/the) before singular countable nouns. Chinese doesn't have articles (冠词), but English requires them.

**中文解释:** 英语中，单数可数名词前需要加冠词 a/an/the，虽然中文没有这个概念。

**More examples:**
- I have a dog. 我有一只狗。
- She has a car. 她有一辆车。
- He is a teacher. 他是一名老师。

Let's practice - can you try saying it again?"

### Quick Actions | 快捷操作
- **Correct 纠正**: Ask the tutor to correct your last message
- **Explain 解释**: Get a Chinese explanation
- **Examples 例子**: Request more example sentences

### Practice Modes | 练习模式
Click the settings ⚙️ button to select:
- **Free Talk** 自由对话: Natural conversation practice
- **Scenario** 场景练习: Real-world situations
- **Grammar Focus** 语法重点: Specific grammar practice
- **Pronunciation** 发音练习: Sound and accent training
- **Vocabulary** 词汇学习: Build your word bank

### Voice Features | 语音功能
- 🎤 **Voice Input**: Click the microphone to speak in English
- 🔊 **Listen**: Click the speaker icon on any message to hear pronunciation

## 🎓 What Makes This Different | 有什么不同

### Compared to Generic English Tutors | 与普通英语导师的区别

1. **Chinese-Specific Error Detection**
   - Knows common Chinese→English transfer errors
   - Articles (a/an/the) - doesn't exist in Chinese
   - Plural forms - Chinese uses context, not word changes
   - Verb tenses - Chinese uses time words, English changes verbs
   - Word order - different SVO patterns
   - Countable/Uncountable nouns
   - Subject-verb agreement

2. **Bilingual Explanations**
   - Uses Chinese strategically, not as a crutch
   - Complex grammar explained in Chinese when needed
   - Encourages thinking in English while providing safety net

3. **Cultural Context**
   - Explains Western communication norms
   - Contrasts with Chinese cultural expectations
   - Teaches when directness is appropriate

4. **Pronunciation Focus**
   - TH sounds (θ/ð) - 咬舌音
   - R vs L distinction - 卷舌音
   - Final consonants - 结尾辅音
   - Stress and intonation patterns

## 🏗️ Architecture | 架构

### Technology Stack | 技术栈
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Deployment**: Vercel-ready

### Project Structure | 项目结构
```
chinese-english-tutor/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/chat/     # API route for Claude
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ChatInterface.tsx    # Main chat UI
│   │   ├── MessageBubble.tsx    # Message display
│   │   └── ErrorBoundary.tsx    # Error handling
│   ├── utils/            # Utility functions
│   │   ├── localStorage.ts      # Safe storage
│   │   ├── apiRetry.ts          # API retry logic
│   │   └── sanitize.ts          # Input sanitization
│   ├── constants/        # App constants
│   │   └── app.ts               # Configuration
│   └── types/            # TypeScript types
│       └── index.ts             # Type definitions
├── package.json
├── tsconfig.json
└── README.md
```

### Key Design Decisions | 关键设计决策

1. **First Principles Approach**
   - Started from: "What do Chinese students need most?"
   - Result: Bilingual, error-focused, culturally aware tutor

2. **Performance Optimizations**
   - Memoized components (MessageBubble)
   - Debounced localStorage writes
   - API retry with exponential backoff
   - Message history truncation

3. **Security**
   - Input sanitization (XSS protection)
   - Rate limiting
   - API key validation
   - Safe localStorage with quota handling

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Bilingual interface

## 🌟 Advanced Features | 高级功能

### Level Assessment | 水平评估
The system automatically assesses your level based on:
- Message complexity
- Vocabulary richness
- Grammar accuracy
- Fluency

Levels mapped to CEFR standard:
- A1: Beginner 初学者
- A2: Elementary 基础
- B1: Intermediate 中级
- B2: Upper Intermediate 中高级
- C1: Advanced 高级
- C2: Proficiency 精通

### Daily Streak | 每日打卡
- Tracks consecutive days of practice
- Motivates consistent learning
- Persists across sessions

### Smart Corrections | 智能纠错
Corrections include:
- What you said (error)
- Correct version
- Grammar explanation in English
- Chinese explanation (中文解释)
- 2-3 example sentences

## 🚀 Deployment | 部署

### Deploy to Vercel | 部署到 Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create chinese-english-tutor --public --push --source=.
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `ANTHROPIC_API_KEY`
   - Deploy!

3. **Done!** Your tutor is now live 🎉

### Environment Variables | 环境变量
Required:
- `ANTHROPIC_API_KEY`: Your Anthropic API key

## 📊 Improvements Over Original | 相比原版的改进

### Original Project | 原项目
- Taught **Chinese to English speakers**
- Generic error correction
- No cultural context
- English-only interface

### This Version | 本版本
✅ Teaches **English to Chinese speakers**
✅ Chinese-specific error patterns
✅ Cultural and communication style teaching
✅ Bilingual interface and explanations
✅ Focus on Chinese learner pain points:
   - Articles (a/an/the)
   - Plural forms
   - Verb tenses
   - Word order
   - Prepositions
   - Pronunciation (TH, R/L sounds)

### Technical Improvements | 技术改进
✅ Enhanced API prompt for Chinese learners
✅ Bilingual error messages
✅ CEFR-based level assessment
✅ Multiple practice modes
✅ Better vocabulary tracking
✅ Improved type definitions
✅ More robust error handling

## 🔧 Configuration | 配置

### Customize Teaching Style | 自定义教学风格
Edit `src/app/api/chat/route.ts` to modify the `SYSTEM_PROMPT` and adjust:
- Teaching tone (formal/casual)
- Chinese explanation frequency
- Error correction style
- Practice focus areas

### Adjust Constants | 调整常量
Edit `src/constants/app.ts` to modify:
- Rate limits
- Message length limits
- Storage quotas
- Level assessment thresholds

## 🤝 Contributing | 贡献

Contributions welcome! Areas for improvement:
- [ ] Add unit tests
- [ ] Implement more practice scenarios
- [ ] Add vocabulary flashcards
- [ ] Create progress charts
- [ ] Add IELTS/TOEFL specific modes
- [ ] Implement group learning features

## 📝 License

MIT License - feel free to use and modify!

## 🙏 Acknowledgments

- Built with [Claude AI](https://www.anthropic.com/claude) by Anthropic
- Inspired by [Chinese-Tutor](https://github.com/DanielJohnsonXYZ/Chinese-Tutor)
- Redesigned from first principles for Chinese students learning English

## 📞 Support | 支持

If you encounter issues:
1. Check the console for error messages
2. Ensure your API key is correctly set
3. Try clearing browser cache/localStorage
4. Check that you have a stable internet connection

## 🎯 Roadmap | 路线图

### Near Term | 近期
- [ ] Add writing practice mode
- [ ] Implement grammar exercises
- [ ] Create vocabulary lists by level
- [ ] Add pronunciation scoring

### Future | 未来
- [ ] Multiplayer conversation practice
- [ ] Integration with IELTS/TOEFL prep
- [ ] Native speaker conversation matching
- [ ] Offline mode with service worker

---

**Made with ❤️ for Chinese students learning English**

**专为学习英语的中国学生打造 ❤️**
