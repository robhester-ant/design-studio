# Implementation Guide

Step-by-step instructions for applying the kdiff Design System to a new web application.

## Quick Start (5 minutes)

### 1. Copy the CSS File

Copy `kdiff-design-system.css` to your project's CSS directory.

```bash
cp kdiff-design-system.css /your-project/assets/css/
```

### 2. Link in Your HTML

Add this to your `<head>` section:

```html
<link rel="stylesheet" href="/assets/css/kdiff-design-system.css">
```

### 3. Update Your HTML Structure

Wrap your content in a container:

```html
<body>
  <div class="container">
    <!-- Your content here -->
  </div>
</body>
```

### 4. Test It

Open `components-reference.html` in a browser to see all available components and copy the HTML patterns you need.

## Detailed Integration

### Step 1: Set Up Base HTML

Replace your existing `<head>` section with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your App Name</title>
  <link rel="stylesheet" href="/assets/css/kdiff-design-system.css">
</head>
<body>
  <div class="container">
    <!-- Your content -->
  </div>
</body>
</html>
```

### Step 2: Replace Existing Components

#### Before (generic button):
```html
<button class="btn btn-primary" style="background: blue;">Submit</button>
```

#### After (design system):
```html
<button id="submitBtn">Submit</button>
```

The styling is automatic! Primary buttons are styled via ID or class.

### Step 3: Update Form Elements

#### Old Way:
```html
<label for="email">Email:</label>
<input id="email" type="text" class="form-control">
```

#### New Way:
```html
<label>Email</label>
<input type="text" placeholder="Enter your email...">
```

No classes needed - the stylesheet handles it!

### Step 4: Add Interactive Components

#### Toggle Switches:
```html
<label class="toggle-switch">
  <input type="checkbox" id="darkMode">
  <span class="toggle-slider"></span>
  <span class="toggle-label">Dark Mode</span>
</label>
```

#### File Upload Areas:
```html
<div class="textarea-container">
  <div class="file-upload-hint">
    <span class="hint-text">Drag file here or click Browse</span>
    <button class="browse-btn">Browse</button>
  </div>
  <textarea placeholder="Or paste content..."></textarea>
</div>
```

### Step 5: Implement Notifications

Add this to your HTML (hidden by default):

```html
<div id="notification" class="notification"></div>
```

Show notifications with JavaScript:

```javascript
function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;

  // Show
  setTimeout(() => notification.classList.add('show'), 10);

  // Hide after 3 seconds
  setTimeout(() => notification.classList.remove('show'), 3000);
}

// Usage:
showNotification('Changes saved!');
showNotification('Error occurred', 'error');
showNotification('Warning message', 'warning');
```

### Step 6: Add Modal Dialogs

HTML structure:

```html
<div id="myModal" class="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Modal Title</h2>
      <button class="close-modal-btn" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <p>Modal content goes here</p>
    </div>
  </div>
</div>
```

JavaScript to control:

```javascript
function openModal() {
  document.getElementById('myModal').classList.add('show');
}

function closeModal() {
  document.getElementById('myModal').classList.remove('show');
}

// Close on backdrop click
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
```

### Step 7: Customize Colors (Optional)

To adjust colors for your brand, modify the CSS custom properties:

```css
:root {
  --color-primary: #0751CF;      /* Change to your brand color */
  --color-primary-hover: #094ACE;
  --color-heading: #094ACE;
}
```

Or create a separate file `custom-overrides.css`:

```html
<link rel="stylesheet" href="/assets/css/kdiff-design-system.css">
<link rel="stylesheet" href="/assets/css/custom-overrides.css">
```

## Common Patterns

### Form Layout

```html
<form>
  <label>Name</label>
  <input type="text" placeholder="Enter your name...">

  <label>Email</label>
  <input type="email" placeholder="Enter your email...">

  <label>Message</label>
  <textarea placeholder="Enter your message..."></textarea>

  <div class="actions-middle">
    <button type="submit" id="submitBtn">Send Message</button>
    <button type="button">Cancel</button>
  </div>
</form>
```

### Settings Panel

```html
<div class="advanced-options">
  <h3>Preferences</h3>

  <label>Theme</label>
  <select>
    <option>Light</option>
    <option>Dark</option>
  </select>

  <div class="toggle-group">
    <label class="toggle-switch">
      <input type="checkbox" checked>
      <span class="toggle-slider"></span>
      <span class="toggle-label">Enable notifications</span>
    </label>

    <label class="toggle-switch">
      <input type="checkbox">
      <span class="toggle-slider"></span>
      <span class="toggle-label">Auto-save</span>
    </label>
  </div>
</div>
```

### Two-Panel Layout

```html
<div class="text-inputs horizontal">
  <div class="text-input">
    <label>Before</label>
    <textarea placeholder="Original content..."></textarea>
  </div>
  <div class="text-input">
    <label>After</label>
    <textarea placeholder="Modified content..."></textarea>
  </div>
</div>
```

### Action Bar

```html
<div class="actions-middle">
  <button id="primaryAction">Save</button>
  <button>Export</button>
  <button>Share</button>
  <button>Help</button>
</div>
```

## Button Styling Rules

The design system automatically styles buttons based on their ID or position:

**Primary Buttons** (blue background):
- IDs: `compareBtn`, `copyToClipboardBtn`, `copyMarkdownBtn`, `downloadOutputBtn`
- Or add to the list in CSS: `#yourBtnId { background-color: var(--color-primary); }`

**Secondary Buttons** (transparent, bordered):
- All other buttons by default

To make any button primary, give it one of the recognized IDs or add a CSS rule.

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus outlines are visible (don't remove them!)
- [ ] Color is not the only way to convey information
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Form inputs have associated labels
- [ ] Images have alt text
- [ ] Use semantic HTML (`<button>` not `<div onclick>`)

## Mobile Responsiveness

The design system handles mobile automatically at 768px breakpoint:

- Single-column layouts
- Full-width buttons
- Reduced padding
- Stacked toggle groups

Test on mobile devices or use browser dev tools (Cmd+Opt+M in Chrome).

## Troubleshooting

### Buttons look wrong
**Issue:** Buttons don't have the blue primary style
**Fix:** Check if your button has an ID like `compareBtn` or add it to the CSS primary button list

### Focus outlines don't show
**Issue:** Can't see focus states when tabbing
**Fix:** Make sure you haven't disabled outlines in other CSS: remove `outline: none` declarations

### Fonts don't load
**Issue:** Lora font not appearing for headings
**Fix:** Check internet connection - font loads from Google Fonts CDN

### Layout breaks on mobile
**Issue:** Content overflows or doesn't stack
**Fix:** Ensure you're using `.text-inputs.horizontal` wrapper and `.container` class

### Colors don't match
**Issue:** Colors look different from examples
**Fix:** Check for conflicting CSS - make sure kdiff-design-system.css loads last

## Claude Code Integration

When asking Claude Code to implement this design system in a new project:

### Prompt Template:

```
I have a design system I'd like you to implement in this project.

The design system files are in: design-system-template/

Key files:
- kdiff-design-system.css (main stylesheet)
- DESIGN_SYSTEM.md (documentation)
- components-reference.html (visual examples)
- IMPLEMENTATION_GUIDE.md (integration instructions)

Please:
1. Copy kdiff-design-system.css to the appropriate location in this project
2. Update the HTML files to use the design system patterns
3. Replace existing buttons, forms, and components with design system equivalents
4. Maintain the existing functionality while updating the styling
5. Ensure the application is responsive and accessible

Design system principles:
- Minimalist with generous whitespace
- Lora font for headings, system fonts for body
- Primary color: #0751CF (blue)
- 4px spacing scale
- Fast transitions (0.075s)

Please review components-reference.html for HTML patterns and DESIGN_SYSTEM.md for token values.
```

### Example Request:

```
Update the login form to use the kdiff design system:
- Use the form input styles
- Primary button for "Login"
- Toggle switch for "Remember me"
- Follow the spacing and typography guidelines from DESIGN_SYSTEM.md
```

## Next Steps

1. Review `components-reference.html` in a browser
2. Identify which components your app needs
3. Copy HTML patterns from the reference
4. Customize colors if needed
5. Test keyboard navigation
6. Test on mobile devices

## Support

For questions or issues with this design system:
- Review the DESIGN_SYSTEM.md documentation
- Check components-reference.html for visual examples
- Inspect browser developer tools to see applied styles

## Version Notes

This design system is extracted from kdiff v1.0 and is production-ready for:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive layouts
- Accessibility requirements (WCAG AA)
