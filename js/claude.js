// Claude API Integration

const ClaudeAPI = {
  STORAGE_KEY: 'design-studio:api-key',
  MESSAGES_KEY: 'design-studio:messages',

  apiKey: null,
  messages: [],
  isLoading: false,
  listeners: [],

  SYSTEM_PROMPT: `You are a design system expert helping users create and refine UI themes.
You have access to the current design system files and can suggest changes.

When suggesting changes, format your response as follows:

1. Explain what you're changing and why
2. Provide the updated code in a code block with the filename:

\`\`\`css filename="variables.css"
:root {
  --color-primary: #0751CF;
  ...
}
\`\`\`

When analyzing screenshots or URLs:
- Identify color palettes, typography, spacing patterns
- Suggest matching design tokens
- Reference specific visual elements from the image

Always maintain consistency with existing design tokens.`,

  init() {
    this.apiKey = localStorage.getItem(this.STORAGE_KEY);
    try {
      const saved = localStorage.getItem(this.MESSAGES_KEY);
      if (saved) {
        this.messages = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load messages:', e);
    }
    this.notify();
  },

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },

  notify() {
    this.listeners.forEach(l => l(this.getState()));
  },

  getState() {
    return {
      apiKey: this.apiKey,
      messages: this.messages,
      isLoading: this.isLoading,
      hasApiKey: !!this.apiKey
    };
  },

  setApiKey(key) {
    this.apiKey = key;
    if (key) {
      localStorage.setItem(this.STORAGE_KEY, key);
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.notify();
  },

  clearMessages() {
    this.messages = [];
    localStorage.removeItem(this.MESSAGES_KEY);
    this.notify();
  },

  saveMessages() {
    try {
      localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(this.messages));
    } catch (e) {
      console.error('Failed to save messages:', e);
    }
  },

  generateId() {
    return 'msg-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
  },

  parseChangeSuggestions(response) {
    const codeBlockRegex = /```(\w+)\s+filename="([^"]+)"\n([\s\S]*?)```/g;
    const suggestions = [];

    let match;
    while ((match = codeBlockRegex.exec(response)) !== null) {
      suggestions.push({
        id: this.generateId(),
        language: match[1],
        filename: match[2],
        content: match[3].trim(),
        applied: false
      });
    }

    return suggestions;
  },

  async sendMessage(text, attachments = []) {
    if (!this.apiKey) {
      throw new Error('API key not set');
    }

    // Build user message content
    const content = [];

    // Add images first
    for (const attachment of attachments) {
      if (attachment.type === 'image') {
        content.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: attachment.mediaType,
            data: attachment.data
          }
        });
      } else if (attachment.type === 'url') {
        // Add URL as text
        text = `[Analyzing URL: ${attachment.data}]\n\n${text}`;
      }
    }

    content.push({ type: 'text', text });

    // Create user message
    const userMessage = {
      id: this.generateId(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    this.messages.push(userMessage);
    this.isLoading = true;
    this.notify();

    try {
      // Build context from active theme
      const activeTheme = ThemeStore.getActiveTheme();
      let contextString = '';
      if (activeTheme) {
        contextString = `
--- tokens.json ---
${JSON.stringify(activeTheme.tokens, null, 2)}

--- variables.css ---
${activeTheme.cssVariables}

--- components.css ---
${activeTheme.componentStyles}`;
      }

      // Build API messages
      const apiMessages = this.messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', // Claude Sonnet 4 - fast and capable for design tasks
          max_tokens: 4096,
          system: `${this.SYSTEM_PROMPT}\n\nCURRENT DESIGN SYSTEM CONTEXT:\n${contextString}`,
          messages: apiMessages
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      const data = await response.json();
      const assistantText = data.content[0].text;

      // Parse suggestions
      const suggestions = this.parseChangeSuggestions(assistantText);

      const assistantMessage = {
        id: this.generateId(),
        role: 'assistant',
        content: [{ type: 'text', text: assistantText }],
        timestamp: new Date().toISOString(),
        suggestions: suggestions.length > 0 ? suggestions : undefined
      };

      this.messages.push(assistantMessage);
      this.saveMessages();

    } catch (error) {
      // Add error message
      this.messages.push({
        id: this.generateId(),
        role: 'assistant',
        content: [{ type: 'text', text: `Error: ${error.message}` }],
        timestamp: new Date().toISOString(),
        isError: true
      });
    } finally {
      this.isLoading = false;
      this.notify();
    }
  },

  applySuggestion(messageId, suggestionId) {
    const message = this.messages.find(m => m.id === messageId);
    if (!message?.suggestions) return;

    const suggestion = message.suggestions.find(s => s.id === suggestionId);
    if (!suggestion) return;

    const activeTheme = ThemeStore.getActiveTheme();
    if (!activeTheme) return;

    // Apply based on filename
    if (suggestion.filename === 'variables.css') {
      ThemeStore.updateTheme(activeTheme.id, { cssVariables: suggestion.content });
    } else if (suggestion.filename === 'components.css') {
      ThemeStore.updateTheme(activeTheme.id, { componentStyles: suggestion.content });
    } else if (suggestion.filename === 'tokens.json') {
      try {
        const tokens = JSON.parse(suggestion.content);
        ThemeStore.updateTheme(activeTheme.id, { tokens });
      } catch (e) {
        console.error('Invalid JSON in suggestion:', e);
      }
    }

    suggestion.applied = true;
    this.saveMessages();
    this.notify();
  }
};
