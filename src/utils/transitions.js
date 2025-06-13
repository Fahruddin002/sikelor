// View Transition API utility functions
export const startViewTransition = (callback) => {
  // Check if View Transition API is supported
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    try {
      return document.startViewTransition(callback)
    } catch (error) {
      console.warn("View Transition failed, falling back to immediate transition:", error)
      callback()
    }
  } else {
    // Fallback for browsers that don't support View Transition API
    callback()
  }
}

// Predefined transition configurations
export const transitionConfig = {
  // Slide transitions for page navigation
  slideLeft: {
    name: "slide-left",
    duration: "0.3s",
    easing: "ease-out",
  },
  slideRight: {
    name: "slide-right",
    duration: "0.3s",
    easing: "ease-out",
  },
  // Fade transitions for modals and overlays
  fade: {
    name: "fade",
    duration: "0.25s",
    easing: "ease-in-out",
  },
  // Scale transitions for buttons and cards
  scale: {
    name: "scale",
    duration: "0.2s",
    easing: "ease-out",
  },
}

// Add transition classes to elements
export const addTransitionName = (element, transitionName) => {
  if (element) {
    element.style.viewTransitionName = transitionName
  }
}

// Remove transition classes from elements
export const removeTransitionName = (element) => {
  if (element) {
    element.style.viewTransitionName = ""
  }
}

// Utility to add transition classes
export const addTransitionClass = (element, className, duration = 300) => {
  if (!element) return

  element.classList.add(className)

  setTimeout(() => {
    element.classList.remove(className)
  }, duration)
}

// Page transition helper
export const transitionToPage = (callback, duration = 300) => {
  const body = document.body

  // Add fade out class
  body.style.opacity = "0"
  body.style.transition = `opacity ${duration}ms ease-in-out`

  setTimeout(() => {
    callback()

    // Fade back in
    setTimeout(() => {
      body.style.opacity = "1"
    }, 50)

    // Clean up styles
    setTimeout(() => {
      body.style.opacity = ""
      body.style.transition = ""
    }, duration)
  }, duration)
}
