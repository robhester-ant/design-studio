// Theme Store - Manages design system themes

const DEFAULT_THEMES = [
  {
    id: 'zed-minimal',
    name: 'Zed Minimal',
    description: 'Clean, minimalist design with blue accent',
    tokens: {
      colors: {
        primary: '#0751CF',
        primaryHover: '#094ACE',
        secondary: '#6B7280',
        text: '#4C5461',
        textSecondary: '#9CA3AF',
        background: '#FAF9F7',
        surface: '#FFFFFF',
        border: '#DEDDD9',
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
          xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px', '3xl': '30px'
        }
      },
      spacing: { '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '24px', '6': '32px', '8': '48px' },
      borderRadius: { none: '0', sm: '2px', md: '4px', lg: '8px', full: '9999px' },
      shadows: { sm: '0 1px 2px rgba(0, 0, 0, 0.05)', md: '0 4px 6px rgba(0, 0, 0, 0.1)', lg: '0 10px 15px rgba(0, 0, 0, 0.1)' }
    }
  },
  {
    id: 'ant-farm',
    name: 'Ant Farm',
    description: 'Warm corporate design with coral accent',
    tokens: {
      colors: {
        primary: '#D4674A',
        primaryHover: '#C25A3E',
        secondary: '#A78BFA',
        text: '#1A1A1A',
        textSecondary: '#6B7280',
        background: '#FFFFFF',
        surface: '#F9FAFB',
        border: '#E5E7EB',
        borderLight: '#F3F4F6',
        focus: 'rgba(212, 103, 74, 0.4)',
        error: '#DC2626',
        warning: '#D97706',
        success: '#059669',
        info: '#2563EB'
      },
      typography: {
        fontFamilies: {
          heading: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          body: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          mono: 'SF Mono, Monaco, Consolas, monospace'
        },
        fontSizes: {
          xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px', '3xl': '32px'
        }
      },
      spacing: { '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '24px', '6': '32px', '8': '48px' },
      borderRadius: { none: '0', sm: '4px', md: '8px', lg: '12px', full: '9999px' },
      shadows: { sm: '0 1px 3px rgba(0, 0, 0, 0.08)', md: '0 4px 8px rgba(0, 0, 0, 0.12)', lg: '0 12px 24px rgba(0, 0, 0, 0.15)' }
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Dark theme with blue accent',
    tokens: {
      colors: {
        primary: '#3B82F6',
        primaryHover: '#2563EB',
        secondary: '#6B7280',
        text: '#F3F4F6',
        textSecondary: '#9CA3AF',
        background: '#111827',
        surface: '#1F2937',
        border: '#374151',
        borderLight: '#4B5563',
        focus: 'rgba(59, 130, 246, 0.5)',
        error: '#F87171',
        warning: '#FBBF24',
        success: '#34D399',
        info: '#60A5FA'
      },
      typography: {
        fontFamilies: {
          heading: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          body: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          mono: 'SF Mono, Monaco, Cascadia Code, Consolas, monospace'
        },
        fontSizes: {
          xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px', '3xl': '30px'
        }
      },
      spacing: { '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '24px', '6': '32px', '8': '48px' },
      borderRadius: { none: '0', sm: '2px', md: '4px', lg: '8px', full: '9999px' },
      shadows: { sm: '0 1px 2px rgba(0, 0, 0, 0.3)', md: '0 4px 6px rgba(0, 0, 0, 0.4)', lg: '0 10px 15px rgba(0, 0, 0, 0.5)' }
    }
  }
];

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
      // Load default themes
      this.themes = DEFAULT_THEMES.map(theme => {
        const now = new Date().toISOString();
        return {
          ...theme,
          createdAt: now,
          updatedAt: now,
          cssVariables: this.generateCssVariables(theme.tokens),
          componentStyles: this.generateComponentStyles(),
          version: 1
        };
      });
      this.activeThemeId = this.themes[0].id;
      this.save();
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
