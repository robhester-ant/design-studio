// Theme Store - Manages design system themes

const ThemeStore = {
  STORAGE_KEY: 'design-studio:themes',

  defaultTokens: {
    colors: {
      primary: '#0751CF',
      primaryHover: '#0642A8',
      secondary: '#6B7280',
      text: '#4C5461',
      textSecondary: '#9CA3AF',
      background: '#FAF9F7',
      surface: '#FFFFFF',
      border: '#DEDDD8',
      borderLight: '#F3F2EE',
      focus: 'rgba(9, 78, 206, 0.5)',
      error: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
      info: '#3B82F6'
    },
    typography: {
      fontFamilies: {
        heading: 'Lora, Georgia, serif',
        body: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        mono: 'SF Mono, Monaco, Cascadia Code, Consolas, monospace'
      },
      fontSizes: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px'
      }
    },
    spacing: {
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px',
      '5': '24px',
      '6': '32px',
      '8': '48px'
    },
    borderRadius: {
      none: '0',
      sm: '2px',
      md: '4px',
      lg: '8px',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
    }
  },

  themes: [],
  activeThemeId: null,
  listeners: [],

  init() {
    this.load();
    if (this.themes.length === 0) {
      this.createTheme('Default Theme', 'Zed-inspired minimal design');
    }
    this.notify();
  },

  load() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        this.themes = parsed.themes || [];
        this.activeThemeId = parsed.activeThemeId;
      }
    } catch (e) {
      console.error('Failed to load themes:', e);
    }
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        themes: this.themes,
        activeThemeId: this.activeThemeId
      }));
    } catch (e) {
      console.error('Failed to save themes:', e);
    }
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
      themes: this.themes,
      activeTheme: this.getActiveTheme(),
      activeThemeId: this.activeThemeId
    };
  },

  getActiveTheme() {
    return this.themes.find(t => t.id === this.activeThemeId) || null;
  },

  generateId() {
    return 'theme-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
  },

  createTheme(name, description = '') {
    const now = new Date().toISOString();
    const tokens = JSON.parse(JSON.stringify(this.defaultTokens));

    const theme = {
      id: this.generateId(),
      name,
      description,
      createdAt: now,
      updatedAt: now,
      tokens,
      cssVariables: this.generateCssVariables(tokens),
      componentStyles: this.generateComponentStyles(),
      version: 1
    };

    this.themes.push(theme);
    this.activeThemeId = theme.id;
    this.save();
    this.notify();
    return theme;
  },

  updateTheme(id, updates) {
    const index = this.themes.findIndex(t => t.id === id);
    if (index === -1) return;

    const theme = this.themes[index];
    Object.assign(theme, updates);
    theme.updatedAt = new Date().toISOString();
    theme.version += 1;

    // Regenerate CSS if tokens changed
    if (updates.tokens) {
      theme.cssVariables = this.generateCssVariables(theme.tokens);
    }

    this.save();
    this.notify();
  },

  setActiveTheme(id) {
    this.activeThemeId = id;
    this.save();
    this.notify();
  },

  deleteTheme(id) {
    this.themes = this.themes.filter(t => t.id !== id);
    if (this.activeThemeId === id) {
      this.activeThemeId = this.themes[0]?.id || null;
    }
    this.save();
    this.notify();
  },

  duplicateTheme(id, newName) {
    const original = this.themes.find(t => t.id === id);
    if (!original) return null;

    const theme = this.createTheme(newName, original.description);
    theme.tokens = JSON.parse(JSON.stringify(original.tokens));
    theme.cssVariables = original.cssVariables;
    theme.componentStyles = original.componentStyles;
    this.save();
    this.notify();
    return theme;
  },

  generateCssVariables(tokens) {
    const lines = [':root {'];

    // Colors
    Object.entries(tokens.colors).forEach(([key, value]) => {
      const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      lines.push(`  --color-${kebab}: ${value};`);
    });

    // Typography
    Object.entries(tokens.typography.fontFamilies).forEach(([key, value]) => {
      lines.push(`  --font-${key}: ${value};`);
    });
    Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
      lines.push(`  --text-${key}: ${value};`);
    });

    // Spacing
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      lines.push(`  --space-${key}: ${value};`);
    });

    // Border radius
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      lines.push(`  --radius-${key}: ${value};`);
    });

    // Shadows
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      lines.push(`  --shadow-${key}: ${value};`);
    });

    lines.push('}');
    return lines.join('\n');
  },

  generateComponentStyles() {
    return `/* Component Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 0.1s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-background);
}

.input {
  height: 36px;
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  background-color: var(--color-surface);
  transition: border-color 0.1s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-focus);
}

.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
}`;
  }
};
