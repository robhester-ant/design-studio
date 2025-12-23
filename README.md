# go/robo-design

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

### Prerequisites
- Node.js (for clasp CLI)
- `npm install -g @google/clasp`
- Enable Apps Script API: https://script.google.com/home/usersettings

### Setup Steps

1. **Authenticate clasp:**
   ```bash
   clasp login
   ```

2. **Create Apps Script project:**
   ```bash
   clasp create --title "go/robo-design" --type standalone
   ```
   This updates `.clasp.json` with your script ID.

3. **Build the bundled HTML:**
   ```bash
   ./build-apps-script.sh
   ```

4. **Push to Apps Script:**
   ```bash
   clasp push
   ```

5. **Create initial deployment:**
   ```bash
   clasp deploy --description "Initial deployment"
   ```
   Save the Deployment ID (starts with `AKfycb...`).

6. **Access your web app:**
   ```
   https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   ```

### Automatic Deployment via GitHub Actions

1. Get your clasp credentials:
   ```bash
   cat ~/.clasprc.json
   ```

2. Add GitHub secrets at `https://github.com/YOUR_REPO/settings/secrets/actions`:
   - `CLASPRC_JSON`: Contents of ~/.clasprc.json
   - `DEPLOYMENT_ID`: Your deployment ID from step 5

3. Push to main branch - GitHub Actions will automatically deploy

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT
