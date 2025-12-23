# Design Studio

A design system studio where you collaborate with Claude AI to create, refine, and export UI themes. **No npm required** - just open `index.html` in your browser.

## Features

- **Claude Integration**: Chat with Claude to refine your design system. Share screenshots and URLs for inspiration.
- **Live Preview**: See your components update in real-time as you edit design tokens.
- **Code Editor**: Edit CSS variables, component styles, and design tokens with Monaco Editor.
- **Theme Library**: Manage multiple design systems, create new themes, and switch between them.
- **No Build Required**: Pure HTML/CSS/JavaScript - works by opening the file directly.

## Quick Start

### Option 1: Open Locally
Just open `index.html` in your browser. That's it!

### Option 2: Serve Locally (for full features)
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .

# Then open http://localhost:8000
```

### Option 3: Google Apps Script
This app can be deployed as a Google Apps Script web app. See [Google Apps Script Deployment](#google-apps-script-deployment) below.

## Setting Up Claude

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Click the key icon in the chat panel
3. Enter your API key (stored locally in your browser)

## Project Structure

```
design-studio/
├── index.html           # Main application
├── css/
│   └── styles.css       # All styles
├── js/
│   ├── themes.js        # Theme store and management
│   ├── claude.js        # Claude API integration
│   ├── editor.js        # Monaco Editor wrapper
│   ├── preview.js       # Component preview
│   └── app.js           # Main application logic
└── static-reference/    # Original design system files
```

## How It Works

1. **Create a Theme**: Click the + button in the sidebar
2. **Edit Tokens**: Use the code editor to modify design tokens, CSS variables, or component styles
3. **Preview Components**: See buttons, inputs, cards, and typography update in real-time
4. **Chat with Claude**: Ask for design suggestions, share screenshots for inspiration
5. **Apply Changes**: Claude's suggestions include "Apply" buttons to instantly update your theme

## Google Apps Script Deployment

To deploy as a Google Apps Script web app:

1. Create a new Google Apps Script project
2. Copy the contents of `index.html` into a new HTML file
3. Inline the CSS and JavaScript files
4. Create a `Code.gs` with:

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Design Studio')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

5. Deploy as a web app

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT
