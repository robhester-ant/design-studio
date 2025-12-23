# kdiff Design System Template

A clean, minimalist design system inspired by Zed.dev, ready to be implemented in any web application.

## Overview

This design system emphasizes:
- **Minimalist aesthetics** with plenty of whitespace
- **Typography-first** approach using Lora for headings
- **Accessible** with proper focus states and ARIA support
- **Consistent** design tokens and spacing system
- **Professional** look suitable for developer tools

## Design Tokens

### Color Palette

```css
Primary Blue:    #0751CF (rgb(7, 81, 207))
Primary Hover:   #094ACE (rgb(9, 74, 206))
Text Gray:       #4C5461 (rgb(76, 84, 97))
Heading Blue:    #094ACE (rgb(9, 74, 206))
Background:      #FAF9F7 (rgb(250, 249, 247))
Border:          #DEDDD solid B (rgb(222, 221, 219))
Border Light:    rgba(7, 74, 207, 0.15)
White:           #FFFFFF (rgb(255, 255, 255))
```

### Typography

**Fonts:**
- Headings: `Lora` (serif) - elegant, readable
- Body: System fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI'`)
- Mono: `SF Mono, Monaco, Cascadia Code`

**Sizes:**
- XS: 14px (labels, small text)
- SM/Base: 16px (body text)
- LG: 18.72px (subheadings)
- XL: 24px (section headers)
- 2XL: 32px (page titles)

### Spacing Scale

Based on 4px increments:
- Space 1: 4px
- Space 2: 8px
- Space 3: 12px
- Space 4: 16px
- Space 5: 24px
- Space 6: 32px

### Other Tokens

- **Border Radius:** 4px (subtle, modern)
- **Transitions:** 0.075s cubic-bezier (fast, smooth)
- **Focus Outline:** 3px solid rgba(9, 78, 206, 0.5)

## Components

### 1. Buttons

**Primary Button** - Main actions (submit, save, compare)
```html
<button class="btn-primary">Compare Documents</button>
```
- Background: Primary blue
- White text
- Hover: Slightly darker blue

**Secondary Button** - Supporting actions
```html
<button class="btn-secondary">Cancel</button>
```
- Transparent background
- Gray border
- Hover: White background

### 2. Form Elements

**Text Input**
```html
<label>Label Text</label>
<input type="text" placeholder="Enter text...">
```

**Textarea**
```html
<label>Description</label>
<textarea placeholder="Enter description..."></textarea>
```

**Select Dropdown**
```html
<label>Choose Option</label>
<select>
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

Features:
- Focus: Blue border + subtle shadow
- 8px vertical padding, 12px horizontal
- White background
- Smooth transitions

### 3. Toggle Switch

```html
<label class="toggle-switch">
  <input type="checkbox">
  <span class="toggle-slider"></span>
  <span class="toggle-label">Enable feature</span>
</label>
```

- 38px wide, 20px tall
- Animated slide transition
- Blue when active

### 4. File Upload Area

```html
<div class="textarea-container">
  <div class="file-upload-hint">
    <span class="hint-text">Drag file here or click Browse</span>
    <button class="browse-btn">Browse</button>
  </div>
  <textarea placeholder="Or paste text..."></textarea>
</div>
```

Features:
- Drag & drop overlay
- Browse button integrated into hint bar
- Seamless design with textarea

### 5. Notifications

```html
<div class="notification show">Message text</div>
```

Types:
- Default (info): Blue
- Error: Red
- Warning: Orange
- Success: Green

Position: Fixed top-right

### 6. Modal Dialog

```html
<div class="modal show">
  <div class="modal-backdrop"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2>Modal Title</h2>
      <button class="close-modal-btn">×</button>
    </div>
    <div class="modal-body">
      Content here
    </div>
  </div>
</div>
```

Features:
- Semi-transparent backdrop
- Centered, max-width 800px
- Scrollable body
- Smooth animations

### 7. Diff Highlighting

For text comparison features:

```html
<span class="deletion">Deleted text</span>
<span class="insertion">Inserted text</span>
<span class="moved-from">Moved from here</span>
<span class="moved-to">Moved to here</span>
```

Colors:
- Deletion: Red with strikethrough
- Insertion: Blue with underline
- Moved: Green with italic

## Layout Patterns

### Container
```html
<div class="container">
  <!-- Max-width 1200px, centered, responsive padding -->
</div>
```

### Two-Column Layout
```html
<div class="text-inputs horizontal">
  <div class="text-input">Column 1</div>
  <div class="text-input">Column 2</div>
</div>
```

### Button Groups
```html
<div class="actions-middle">
  <button>Action 1</button>
  <button>Action 2</button>
  <button>Action 3</button>
</div>
```

## Accessibility Guidelines

1. **Focus States:** All interactive elements have visible focus outlines
2. **Color Contrast:** Text meets WCAG AA standards
3. **Keyboard Navigation:** Logical tab order, no keyboard traps
4. **Screen Readers:** Use semantic HTML and ARIA labels
5. **Touch Targets:** Minimum 44x44px for mobile

## Responsive Breakpoints

- **Mobile:** < 768px
  - Single column layouts
  - Full-width buttons
  - Stacked toggle groups
  - Reduced padding

## Implementation Checklist

When applying this design system to a new project:

- [ ] Import Google Fonts (Lora)
- [ ] Include main CSS file
- [ ] Set up CSS custom properties
- [ ] Use semantic HTML structure
- [ ] Add focus states to all interactive elements
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Test on mobile devices
- [ ] Add smooth transitions to state changes

## Best Practices

1. **Whitespace:** Use generous spacing between sections
2. **Typography:** Limit to 2-3 font families maximum
3. **Colors:** Stick to the defined palette
4. **Consistency:** Use the same patterns throughout
5. **Performance:** Keep transitions fast (0.075s-0.15s)
6. **Feedback:** Provide visual feedback for all interactions

## Files in This Template

- `kdiff-design-system.css` - Complete stylesheet
- `DESIGN_SYSTEM.md` - This documentation
- `components-reference.html` - Visual component library
- `IMPLEMENTATION_GUIDE.md` - Step-by-step integration guide

## Credits

Design inspired by [Zed.dev](https://zed.dev)
Typography: Lora by Cyreal
System fonts for optimal performance
