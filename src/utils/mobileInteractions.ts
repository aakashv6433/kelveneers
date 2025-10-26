/**
 * Mobile Interaction Utilities
 * 
 * Helper functions for creating intuitive mobile interactions
 * that work alongside desktop hover states.
 */

/**
 * Check if the current device is mobile based on viewport width
 * @param breakpoint - Tailwind breakpoint (default: 768px for 'md')
 */
export function isMobileDevice(breakpoint: number = 768): boolean {
    return window.innerWidth < breakpoint;
}

/**
 * Add touch/click listeners with automatic mobile detection
 * @param element - The DOM element to attach listeners to
 * @param callback - Function to call on interaction
 * @param options - Configuration options
 */
export function addMobileInteraction(
    element: HTMLElement,
    callback: (event: Event) => void,
    options: {
        preventDefault?: boolean;
        stopPropagation?: boolean;
        desktopOnly?: boolean;
        mobileOnly?: boolean;
    } = {}
) {
    const {
        preventDefault = true,
        stopPropagation = false,
        desktopOnly = false,
        mobileOnly = false,
    } = options;

    const handleEvent = (event: Event) => {
        if (desktopOnly && isMobileDevice()) return;
        if (mobileOnly && !isMobileDevice()) return;

        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();

        callback(event);
    };

    // Touch events for mobile
    element.addEventListener("touchstart", handleEvent);

    // Click events as fallback
    element.addEventListener("click", handleEvent);

    // Return cleanup function
    return () => {
        element.removeEventListener("touchstart", handleEvent);
        element.removeEventListener("click", handleEvent);
    };
}

/**
 * Add hover listeners for desktop only
 * @param element - The DOM element to attach listeners to
 * @param onEnter - Function to call on mouse enter
 * @param onLeave - Function to call on mouse leave
 */
export function addDesktopHover(
    element: HTMLElement,
    onEnter: (event: MouseEvent) => void,
    onLeave: (event: MouseEvent) => void
) {
    const handleEnter = (event: MouseEvent) => {
        if (!isMobileDevice()) {
            onEnter(event);
        }
    };

    const handleLeave = (event: MouseEvent) => {
        if (!isMobileDevice()) {
            onLeave(event);
        }
    };

    element.addEventListener("mouseenter", handleEnter);
    element.addEventListener("mouseleave", handleLeave);

    // Return cleanup function
    return () => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
    };
}

/**
 * Add "tap outside to dismiss" functionality
 * @param elements - Array of elements that should NOT trigger dismiss
 * @param callback - Function to call when tapping outside
 * @param mobileOnly - Only work on mobile devices
 */
export function addTapOutsideDismiss(
    elements: HTMLElement[],
    callback: () => void,
    mobileOnly: boolean = true
) {
    const handleTapOutside = (event: TouchEvent | MouseEvent) => {
        if (mobileOnly && !isMobileDevice()) return;

        const isOutside = !elements.some((element) =>
            element.contains(event.target as Node)
        );

        if (isOutside) {
            callback();
        }
    };

    document.addEventListener("touchstart", handleTapOutside as EventListener);
    document.addEventListener("click", handleTapOutside as EventListener);

    // Return cleanup function
    return () => {
        document.removeEventListener("touchstart", handleTapOutside as EventListener);
        document.removeEventListener("click", handleTapOutside as EventListener);
    };
}

/**
 * Toggle active state on an element
 * @param element - The element to toggle
 * @param isActive - Whether the element should be active
 * @param activeClasses - Classes to add when active
 * @param inactiveClasses - Classes to add when inactive
 */
export function toggleActiveState(
    element: HTMLElement,
    isActive: boolean,
    activeClasses: string[] = ["scale-110", "z-10"],
    inactiveClasses: string[] = ["scale-100"]
) {
    if (isActive) {
        element.classList.add(...activeClasses);
        element.classList.remove(...inactiveClasses);
    } else {
        element.classList.remove(...activeClasses);
        element.classList.add(...inactiveClasses);
    }
}

/**
 * Create a pulse hint animation that stops after interaction
 * @param element - The element to add the pulse to
 * @param duration - How long to show the pulse in ms (default: 3000)
 * @param mobileOnly - Only show on mobile devices
 */
export function addPulseHint(
    element: HTMLElement,
    duration: number = 3000,
    mobileOnly: boolean = true
) {
    if (mobileOnly && !isMobileDevice()) return null;

    const pulse = document.createElement("div");
    pulse.className = "absolute inset-0 rounded-full bg-white/20 animate-ping";
    if (mobileOnly) {
        pulse.classList.add("md:hidden");
    }

    element.appendChild(pulse);
    element.style.position = "relative";

    // Auto-remove after duration
    const timeoutId = setTimeout(() => {
        pulse.remove();
    }, duration);

    // Return function to manually remove pulse
    return () => {
        clearTimeout(timeoutId);
        pulse.remove();
    };
}

/**
 * Ensure minimum touch target size
 * @param element - The element to check
 * @param minSize - Minimum size in pixels (default: 44)
 */
export function ensureTouchTarget(
    element: HTMLElement,
    minSize: number = 44
): void {
    const rect = element.getBoundingClientRect();

    if (rect.width < minSize || rect.height < minSize) {
        console.warn(
            `Element has insufficient touch target size: ${rect.width}x${rect.height}px. Minimum recommended: ${minSize}x${minSize}px`,
            element
        );
    }
}

/**
 * Add haptic feedback (vibration) on tap for supporting devices
 * @param duration - Vibration duration in ms (default: 10)
 */
export function addHapticFeedback(duration: number = 10): void {
    if ("vibrate" in navigator) {
        navigator.vibrate(duration);
    }
}
