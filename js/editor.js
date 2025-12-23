// Monaco Editor Integration

const EditorManager = {
  editor: null,
  currentTab: 'variables',
  listeners: [],

  async init() {
    // Configure Monaco loader
    require.config({
      paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
      }
    });

    // Load Monaco
    return new Promise((resolve) => {
      require(['vs/editor/editor.main'], () => {
        this.createEditor();
        resolve();
      });
    });
  },

  createEditor() {
    const container = document.getElementById('editor-container');
    if (!container) return;

    this.editor = monaco.editor.create(container, {
      value: this.getContent(),
      language: this.getLanguage(),
      theme: 'vs-dark',
      minimap: { enabled: false },
      fontSize: 13,
      lineNumbers: 'on',
      wordWrap: 'on',
      automaticLayout: true,
      padding: { top: 8 },
      scrollBeyondLastLine: false,
      tabSize: 2
    });

    // Handle content changes
    this.editor.onDidChangeModelContent(() => {
      this.handleContentChange();
    });

    // Subscribe to theme changes
    ThemeStore.subscribe(() => {
      this.updateContent();
    });
  },

  getContent() {
    const theme = ThemeStore.getActiveTheme();
    if (!theme) return '// No theme selected';

    switch (this.currentTab) {
      case 'tokens':
        return JSON.stringify(theme.tokens, null, 2);
      case 'variables':
        return theme.cssVariables;
      case 'components':
        return theme.componentStyles;
      default:
        return '';
    }
  },

  getLanguage() {
    switch (this.currentTab) {
      case 'tokens':
        return 'json';
      case 'variables':
      case 'components':
        return 'css';
      default:
        return 'plaintext';
    }
  },

  setTab(tab) {
    if (this.currentTab === tab) return;
    this.currentTab = tab;
    this.updateContent();
  },

  updateContent() {
    if (!this.editor) return;

    const content = this.getContent();
    const model = this.editor.getModel();

    if (model.getValue() !== content) {
      model.setValue(content);
    }

    monaco.editor.setModelLanguage(model, this.getLanguage());
  },

  handleContentChange() {
    const theme = ThemeStore.getActiveTheme();
    if (!theme) return;

    const value = this.editor.getValue();

    switch (this.currentTab) {
      case 'tokens':
        try {
          const tokens = JSON.parse(value);
          ThemeStore.updateTheme(theme.id, { tokens });
        } catch (e) {
          // Invalid JSON, don't update
        }
        break;
      case 'variables':
        ThemeStore.updateTheme(theme.id, { cssVariables: value });
        break;
      case 'components':
        ThemeStore.updateTheme(theme.id, { componentStyles: value });
        break;
    }
  },

  setTheme(themeName) {
    if (this.editor) {
      monaco.editor.setTheme(themeName);
    }
  },

  resize() {
    if (this.editor) {
      this.editor.layout();
    }
  }
};
