# Quick Fixes for Mobile Interactions

## Components That Need Updates

### 1. NavigationSection.astro (Desktop) ⚠️

**Issue:** Hover-based image zoom has no mobile equivalent

**Current:**

```html
<img class="hover:scale-110 transition-transform duration-300" />
```

**Quick Fix:**

```html
<!-- Option A: Remove zoom on mobile (simplest) -->
<img class="md:hover:scale-110 transition-transform duration-300" />

<!-- Option B: Keep zoom, works on mobile -->
<img
  class="hover:scale-110 active:scale-110 transition-transform duration-300"
/>
```

**Recommended:** Use Option A to improve mobile performance (image scaling can cause lag on mobile).

### 2. NavigationSectionMobile.astro ⚠️

**Issue:** Has hover effects but it's meant for mobile

**Quick Fix:** Replace all `hover:` with `active:` or remove them:

```html
<!-- Before -->
<div class="hover:z-20 relative">
  <img class="hover:scale-110 peer" />
  <img class="peer-hover:opacity-0" />
</div>

<!-- After (remove hover effects on mobile component) -->
<div class="relative">
  <img />
  <img />
</div>
```

### 3. AboutCarousel.astro - Navigation Arrows ⚠️

**Issue:** Only hover state for arrows

**Quick Fix:**

```html
<!-- Before -->
<button class="text-white hover:text-gray-300 transition-colors duration-300">
  <!-- After -->
  <button
    class="text-white hover:text-gray-300 active:text-gray-400 transition-colors duration-300 active:scale-95"
  ></button>
</button>
```

## Global CSS Additions

Add these utility classes to your `src/styles/global.css`:

```css
/* Mobile-friendly touch states */
@layer utilities {
  /* Remove hover effects on touch devices */
  @media (hover: none) and (pointer: coarse) {
    .hover\:scale-110:hover {
      transform: none;
    }

    .hover\:z-20:hover {
      z-index: auto;
    }
  }

  /* Better tap targets for mobile */
  .tap-target {
    @apply min-w-[44px] min-h-[44px];
  }

  /* Prevent text selection on tappable elements */
  .tap-area {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  /* Smooth tap feedback */
  .tap-feedback {
    @apply active:scale-95 transition-transform duration-100;
  }
}
```

## Component-by-Component Checklist

### ✅ OurCatalogue.astro

- [x] Touch events implemented
- [x] Visual feedback on tap (scale)
- [x] Pulse hints for discoverability
- [x] Toggle behavior
- [x] Tap outside to dismiss
- [x] Minimum touch target size (44px)

### ✅ FollowSection.astro

- [x] Active state for button
- [x] Scale feedback on tap

### ⚠️ NavigationSection.astro

- [ ] Hover-only zoom (consider disabling on mobile)
- [ ] No active states
- Action: Add `md:` prefix to hover effects

### ⚠️ NavigationSectionMobile.astro

- [ ] Has hover effects (shouldn't on mobile component)
- Action: Remove hover effects or convert to active

### ⚠️ AboutCarousel.astro

- [ ] Arrow buttons need active states
- Action: Add `active:` states to buttons

## Testing Script

Run this in your browser console on mobile to check touch targets:

```javascript
// Check for insufficient touch targets
document
  .querySelectorAll('[class*="cursor-pointer"], button, a')
  .forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      console.warn("Small touch target:", {
        element: el,
        size: `${rect.width}x${rect.height}px`,
        classes: el.className,
      });
      el.style.outline = "2px solid red";
    }
  });
```

## Priority Order

1. **High Priority** (Poor UX without fix):

   - OurCatalogue.astro ✅ DONE
   - FollowSection.astro ✅ DONE

2. **Medium Priority** (Works but not optimal):

   - NavigationSection.astro - Add `md:` prefixes to hover
   - AboutCarousel arrows - Add active states

3. **Low Priority** (Nice to have):
   - NavigationSectionMobile.astro - Clean up hover effects
   - Add global CSS utilities

## Quick Commands

Search for all hover classes:

```bash
grep -r "hover:" src/components --include="*.astro"
```

Find small touch targets:

```bash
grep -r "w-[1-8] h-[1-8]" src/components --include="*.astro"
```
