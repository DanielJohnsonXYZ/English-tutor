# Quick Start Guide | 快速入门指南

Get your English tutor running in 5 minutes! 5分钟内启动你的英语导师！

## ⚡ Super Quick Start | 超快速开始

### Option 1: Local Development | 本地开发

```bash
# 1. Navigate to project directory | 进入项目目录
cd chinese-english-tutor

# 2. Install dependencies | 安装依赖
npm install

# 3. Create environment file | 创建环境文件
cp .env.example .env.local

# 4. Edit .env.local and add your API key | 编辑 .env.local 添加你的 API 密钥
# Get your key from: https://console.anthropic.com/
# ANTHROPIC_API_KEY=sk-ant-...

# 5. Start the server | 启动服务器
npm run dev

# 6. Open browser | 打开浏览器
# Visit: http://localhost:3000
```

### Option 2: Deploy to Vercel (Recommended) | 部署到 Vercel（推荐）

1. **Push to GitHub | 推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create my-english-tutor --public --push --source=.
   ```

2. **Deploy on Vercel | 在 Vercel 上部署**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: Your API key from https://console.anthropic.com/
   - Click "Deploy"

3. **Done! 完成！**
   - Your tutor will be live at `https://your-project.vercel.app`

---

## 🎯 First Conversation | 第一次对话

### Step 1: Open the App | 打开应用
Navigate to `http://localhost:3000` or your Vercel URL

### Step 2: Read Welcome Message | 阅读欢迎消息
The AI tutor will greet you in both English and Chinese

### Step 3: Start Talking! | 开始对话！

Try these example messages:

**Beginner Level:**
```
Hi, I want to practice English!
My name is Li Ming.
I like play basketball.  (intentional error to see correction)
```

**Intermediate Level:**
```
I want to improve my English speaking skills.
Can you help me with grammar?
I have went to Beijing last week.  (intentional error)
```

**Advanced Level:**
```
I'm preparing for the IELTS exam.
Could you help me practice formal English?
I'd like to discuss current events.
```

### Step 4: Use Quick Actions | 使用快捷操作

After the tutor responds, try these buttons:

- **✏️ Correct 纠正**: Get correction on your last message
- **💡 Explain 解释**: Ask for Chinese explanation
- **📝 Examples 例子**: Request more example sentences

### Step 5: Try Voice Input | 尝试语音输入

1. Click the 🎤 microphone button
2. Allow browser microphone access when prompted
3. Speak in English
4. Click again to stop recording
5. Your speech will appear as text

### Step 6: Listen to Pronunciation | 听发音

1. Look for the 🔊 speaker icon on tutor messages
2. Click to hear English pronunciation
3. Practice repeating after the audio

---

## 🎨 Interface Guide | 界面指南

### Header | 顶部栏
```
📚 English Tutor 英语导师    🔥 3 (streak)  ⚙️ (settings)
Level: B1
```

- **Title**: App name in English and Chinese
- **Level**: Your current CEFR level (A1-C2)
- **Streak**: 🔥 Days of consecutive practice
- **Settings**: ⚙️ Click for options

### Chat Area | 对话区域
- **Blue bubbles**: Your messages (right side)
- **White bubbles**: Tutor messages (left side)
- **Icons**: Indicate message type
  - ✏️ Correction
  - 💪 Encouragement
  - 🌍 Cultural Note
  - 📚 Grammar Point
  - 🗣️ Pronunciation

### Input Area | 输入区域
```
[🎤] [Type in English... 用英语输入...] [Send 发送]
```

- **🎤 Microphone**: Voice input (if supported)
- **Text box**: Type your message
- **Send button**: Submit message

---

## ⚙️ Settings & Options | 设置与选项

Click the **⚙️ settings** button to access:

### Practice Modes | 练习模式

**Free Talk 自由对话**
- Natural conversation about any topic
- Best for: Building fluency, daily practice

**Scenario 场景练习**
- Real-world situations (restaurant, airport, etc.)
- Best for: Practical English, travel preparation

**Grammar Focus 语法重点**
- Specific grammar practice
- Best for: Fixing error patterns

**Pronunciation 发音练习**
- Sound and accent training
- Best for: TH, R/L, final consonants

**Vocabulary 词汇学习**
- Word building and memorization
- Best for: Expanding vocabulary

### Clear Chat | 清除对话
- Deletes all messages
- Cannot be undone!
- Use when starting fresh

---

## 💡 Tips for Best Results | 最佳使用建议

### 1. Practice Daily | 每天练习
- Even 10 minutes daily is better than 1 hour weekly
- Build your streak! 🔥

### 2. Make Mistakes! | 勇于犯错！
- Errors are learning opportunities
- The tutor will gently correct you
- Don't be afraid to try new expressions

### 3. Ask for Help | 寻求帮助
- Type "请用中文解释" for Chinese explanation
- Ask "Can you give more examples?"
- Request "Please correct my grammar"

### 4. Use Voice Features | 使用语音功能
- Speaking improves pronunciation
- Listening builds comprehension
- More engaging than text only

### 5. Set Goals | 设定目标
- "I want to practice past tense today"
- "Help me with business English"
- "Prepare me for IELTS speaking"

### 6. Review Corrections | 复习纠错
- Read the explanations carefully
- Try the example sentences
- Practice the corrected version

---

## 🐛 Troubleshooting | 故障排除

### "Too many requests" Error | "请求过多"错误
**Problem**: Rate limit exceeded (30 requests/minute)
**Solution**: Wait 1 minute, then continue

### Voice Input Not Working | 语音输入无法工作
**Problem**: Microphone permissions
**Solution**:
1. Check browser settings
2. Allow microphone access
3. Try Chrome or Edge (best support)

### No Chinese Explanations | 没有中文解释
**Problem**: Tutor responding only in English
**Solution**: Explicitly ask "请用中文解释" or "Explain in Chinese"

### Messages Not Saving | 消息未保存
**Problem**: localStorage disabled or full
**Solution**:
1. Enable cookies/localStorage in browser
2. Clear old data using "Clear Chat"
3. Check browser privacy settings

### Slow Responses | 响应缓慢
**Problem**: API or network issues
**Solution**:
1. Check internet connection
2. API might be busy - wait a moment
3. Retry will happen automatically (3 attempts)

---

## 📱 Mobile Usage | 移动设备使用

### iPhone/iPad (Safari)
- ✅ Works great
- ✅ Voice input supported
- ✅ Speech output supported
- 💡 Tip: Add to Home Screen for app-like experience

### Android (Chrome)
- ✅ Works great
- ✅ Voice input supported
- ✅ Speech output supported
- 💡 Tip: Install as PWA for offline access (future)

---

## 🎓 Learning Paths | 学习路径

### Path 1: Complete Beginner (A1)
Week 1-2: Free Talk mode
- Practice: Greetings, introductions, basic questions
- Focus: Present tense, simple sentences

Week 3-4: Scenario mode
- Practice: Ordering food, shopping, asking directions
- Focus: Common phrases, polite expressions

### Path 2: Intermediate (B1-B2)
Week 1: Grammar Focus
- Target: Past tense, articles, plurals
- Fix: Chinese-specific errors

Week 2-3: Free Talk
- Practice: Daily conversations, expressing opinions
- Focus: Fluency, natural expressions

Week 4: Pronunciation
- Target: TH sounds, R/L, final consonants
- Practice: Difficult words and phrases

### Path 3: Advanced (C1-C2)
Week 1-2: Free Talk
- Discuss: Current events, complex topics
- Focus: Nuanced expressions, idioms

Week 3: Vocabulary
- Target: Academic/professional words
- Practice: Formal writing and speaking

Week 4: Scenario (Business/Academic)
- Practice: Presentations, negotiations, essays
- Focus: Professional communication

---

## 🆘 Getting Help | 获取帮助

### In-App Help | 应用内帮助
Just ask the tutor:
- "How do I use this app?"
- "What features are available?"
- "Can you help me set a learning goal?"

### Technical Issues | 技术问题
1. Check browser console for errors (F12)
2. Verify API key is set correctly
3. Clear browser cache and reload
4. Try different browser

### Learning Questions | 学习问题
Ask the tutor directly:
- "Why is this grammar rule important?"
- "How do native speakers say this?"
- "What's the difference between X and Y?"

---

## 🎉 You're Ready! | 准备就绪！

You now have everything you need to start improving your English!

**Remember | 记住:**
- Practice consistently 坚持练习
- Don't fear mistakes 不怕犯错
- Ask questions 多问问题
- Have fun! 享受学习！

**Happy learning! 学习愉快！** 📚✨

---

## 📞 Quick Reference | 快速参考

### Essential Commands | 基本命令
```bash
npm install          # Install dependencies 安装依赖
npm run dev          # Start development 启动开发
npm run build        # Build for production 生产构建
npm start            # Run production 运行生产版本
```

### Environment Variables | 环境变量
```
ANTHROPIC_API_KEY    # Required 必需
```

### Keyboard Shortcuts | 键盘快捷键
```
Enter               # Send message 发送消息
Shift + Enter       # New line 换行
```

### URLs | 网址
- Local: `http://localhost:3000`
- Get API Key: `https://console.anthropic.com/`
- Vercel Deploy: `https://vercel.com`

---

**Need more help? Just ask the tutor! 需要更多帮助？直接问导师！**
