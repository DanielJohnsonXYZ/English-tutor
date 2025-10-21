# Apply proper CSS with branding colors
css_content = """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Animation for typing indicator */
@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* Ensure proper text colors */
.text-gray-900 {
  color: #111827;
}

.text-gray-800 {
  color: #1f2937;
}

.text-gray-700 {
  color: #374151;
}

.text-gray-600 {
  color: #4b5563;
}

.text-white {
  color: #ffffff;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.bg-white {
  background-color: #ffffff;
}

.hover\\:bg-blue-600:hover {
  background-color: #2563eb;
}
"""

with open('src/app/globals.css', 'w') as f:
    f.write(css_content)

print("CSS branding applied successfully!")
