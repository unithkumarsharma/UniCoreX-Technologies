// ============================================
// UniCoreX Technologies — 3D Card Tilt & Glare Effect
// ============================================

export function init3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll(
    '.service-card, .portfolio-card, .why-card, .premium-card, .glass-card, .stat-card, .testimonial-card, .industry-card'
  );

  cards.forEach(card => {
    // Ensure parent has perspective or add it directly to the card
    card.style.transformStyle = 'preserve-3d';
    
    // Create glare overlay
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      // Style glare container
      Object.assign(glare.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '5',
        borderRadius: 'inherit',
        opacity: '0',
        transition: 'opacity 0.4s ease',
        background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)'
      });
      card.style.position = 'relative';
      card.appendChild(glare);
    }

    // Set transition for clean return
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease';

    let rect;

    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
      glare.style.opacity = '1';
      card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
    });

    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element

      const width = rect.width;
      const height = rect.height;

      // Normalize values between -1 and 1
      const xVal = (x - width / 2) / (width / 2);
      const yVal = (y - height / 2) / (height / 2);

      // Max rotation: 10 degrees (feels more premium)
      const rotateY = xVal * 10;
      const rotateX = -yVal * 10;

      // Apply 3D transform and push content out using translateZ
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-4px)`;
      
      // Update glare gradient position
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`;
      
      // Subtly elevate inner elements for a layered depth effect
      const title = card.querySelector('h3, h4');
      const icon = card.querySelector('.icon-box, .industry-icon, .tech-item-icon');
      const desc = card.querySelector('p');
      
      if (title) title.style.transform = 'translateZ(20px)';
      if (icon) icon.style.transform = 'translateZ(35px)';
      if (desc) desc.style.transform = 'translateZ(10px)';
    });

    card.addEventListener('mouseleave', () => {
      glare.style.opacity = '0';
      card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1.5, 0.5, 1), box-shadow 0.6s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      
      // Reset inner elements
      const title = card.querySelector('h3, h4');
      const icon = card.querySelector('.icon-box, .industry-icon, .tech-item-icon');
      const desc = card.querySelector('p');
      
      if (title) {
        title.style.transition = 'transform 0.6s ease';
        title.style.transform = 'translateZ(0px)';
      }
      if (icon) {
        icon.style.transition = 'transform 0.6s ease';
        icon.style.transform = 'translateZ(0px)';
      }
      if (desc) {
        desc.style.transition = 'transform 0.6s ease';
        desc.style.transform = 'translateZ(0px)';
      }
    });
  });
}
