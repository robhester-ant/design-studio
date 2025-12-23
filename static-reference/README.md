# kdiff Design System Template

A complete, portable design system for building clean, minimalist web applications. Inspired by Zed.dev's aesthetic.

## 📦 What's Included

```
design-system-template/
├── README.md                      (this file)
├── kdiff-design-system.css       (complete stylesheet - 771 lines)
├── DESIGN_SYSTEM.md              (design tokens & component docs)
├── components-reference.html     (visual component library)
└── IMPLEMENTATION_GUIDE.md       (step-by-step integration)
```

## 🚀 Quick Start (30 seconds)

1. **Copy the CSS:**
   ```bash
   cp kdiff-design-system.css /your-project/css/
   ```

2. **Link it:**
   ```html
   <link rel="stylesheet" href="/css/kdiff-design-system.css">
   ```

3. **Use it:**
   ```html
   <div class="container">
     <h1>Your App</h1>
     <button id="compareBtn">Get Started</button>
   </div>
   ```

That's it! Open `components-reference.html` to see all available components.

## 📖 Documentation

| File | Purpose |
|------|---------|
| **DESIGN_SYSTEM.md** | Design tokens, color palette, typography, spacing scale, component documentation |
| **components-reference.html** | Visual examples of all components - open in browser |
| **IMPLEMENTATION_GUIDE.md** | Step-by-step integration instructions, code examples, troubleshooting |

## 🎨 Design Highlights

- **Colors:** Blue primary (#0751CF), clean gray text, off-white background
- **Typography:** Lora for headings (elegant serif), system fonts for body (fast & familiar)
- **Spacing:** Consistent 4px scale (4, 8, 12, 16, 24, 32px)
- **Components:** 15+ pre-built components with consistent styling
- **Responsive:** Mobile-first with 768px breakpoint
- **Accessible:** WCAG AA compliant, keyboard navigation, focus states

## 🧩 Component Library

✅ Buttons (primary & secondary)
✅ Form inputs (text, textarea, select)
✅ Toggle switches
✅ File upload areas
✅ Notifications (info, error, warning)
✅ Modal dialogs
✅ Diff highlighting
✅ Layout grids
✅ Advanced options panels
✅ File info displays

See `components-reference.html` for visual examples and copy-paste HTML.

## 💻 Usage with Claude Code

This design system was created specifically to be portable and easy to implement with Claude Code assistance.

### Prompt Template:

```
I have a design system in the design-system-template/ folder.
Please apply it to this project:

1. Copy kdiff-design-system.css to the appropriate location
2. Update HTML to use the design system patterns
3. Reference components-reference.html for HTML examples
4. Follow guidelines in IMPLEMENTATION_GUIDE.md

Key principles:
- Minimalist with generous whitespace
- Primary color: #0751CF (blue)
- Lora font for headings
- 4px spacing scale

Maintain existing functionality while updating styling.
```

### Example Requests:

**"Convert my login form to use the kdiff design system"**
Claude will reference the form patterns and apply consistent styling.

**"Add a notification system using the design system"**
Claude will implement the notification component with proper classes.

**"Make my dashboard responsive using the design system grid"**
Claude will apply the layout patterns and responsive breakpoints.

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Perfect For

- Developer tools
- SaaS dashboards
- Document processors
- Comparison tools
- Settings panels
- Admin interfaces
- Any professional web app

## 🔧 Customization

### Change Primary Color:

Edit the CSS file or add overrides:

```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-primary-hover: #DARKER_SHADE;
}
```

### Add Custom Components:

Follow the design token pattern:

```css
.my-component {
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}
```

### Adjust Spacing:

All spacing uses CSS variables - change in one place:

```css
:root {
  --space-4: 20px;  /* was 16px */
}
```

## 📋 Implementation Checklist

- [ ] Copy `kdiff-design-system.css` to your project
- [ ] Link stylesheet in HTML `<head>`
- [ ] Review `components-reference.html` for component examples
- [ ] Update HTML to use design system classes/patterns
- [ ] Test keyboard navigation and focus states
- [ ] Verify mobile responsiveness (< 768px)
- [ ] Check color contrast ratios
- [ ] Remove old CSS that conflicts

See `IMPLEMENTATION_GUIDE.md` for detailed instructions.

## 🎓 Learning Resources

1. **Start with:** `components-reference.html` - visual overview
2. **Then read:** `DESIGN_SYSTEM.md` - understand the system
3. **When implementing:** `IMPLEMENTATION_GUIDE.md` - step-by-step
4. **For reference:** `kdiff-design-system.css` - source code

## 🤝 Contributing

This is a template extracted from the kdiff project. Feel free to:
- Customize for your needs
- Add new components following existing patterns
- Adjust colors/spacing to match your brand
- Extend with additional features

## 📄 License

Free to use for any purpose. Attribution appreciated but not required.

## 🙏 Credits

- Design inspiration: [Zed.dev](https://zed.dev)
- Heading font: Lora by Cyreal (Google Fonts)
- Created for: kdiff document comparison tool
- Extracted: 2025-01-25

## 💡 Tips

**Viewing Examples:** Open `components-reference.html` in your browser to see all components with live interactions.

**Quick Test:** Create a new HTML file with just the stylesheet link and a button to verify it works.

**IDE Integration:** Most modern IDEs will autocomplete the CSS class names after importing the stylesheet.

**Design Tokens:** Use CSS variables (`var(--color-primary)`) instead of hard-coded values for consistency.

**Mobile First:** All components are mobile-responsive by default - test on small screens!

---

**Ready to use!** Start with `components-reference.html` and copy the patterns you need.
