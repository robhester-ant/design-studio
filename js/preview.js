// Preview Panel Manager

const PreviewManager = {
  currentCategory: 'buttons',
  currentViewport: 'desktop',
  frame: null,

  viewportWidths: {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  },

  init() {
    this.frame = document.getElementById('preview-frame');

    // Subscribe to theme changes
    ThemeStore.subscribe(() => {
      this.updatePreview();
    });

    this.updatePreview();
  },

  setCategory(category) {
    this.currentCategory = category;
    this.updatePreview();
  },

  setViewport(viewport) {
    this.currentViewport = viewport;
    this.frame.style.width = this.viewportWidths[viewport];
  },

  updatePreview() {
    const theme = ThemeStore.getActiveTheme();
    const html = this.generatePreviewHtml(
      this.currentCategory,
      theme?.cssVariables || '',
      theme?.componentStyles || ''
    );
    this.frame.srcdoc = html;
  },

  generatePreviewHtml(category, cssVariables, componentStyles) {
    const styles = `
      ${cssVariables}
      ${componentStyles}
      body {
        font-family: var(--font-body, system-ui, sans-serif);
        padding: 24px;
        background: var(--color-background, #FAF9F7);
        color: var(--color-text, #4C5461);
        margin: 0;
      }
      .preview-section {
        margin-bottom: 24px;
      }
      .preview-section h3 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: var(--text-lg, 18px);
        margin: 0 0 12px 0;
      }
      .preview-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        align-items: center;
      }
    `;

    const content = this.getCategoryContent(category);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&display=swap" rel="stylesheet">
          <style>${styles}</style>
        </head>
        <body>${content}</body>
      </html>
    `;
  },

  getCategoryContent(category) {
    switch (category) {
      case 'buttons':
        return `
          <div class="preview-section">
            <h3>Primary Buttons</h3>
            <div class="preview-row">
              <button class="btn btn-primary">Primary</button>
              <button class="btn btn-primary" disabled>Disabled</button>
            </div>
          </div>
          <div class="preview-section">
            <h3>Secondary Buttons</h3>
            <div class="preview-row">
              <button class="btn btn-secondary">Secondary</button>
              <button class="btn btn-secondary" disabled>Disabled</button>
            </div>
          </div>
        `;

      case 'inputs':
        return `
          <div class="preview-section">
            <h3>Text Inputs</h3>
            <div class="preview-row">
              <input type="text" class="input" placeholder="Enter text..." />
              <input type="text" class="input" value="With value" />
            </div>
          </div>
          <div class="preview-section">
            <h3>Search Input</h3>
            <div class="preview-row">
              <input type="search" class="input" placeholder="Search..." style="width: 250px" />
            </div>
          </div>
        `;

      case 'cards':
        return `
          <div class="preview-section">
            <h3>Cards</h3>
            <div class="preview-row">
              <div class="card" style="width: 280px">
                <h4 style="margin: 0 0 8px 0; font-family: var(--font-heading);">Card Title</h4>
                <p style="margin: 0; font-size: var(--text-sm);">This is a card component with some example content.</p>
              </div>
              <div class="card" style="width: 280px">
                <h4 style="margin: 0 0 8px 0; font-family: var(--font-heading);">Another Card</h4>
                <p style="margin: 0; font-size: var(--text-sm);">Cards can contain various types of content.</p>
              </div>
            </div>
          </div>
        `;

      case 'typography':
        return `
          <div class="preview-section">
            <h1 style="font-family: var(--font-heading); font-size: var(--text-3xl); margin: 0 0 8px 0;">Heading 1</h1>
            <h2 style="font-family: var(--font-heading); font-size: var(--text-2xl); margin: 0 0 8px 0;">Heading 2</h2>
            <h3 style="font-family: var(--font-heading); font-size: var(--text-xl); margin: 0 0 8px 0;">Heading 3</h3>
            <p style="font-size: var(--text-base); margin: 16px 0;">Body text in the base size. This is how regular paragraph text will appear in your design system.</p>
            <p style="font-size: var(--text-sm); color: var(--color-text-secondary);">Small text for captions and secondary information.</p>
            <p style="margin-top: 16px;">
              <code style="font-family: var(--font-mono); background: var(--color-border-light); padding: 2px 6px; border-radius: 4px;">code example</code>
            </p>
          </div>
        `;

      default:
        return '<p>Select a category</p>';
    }
  }
};
