# Copy-Paste Mobile Fixes

Quick reference for common mobile interaction patterns. Just copy and paste!

## 🔘 Buttons

### Standard Button
```html
<button class="
  bg-primary 
  hover:bg-primary-dark 
  active:bg-primary-darker 
  active:scale-95 
  transition-all duration-200
  px-6 py-3
">
  Click Me
</button>
```

### Icon Button
```html
<button class="
  p-3
  hover:bg-gray-100 
  active:bg-gray-200 
  active:scale-90 
  rounded-full
  transition-all
  min-w-[44px] min-h-[44px]
">
  <img src={icon} class="w-6 h-6 pointer-events-none" />
</button>
```

### Link Button
```html
<a href="/page" class="
  inline-block
  bg-primary 
  hover:bg-primary-dark 
  active:bg-primary-darker 
  active:scale-95
  px-6 py-3
  rounded-lg
  transition-all
">
  Learn More
</a>
```

## 🖼️ Interactive Images

### Hover Zoom (Desktop Only)
```html
<div class="overflow-hidden">
  <img 
    src={image} 
    alt="Product"
    class="
      w-full h-auto
      md:hover:scale-110
      transition-transform duration-300
    " 
  />
</div>
```

### Tap to Activate (Mobile Toggle)
```html
<div class="relative cursor-pointer tap-icon">
  <img src={mainImage} alt="Main" class="w-full h-auto" />
  
  <!-- Interactive hotspot -->
  <div 
    class="
      absolute top-1/4 left-1/3
      w-12 h-12
      cursor-pointer
      md:hover:scale-110
      active:scale-95
      transition-transform
    "
    data-hotspot="1"
  >
    <img src={icon} alt="Hotspot" class="pointer-events-none" />
    <!-- Mobile hint -->
    <div class="absolute inset-0 rounded-full bg-white/20 animate-ping md:hidden"></div>
  </div>
</div>

<script>
  const hotspots = document.querySelectorAll('[data-hotspot]');
  let activeHotspot = null;
  
  hotspots.forEach(hotspot => {
    // Desktop: hover
    hotspot.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 768) {
        showContent(hotspot.dataset.hotspot);
      }
    });
    
    // Mobile: tap to toggle
    hotspot.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const id = hotspot.dataset.hotspot;
      if (activeHotspot === id) {
        hideContent();
        activeHotspot = null;
      } else {
        showContent(id);
        activeHotspot = id;
      }
    });
  });
  
  // Tap outside to dismiss
  document.addEventListener('touchstart', (e) => {
    const isHotspot = Array.from(hotspots).some(h => h.contains(e.target));
    if (!isHotspot && activeHotspot) {
      hideContent();
      activeHotspot = null;
    }
  });
</script>
```

## 📱 Cards

### Basic Card with Tap Feedback
```html
<a href="/product" class="
  block
  bg-white
  rounded-lg
  shadow-md
  md:hover:shadow-xl
  active:shadow-sm
  active:scale-98
  transition-all duration-200
  p-6
">
  <img src={product} alt="Product" class="w-full h-48 object-cover rounded" />
  <h3 class="text-xl font-bold mt-4">Product Name</h3>
  <p class="text-gray-600 mt-2">Description</p>
</a>
```

### Card with Button
```html
<div class="
  bg-white
  rounded-lg
  shadow-md
  p-6
  md:hover:shadow-xl
  transition-shadow
">
  <img src={product} alt="Product" class="w-full h-48 object-cover rounded" />
  <h3 class="text-xl font-bold mt-4">Product Name</h3>
  <p class="text-gray-600 mt-2">Description</p>
  
  <button class="
    mt-4 w-full
    bg-blue-600 
    hover:bg-blue-700 
    active:bg-blue-800
    active:scale-95
    text-white
    py-3 px-6
    rounded-lg
    transition-all
  ">
    Add to Cart
  </button>
</div>
```

## 🔗 Navigation Links

### Text Link
```html
<a href="/page" class="
  text-blue-600
  hover:text-blue-700
  active:text-blue-800
  active:opacity-70
  underline
  transition-colors
">
  Learn More
</a>
```

### Nav Item with Icon
```html
<a href="/page" class="
  flex items-center gap-2
  px-4 py-2
  hover:bg-gray-100
  active:bg-gray-200
  active:scale-95
  rounded-lg
  transition-all
">
  <img src={icon} alt="" class="w-6 h-6 pointer-events-none" />
  <span>Dashboard</span>
</a>
```

## 🎯 Interactive Icons

### Simple Icon Button
```html
<button class="
  w-12 h-12
  flex items-center justify-center
  hover:bg-gray-100
  active:bg-gray-200
  active:scale-90
  rounded-full
  transition-all
">
  <img src={icon} alt="Action" class="w-6 h-6 pointer-events-none" />
</button>
```

### Icon with Pulse Hint
```html
<button class="
  relative
  w-12 h-12
  md:hover:scale-110
  active:scale-90
  transition-transform
">
  <img src={icon} alt="Interactive" class="w-full h-full pointer-events-none" />
  
  <!-- Pulse hint for mobile (auto-hides) -->
  <div class="
    absolute inset-0 
    rounded-full 
    bg-blue-400/30 
    animate-ping 
    md:hidden
    pulse-hint
  "></div>
</button>

<style>
  @keyframes fadeOut {
    to { opacity: 0; display: none; }
  }
  .pulse-hint {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite,
               fadeOut 0.5s ease-out 3s forwards;
  }
</style>
```

## 📋 Form Elements

### Input Field (Prevents iOS Zoom)
```html
<input 
  type="text"
  placeholder="Enter text"
  class="
    w-full
    px-4 py-3
    text-base md:text-sm
    border border-gray-300
    rounded-lg
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-transparent
    transition-all
  "
  style="font-size: 16px;"
/>
```

### Select Dropdown
```html
<select class="
  w-full
  px-4 py-3
  text-base md:text-sm
  border border-gray-300
  rounded-lg
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  active:scale-98
  transition-all
  appearance-none
  bg-white
" style="font-size: 16px;">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

### Checkbox
```html
<label class="
  flex items-center gap-3
  cursor-pointer
  active:opacity-70
  transition-opacity
  min-h-[44px]
">
  <input 
    type="checkbox" 
    class="w-5 h-5 cursor-pointer"
  />
  <span>I agree to terms</span>
</label>
```

## 🎨 Overlays & Modals

### Modal Background
```html
<div 
  class="
    fixed inset-0 
    bg-black/50 
    backdrop-blur-sm
    z-50
    flex items-center justify-center
    p-4
  "
  onclick="closeModal()"
>
  <div 
    class="
      bg-white 
      rounded-lg 
      p-6 
      max-w-md 
      w-full
      shadow-xl
    "
    onclick="event.stopPropagation()"
  >
    <h2 class="text-2xl font-bold mb-4">Modal Title</h2>
    <p class="text-gray-600 mb-6">Modal content here</p>
    
    <button class="
      w-full
      bg-blue-600
      hover:bg-blue-700
      active:bg-blue-800
      active:scale-95
      text-white
      py-3 px-6
      rounded-lg
      transition-all
    ">
      Close
    </button>
  </div>
</div>
```

## 🎭 Tabs

### Tab Navigation
```html
<div class="flex border-b border-gray-200">
  <button class="
    px-6 py-3
    hover:bg-gray-50
    active:bg-gray-100
    border-b-2 border-blue-600
    text-blue-600
    font-semibold
    transition-all
    tab-active
  ">
    Tab 1
  </button>
  
  <button class="
    px-6 py-3
    hover:bg-gray-50
    active:bg-gray-100
    border-b-2 border-transparent
    text-gray-600
    hover:text-gray-900
    transition-all
  ">
    Tab 2
  </button>
</div>
```

## 🎪 Carousels

### Carousel Arrow Buttons
```html
<!-- Previous Button -->
<button class="
  absolute left-4 top-1/2 -translate-y-1/2
  w-12 h-12
  bg-white/90
  hover:bg-white
  active:bg-gray-100
  active:scale-90
  rounded-full
  shadow-lg
  flex items-center justify-center
  transition-all
  z-10
">
  <svg class="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
  </svg>
</button>

<!-- Next Button -->
<button class="
  absolute right-4 top-1/2 -translate-y-1/2
  w-12 h-12
  bg-white/90
  hover:bg-white
  active:bg-gray-100
  active:scale-90
  rounded-full
  shadow-lg
  flex items-center justify-center
  transition-all
  z-10
">
  <svg class="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
  </svg>
</button>
```

### Carousel Indicators
```html
<div class="flex gap-2 justify-center mt-4">
  <button class="
    w-3 h-3
    bg-blue-600
    rounded-full
    active:scale-75
    transition-transform
  "></button>
  
  <button class="
    w-3 h-3
    bg-gray-300
    hover:bg-gray-400
    active:bg-gray-500
    active:scale-75
    rounded-full
    transition-all
  "></button>
</div>
```

## 🔍 Search Bar

### Mobile-Optimized Search
```html
<form class="relative">
  <input 
    type="search"
    placeholder="Search..."
    class="
      w-full
      pl-12 pr-4 py-3
      text-base
      border border-gray-300
      rounded-full
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-transparent
      transition-all
    "
    style="font-size: 16px;"
  />
  
  <button 
    type="submit"
    class="
      absolute left-4 top-1/2 -translate-y-1/2
      w-6 h-6
      active:scale-90
      transition-transform
    "
  >
    <svg class="w-6 h-6 text-gray-400 pointer-events-none" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  </button>
</form>
```

## 💡 Utility Classes Quick Reference

```css
/* Touch targets */
min-w-[44px] min-h-[44px]  /* Minimum size */

/* Tap feedback */
active:scale-95             /* Buttons */
active:scale-90             /* Icons */
active:opacity-70           /* Links */

/* Desktop-only hover */
md:hover:scale-110          /* Zoom */
md:hover:bg-gray-100        /* Background */

/* Prevent pointer issues */
pointer-events-none         /* On child images */

/* Mobile hints */
animate-ping md:hidden      /* Pulse animation */

/* Smooth transitions */
transition-all duration-200 /* Standard */
transition-transform        /* Performance */
```

## 🎯 Common Patterns

### Pattern: Toggle State
```javascript
let isActive = false;

element.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isActive = !isActive;
  element.classList.toggle('active', isActive);
});
```

### Pattern: Desktop Hover, Mobile Tap
```javascript
const isMobile = () => window.innerWidth < 768;

if (!isMobile()) {
  // Desktop: hover
  element.addEventListener('mouseenter', show);
  element.addEventListener('mouseleave', hide);
} else {
  // Mobile: tap
  element.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggle();
  });
}
```

### Pattern: Tap Outside to Dismiss
```javascript
document.addEventListener('touchstart', (e) => {
  if (!element.contains(e.target)) {
    close();
  }
});
```

---

**Tip:** Always include `pointer-events-none` on images inside clickable elements!

**Tip:** Use `style="font-size: 16px;"` on inputs to prevent iOS zoom!

**Tip:** Test on real devices, not just browser DevTools!
