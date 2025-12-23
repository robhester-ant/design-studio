# go/robo-design - Claude Code Instructions

## Environment Constraints

**IMPORTANT: Do NOT run npm/yarn/pnpm install or any package manager installation commands.**
- This is a vanilla HTML/CSS/JS project with no build step
- All dependencies are loaded from CDN
- The user will open index.html directly in a browser

## Project Overview

This is a design system studio application for creating and refining design systems with Claude AI assistance. It runs entirely in the browser with no server required.

## Tech Stack

- **Vanilla HTML/CSS/JavaScript** - No framework, no build step
- **Monaco Editor** - Loaded from CDN
- **Claude API** - Direct browser calls with `anthropic-dangerous-direct-browser-access` header
- **LocalStorage** - For persisting themes and messages

## Project Structure

```
index.html              # Main application file
css/
  styles.css            # All application styles
js/
  themes.js             # Theme store (CRUD, CSS generation)
  claude.js             # Claude API integration
  editor.js             # Monaco Editor wrapper
  preview.js            # Component preview manager
  app.js                # Main application logic
static-reference/       # Original design system reference files
```

## Key Files

- `js/themes.js` - ThemeStore object managing theme CRUD and CSS generation
- `js/claude.js` - ClaudeAPI object for chat integration
- `js/app.js` - Main App object coordinating UI

## Design Principles

Follow the zed.dev-inspired aesthetic:
- Minimalist with plenty of whitespace
- Primary blue: `#0751CF`
- Typography: Lora for headings, system fonts for body
- Spacing: multiples of 4px
- Accessible: focus states, keyboard navigation

## Deployment Options

1. **Local**: Open index.html directly in browser
2. **Static Hosting**: Upload files to any static host
3. **Google Apps Script**: Can be deployed as a web app via doGet()
