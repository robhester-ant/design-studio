# Quick Reference Card

One-page cheat sheet for the kdiff Design System.

## CSS Variables (Design Tokens)

```css
/* Colors */
var(--color-primary)       /* #0751CF - Blue */
var(--color-text)          /* #4C5461 - Gray */
var(--color-background)    /* #FAF9F7 - Off-white */
var(--color-border)        /* #DEDDD solid B - Light gray */
var(--color-white)         /* #FFFFFF */

/* Typography */
var(--font-heading)        /* Lora, serif */
var(--font-body)           /* System fonts */
var(--font-mono)           /* SF Mono, Monaco */

/* Font Sizes */
var(--text-xs)             /* 14px */
var(--text-sm)             /* 16px */
var(--text-base)           /* 16px */
var(--text-lg)             /* 18.72px */
var(--text-xl)             /* 24px */
var(--text-2xl)            /* 32px */

/* Spacing */
var(--space-1)             /* 4px */
var(--space-2)             /* 8px */
var(--space-3)             /* 12px */
var(--space-4)             /* 16px */
var(--space-5)             /* 24px */
var(--space-6)             /* 32px */

/* Other */
var(--radius-sm)           /* 4px */
var(--transition-fast)     /* 0.075s */
var(--color-focus)         /* rgba(9, 78, 206, 0.5) */
```

## Common HTML Patterns

### Container
```html
<div class="container"><!-- content --></div>
```

### Primary Button
```html
<button id="primaryBtn">Action</button>
```

### Secondary Button
```html
<button>Action</button>
```

### Text Input
```html
<label>Label</label>
<input type="text" placeholder="...">
```

### Textarea
```html
<label>Label</label>
<textarea placeholder="..."></textarea>
```

### Select
```html
<label>Label</label>
<select><option>...</option></select>
```

### Toggle Switch
```html
<label class="toggle-switch">
  <input type="checkbox">
  <span class="toggle-slider"></span>
  <span class="toggle-label">Text</span>
</label>
```

### Button Group
```html
<div class="actions-middle">
  <button>One</button>
  <button>Two</button>
</div>
```

### File Upload
```html
<div class="textarea-container">
  <div class="file-upload-hint">
    <span class="hint-text">Drag or Browse</span>
    <button class="browse-btn">Browse</button>
  </div>
  <textarea placeholder="..."></textarea>
</div>
```

### File Info
```html
<div class="file-info">
  <span class="file-name">file.docx</span>
  <button class="remove-file">×</button>
</div>
```

### Notification
```html
<div id="notification" class="notification"></div>

<script>
function show(msg, type) {
  const n = document.getElementById('notification');
  n.textContent = msg;
  n.className = `notification ${type}`;
  setTimeout(() => n.classList.add('show'), 10);
  setTimeout(() => n.classList.remove('show'), 3000);
}
</script>
```

### Modal
```html
<div id="modal" class="modal">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Title</h2>
      <button class="close-modal-btn">×</button>
    </div>
    <div class="modal-body">Content</div>
  </div>
</div>
```

### Two-Column Layout
```html
<div class="text-inputs horizontal">
  <div class="text-input">...</div>
  <div class="text-input">...</div>
</div>
```

### Advanced Options
```html
<div class="advanced-options">
  <h3>Settings</h3>
  <div class="select-group">
    <select>...</select>
  </div>
  <div class="toggle-group">
    <label class="toggle-switch">...</label>
  </div>
</div>
```

## Diff Highlighting

```html
<span class="deletion">deleted</span>
<span class="insertion">inserted</span>
<span class="moved-from">from</span>
<span class="moved-to">to</span>
```

## Notification Types

```javascript
showNotification('Message');              // info (blue)
showNotification('Error', 'error');       // red
showNotification('Warning', 'warning');   // orange
```

## Primary Button IDs

Auto-styled as primary (blue):
- `compareBtn`
- `copyToClipboardBtn`
- `copyMarkdownBtn`
- `downloadOutputBtn`

Or add your own: `#myBtn { background-color: var(--color-primary); color: white; }`

## Spacing Examples

```css
padding: var(--space-2);           /* 8px */
margin: var(--space-4);            /* 16px */
gap: var(--space-3);               /* 12px */
margin-bottom: var(--space-5);     /* 24px */
```

## Typography Examples

```css
font-size: var(--text-xs);        /* Small text */
font-size: var(--text-base);      /* Body text */
font-size: var(--text-xl);        /* Section header */
font-family: var(--font-heading); /* Headings */
font-family: var(--font-mono);    /* Code */
```

## Focus State

All interactive elements get automatic focus outline:
- 3px solid blue
- 2px offset
- Visible when tabbing

Don't remove: `outline: none` ❌

## Mobile Breakpoint

```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

Automatic changes at 768px:
- Single column layouts
- Full-width buttons
- Reduced padding
- Stacked toggles

## Common Customizations

### Change Primary Color
```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-primary-hover: #DARKER;
}
```

### Adjust Spacing
```css
:root {
  --space-4: 20px; /* was 16px */
}
```

### Custom Component
```css
.my-component {
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}
```

## Accessibility Reminders

✅ Use semantic HTML (`<button>` not `<div onclick>`)
✅ Add labels to form inputs
✅ Keep focus outlines visible
✅ Test keyboard navigation (Tab key)
✅ Ensure 44x44px touch targets on mobile
✅ Use ARIA labels when needed

## Common Pitfalls

❌ Removing focus outlines
❌ Hard-coding colors instead of using variables
❌ Not testing on mobile
❌ Missing labels on form inputs
❌ Using `<div>` instead of `<button>`

## File Structure

```
your-project/
├── css/
│   ├── kdiff-design-system.css  ← copy here
│   └── custom-overrides.css     ← optional
└── index.html
    └── <link rel="stylesheet" href="css/kdiff-design-system.css">
```

## Testing Checklist

- [ ] Desktop browser (Chrome, Firefox, Safari)
- [ ] Mobile browser (iOS, Android)
- [ ] Keyboard navigation (Tab through all elements)
- [ ] Focus states visible
- [ ] Responsive at < 768px
- [ ] Touch targets sized properly
- [ ] Color contrast passes WCAG AA

## Resources

- **Visual examples:** components-reference.html
- **Full docs:** DESIGN_SYSTEM.md
- **Integration guide:** IMPLEMENTATION_GUIDE.md
- **Starter:** starter-template.html
- **This card:** QUICK_REFERENCE.md

---

**Pro Tip:** Keep this file open while coding for quick copy-paste access to common patterns!
