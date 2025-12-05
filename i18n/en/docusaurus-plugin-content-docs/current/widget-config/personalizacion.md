---
title: Visual Customization
description: Complete guide to customize the appearance and behavior of the AIFindr widget
slug: /widget-config/personalizacion
sidebar_position: 7
---

# Visual Customization

The AIFindr widget offers multiple customization options to adapt perfectly to your design and brand.

## Widget Configuration

Customization is done through the **project configuration** in your AIFindr dashboard, which is applied automatically without additional code.

### Display Modes

#### `displayMode: "overlay"` (Default)
Widget that occupies the full screen with a background overlay.

```html
<!-- Automatically adapts to fixed header -->
<header id="main-header">My Header</header>
<script
  src="https://hub.aifindr.ai/widget.js"
  data-client-id="YOUR_CLIENT_ID"
  defer
></script>
```

#### `displayMode: "floating"`
Floating widget in a corner of the screen.

## Available CSS Variables

### Header height variable

The `--ai-nav-height` variable controls the overlay offset for fixed headers:

```css
:root {
  /* Fixed height */
  --ai-nav-height: 64px;

  /* Dynamic calculation */
  --ai-nav-height: calc(60px + 1rem);

  /* Responsive */
  --ai-nav-height: clamp(60px, 8vh, 80px);
}
```

### Button customization variables

```css
.ai-findr-trigger-button {
  /* These properties are configured from the dashboard,
     but you can override them with CSS */

  --button-gap: 8px;
  --button-padding: 12px 16px;
  --button-border-radius: 8px;
  --button-background: #2563eb;
  --button-text-color: #ffffff;
  --button-border: 1px solid transparent;
  --button-font-size: 14px;
  --button-font-weight: 500;
  --button-box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## Trigger Types and Styles

### Button Trigger

The button has specific classes for customization:

```css
/* Base button */
.ai-findr-trigger-button {
  /* Base styles applied automatically */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity .2s ease, transform .2s ease;
}

/* Hover state */
.ai-findr-trigger-button:hover {
  opacity: 0.8; /* Configurable from dashboard */
}

/* State when widget is open */
.ai-findr-trigger-button.ai-findr-open {
  opacity: 0;
  transform: scale(.9);
  pointer-events: none;
}

/* Magnifier icon with sparkles */
.ai-magnifier {
  position: relative;
  width: 24px;
  height: 24px;
  color: inherit;
}

/* Animated sparkles */
.ai-magnifier::before,
.ai-magnifier::after {
  /* Stars that appear with animation */
  animation: bcp-animar-estrella-ia 2s cubic-bezier(.18,0.89,0.32,1.28) infinite;
}
```

### Input Trigger

For input-type triggers, these classes are automatically generated:

```css
/* Input container */
.ai-findr-trigger-input-container {
  display: inline-flex;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow .2s ease, border-color .2s ease;
}

.ai-findr-trigger-input-container:focus-within {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Icon inside input */
.ai-findr-trigger-icon {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

/* Text field */
.ai-findr-trigger-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
}

/* Submit button */
.ai-findr-trigger-submit {
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity .2s ease;
}
```

## Widget States

### Overlay/floating container states

```css
/* Hidden container */
#ai-findr-widget-overlay,
#ai-findr-floating-container {
  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease;
}

/* Visible container */
#ai-findr-widget-overlay.ai-findr-visible,
#ai-findr-floating-container.ai-findr-visible {
  opacity: 1;
  pointer-events: auto;
}

/* Specific floating container */
#ai-findr-floating-container {
  transform: translateY(20px);
  transition: all .3s ease;
}

#ai-findr-floating-container.ai-findr-visible {
  transform: translateY(0);
}
```

### Close button

```css
.ai-findr-close-button {
  opacity: 0;
  position: absolute;
  top: 15px;
  right: 20px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: scale .15s, opacity .25s ease;
}

.ai-findr-close-button:hover {
  scale: 1.1;
}

.ai-findr-visible .ai-findr-close-button {
  opacity: 1;
}
```

## Style Troubleshooting

### Common problems

```css
/* Problem: Styles not applying */
/* Solution: Increase specificity */
.ai-findr-trigger-button.ai-findr-trigger-button {
  background: #custom-color !important;
}

/* Problem: Conflicting animations */
/* Solution: Reset animations */
.ai-findr-trigger-button {
  animation: none;
}

/* Problem: z-index conflicts */
/* Solution: Ensure high z-index */
#ai-findr-widget-overlay {
  z-index: 2147483646 !important;
}

#ai-findr-floating-container {
  z-index: 2147483646 !important;
}
```

### Style debugging

```js
// View applied styles
const trigger = document.getElementById('ai-findr-trigger');
console.log('Computed styles:', getComputedStyle(trigger));

// View applied classes
console.log('Classes:', trigger.className);

// View widget state
console.log('Widget state:', AIFindrWidget.getState());
```

## Best Practices

1. **Consistency**: Maintain coherence with existing design
2. **Accessibility**: Ensure adequate contrast and visible focus
3. **Performance**: Avoid complex animations on mobile
4. **Responsive**: Test on different screen sizes
5. **Testing**: Verify in different browsers
6. **Fallbacks**: Provide fallback styles for older browsers
