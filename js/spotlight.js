// ============================================
// UniCoreX Technologies — Interactive Cursor Spotlight
// ============================================

export function initSpotlight() {
  const spotlight = document.querySelector('.spotlight-glow');
  if (!spotlight) return;

  let hasMoved = false;

  window.addEventListener('mousemove', (e) => {
    if (!hasMoved) {
      document.body.classList.add('mouse-active');
      hasMoved = true;
    }
    
    // Update the custom properties using requestAnimationFrame for optimal rendering performance
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }, { passive: true });

  // Hide the glow if the mouse leaves the viewport
  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('mouse-active');
    hasMoved = false;
  });
}
