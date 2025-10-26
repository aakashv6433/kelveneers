# Mobile UX Guidelines for Kelveneers

## Overview
This guide explains how to make hover-based interactions work intuitively on mobile devices.

## Key Principles

### 1. **Use `:active` for Tap Feedback**
Replace or supplement `:hover` with `:active` for instant visual feedback on mobile.

```css
/* ❌ Desktop-only */
.button:hover {
  background: #e06a55;
}

/* ✅ Mobile-friendly */
.button:hover {
  background: #e06a55;
}
.button:active {
  background: #d05945;
  transform: scale(0.95);
}
```

### 2. **Minimum Touch Target Size**
Ensure interactive elements are at least **44x44px** (Apple) or **48x48px** (Google) for comfortable tapping.

```html
<!-- ❌ Too small on mobile -->
<div class="w-7 h-7">...</div>

<!-- ✅ Better touch target -->
<div class="w-10 h-10 sm:w-12 sm:h-12">...</div>
```

### 3. **Visual Indicators for Tappable Elements**

#### A. Pulse Animations (as hints)
Use subtle animations to indicate interactivity, especially on first load:

```html
<!-- Pulse hint (disappears after interaction) -->
<div class="absolute inset-0 rounded-full bg-white/20 animate-ping md:hidden"></div>
```

#### B. Active State Styling
Show which item is currently selected:

```javascript
// Add visual feedback for active state
icon.classList.add("scale-110", "z-10", "ring-2", "ring-white");
```

### 4. **Touch Events with Fallbacks**

Always implement both touch and click events:

```javascript
// Touch event (primary for mobile)
element.addEventListener("touchstart", (e) => {
  e.preventDefault();
  handleInteraction();
});

// Click event (fallback + desktop)
element.addEventListener("click", (e) => {
  if (!isMobileDevice()) return;
  handleInteraction();
});
```

### 5. **Toggle Behavior on Mobile**

Unlike hover (which is temporary), taps should toggle states:

```javascript
// ✅ Good: Toggle behavior
icon.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (activeCategoryIndex === categoryIndex) {
    // Deselect if already active
    deactivate();
  } else {
    // Select if inactive
    activate(categoryIndex);
  }
});
```

### 6. **Dismiss on Outside Tap**

Allow users to dismiss overlays/states by tapping outside:

```javascript
document.addEventListener("touchstart", (e) => {
  const isIconTapped = Array.from(icons).some((icon) =>
    icon.contains(e.target)
  );
  if (!isIconTapped && isMobileDevice()) {
    resetState();
  }
});
```

### 7. **Prevent Default Browser Behaviors**

Prevent unwanted behaviors like double-tap zoom or text selection:

```javascript
element.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevents double-tap zoom
  // ... your logic
});
```

### 8. **Responsive Hover Modifiers**

Disable hover effects on mobile using Tailwind's responsive modifiers:

```html
<!-- ✅ Only hover on md+ screens -->
<div class="md:hover:scale-110 active:scale-95">...</div>

<!-- ❌ Hover on all screens -->
<div class="hover:scale-110">...</div>
```

### 9. **Pointer Events for Nested Elements**

Prevent child elements from interfering with parent touch events:

```html
<div class="cursor-pointer" onclick="handleClick()">
  <img class="pointer-events-none" src="..." />
</div>
```

## Common Patterns

### Pattern 1: Interactive Image Hotspots
**Use Case:** OurCatalogue component with clickable icons

**Desktop:** Hover shows preview  
**Mobile:** Tap to toggle preview, tap outside to dismiss

```javascript
// Desktop: hover in/out
element.addEventListener("mouseenter", () => showPreview());
element.addEventListener("mouseleave", () => hidePreview());

// Mobile: toggle on tap
element.addEventListener("touchstart", (e) => {
  e.preventDefault();
  isActive ? hidePreview() : showPreview();
});
```

### Pattern 2: Image Zoom on Hover
**Use Case:** NavigationSection images that scale on hover

**Desktop:** Hover to zoom  
**Mobile:** Consider alternative approach (remove zoom or make it tap-based)

```html
<!-- Desktop-only zoom -->
<img class="md:hover:scale-110 transition-transform duration-300" />

<!-- Or: No zoom on mobile (performance) -->
<img class="transition-transform duration-300 md:hover:scale-110" />
```

### Pattern 3: Button Press States
**Use Case:** All buttons and CTAs

**Desktop:** Hover changes color  
**Mobile:** Active state provides tap feedback

```html
<button class="
  bg-primary 
  hover:bg-primary-dark 
  active:bg-primary-darker 
  active:scale-95 
  transition-all duration-200
">
  Click Me
</button>
```

## Implementation Checklist

For each hover-based interaction, ask:

- [ ] Does it have a mobile alternative? (tap/touch events)
- [ ] Is the touch target at least 44x44px?
- [ ] Does it provide visual feedback on tap? (`:active` state)
- [ ] Can users dismiss/deselect the state?
- [ ] Are hover effects disabled on mobile? (`md:hover:...`)
- [ ] Do nested elements have `pointer-events-none`?
- [ ] Is there a visual indicator that it's interactive?
- [ ] Does it prevent unwanted browser behaviors? (`e.preventDefault()`)

## Testing Tips

1. **Chrome DevTools Device Mode:** Test mobile interactions in browser
2. **Actual Devices:** Always test on real mobile devices
3. **Touch Target Testing:** Use accessibility tools to verify tap sizes
4. **Performance:** Monitor for layout shifts and jank during animations

## Examples in Codebase

### ✅ Good Examples
- `src/components/home/OurCatalogue.astro` - Toggle-based hotspots with hints
- `src/components/home/FollowSection.astro` - Button with active states

### 🔄 Needs Improvement
- `src/components/home/NavigationSection.astro` - Hover-only zoom effects
- Components with small touch targets (< 44px)

## Quick Wins

1. Add `active:scale-95` to all buttons
2. Add `active:bg-[darker-color]` to all buttons
3. Replace `hover:` with `md:hover:` for desktop-only effects
4. Increase small tap targets from `w-7 h-7` to `w-10 h-10`
5. Add `pointer-events-none` to nested images/SVGs
