import re

# Fix localStorage.ts
with open('src/utils/localStorage.ts', 'r') as f:
    content = f.read()
content = content.replace('let debounceTimers:', 'const debounceTimers:')
with open('src/utils/localStorage.ts', 'w') as f:
    f.write(content)

# Fix ChatInterface.tsx - remove unused imports and fix any types
with open('src/components/ChatInterface.tsx', 'r') as f:
    lines = f.readlines()

# Remove unused state variable
new_lines = []
for line in lines:
    if 'const [currentSession, setCurrentSession]' not in line:
        # Replace 'any' with proper types
        line = line.replace('recognitionRef.current.onresult = (event: any)', 'recognitionRef.current.onresult = (event: SpeechRecognitionEvent)')
        line = line.replace('recognitionRef.current.onerror = (event: any)', 'recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent)')
        line = line.replace('recognitionRef.current.onend = ()', 'recognitionRef.current.onend = ()')
        line = line.replace('const recognitionRef = useRef<any>(null)', 'const recognitionRef = useRef<SpeechRecognitionInterface | null>(null)')
        new_lines.append(line)

with open('src/components/ChatInterface.tsx', 'w') as f:
    f.writelines(new_lines)

# Remove PracticeSession from imports in ChatInterface
with open('src/components/ChatInterface.tsx', 'r') as f:
    content = f.read()
content = content.replace('import { Message, UserLevel, CEFRLevel, PracticeSession } from', 'import { Message, UserLevel, CEFRLevel } from')
with open('src/components/ChatInterface.tsx', 'w') as f:
    f.write(content)

print("All fixes applied successfully!")
