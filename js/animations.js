// ============================================
// UniCoreX Technologies — Scroll Animations
// ============================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // First, disable CSS transitions on all reveal elements so GSAP can animate them smoothly
  gsap.set('.reveal, .reveal-left, .reveal-right, .reveal-scale', { 
    transition: 'none',
    opacity: 0 // Ensure starts at 0
  });

  // 1. Stagger reveal of trust pillars
  gsap.fromTo('.trust-pillar', 
    { opacity: 0, y: 50 },
    {
      scrollTrigger: {
        trigger: '.trust-pillars',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.15,
      ease: 'power3.out',
    }
  );

  // 2. Stagger reveal of service cards
  gsap.fromTo('.service-card', 
    { opacity: 0, y: 60, rotationX: 8 },
    {
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1.2,
      stagger: 0.12,
      ease: 'power3.out',
    }
  );

  // 3. Stagger reveal of why cards
  gsap.fromTo('.why-card', 
    { opacity: 0, y: 50 },
    {
      scrollTrigger: {
        trigger: '.why-grid',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.12,
      ease: 'power3.out',
    }
  );

  // 4. Stagger reveal of portfolio cards
  gsap.fromTo('.portfolio-card', 
    { opacity: 0, y: 70 },
    {
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.18,
      ease: 'power3.out',
    }
  );

  // 5. Stagger reveal of stat cards
  gsap.fromTo('.stat-card', 
    { opacity: 0, y: 50, scale: 0.9 },
    {
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.0,
      stagger: 0.12,
      ease: 'power3.out',
    }
  );

  // 6. Stagger reveal of industry cards
  gsap.fromTo('.industry-card', 
    { opacity: 0, scale: 0.8, y: 30 },
    {
      scrollTrigger: {
        trigger: '.industries-grid',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'back.out(1.7)',
    }
  );

  // 7. Stagger reveal of tech items (active grid)
  gsap.fromTo('.tech-grid.active .tech-item', 
    { opacity: 0, y: 40 },
    {
      scrollTrigger: {
        trigger: '.tech-grid.active',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    }
  );

  // 8. Generic reveals for titles, section headers, etc.
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealElements.forEach((el) => {
    // Skip items handled by specific staggered grids to prevent conflict
    if (el.closest('.services-grid, .trust-pillars, .stats-grid, .portfolio-grid, .why-grid, .industries-grid, .tech-grid')) {
      return;
    }

    let fromVars = { opacity: 0 };
    let toVars = {
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    };

    if (el.classList.contains('reveal')) {
      fromVars.y = 50;
      fromVars.rotationX = 6;
      toVars.y = 0;
      toVars.rotationX = 0;
    } else if (el.classList.contains('reveal-left')) {
      fromVars.x = -60;
      fromVars.rotationY = 6;
      toVars.x = 0;
      toVars.rotationY = 0;
    } else if (el.classList.contains('reveal-right')) {
      fromVars.x = 60;
      fromVars.rotationY = -6;
      toVars.x = 0;
      toVars.rotationY = 0;
    } else if (el.classList.contains('reveal-scale')) {
      fromVars.scale = 0.85;
      fromVars.rotationX = 4;
      toVars.scale = 1;
      toVars.rotationX = 0;
    }

    gsap.fromTo(el, fromVars, toVars);
  });

  // 9. Animated Counters using GSAP tween
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counter,
        start: 'top 92%',
      },
      onUpdate: () => {
        counter.textContent = Math.floor(obj.value).toLocaleString() + suffix;
      },
      onComplete: () => {
        counter.textContent = target.toLocaleString() + suffix;
      }
    });
  });

  // 10. Floating background icons - Parallax on Scroll
  gsap.to('.hero-float-icon', {
    y: (i) => {
      const offsets = [40, -50, 70, -35, 55, -60, 45, -50];
      return offsets[i % offsets.length];
    },
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  // 11. Hero title and buttons parallax fade out
  gsap.to('.hero-content', {
    opacity: 0,
    y: -40,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '80% top',
      scrub: true,
    }
  });
}
