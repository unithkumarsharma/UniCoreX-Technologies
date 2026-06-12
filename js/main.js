// ============================================
// UniCoreX Technologies — Main Entry Point
// ============================================

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { inject } from '@vercel/analytics';

import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initPortfolio } from './portfolio.js';
import { initTestimonials } from './testimonials.js';
import { initFAQ } from './faq.js';
import { initChatbot } from './chatbot.js';
// import { initThreeBg } from './three-bg.js';
import { initSpotlight } from './spotlight.js';
import { init3DTilt } from './tilt.js';

gsap.registerPlugin(ScrollTrigger);

// Initialize Vercel Web Analytics
inject();

// Initialize Lenis Smooth Scroll
function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Sync scroll on anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        lenis.scrollTo(targetEl, {
          offset: -80, // accounts for sticky header
          duration: 1.2
        });
      }
    });
  });
}

// Tech stack tabs
function initTechTabs() {
  const tabs = document.querySelectorAll('.tech-tab');
  const grids = document.querySelectorAll('.tech-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      grids.forEach(grid => {
        grid.classList.remove('active');
        if (grid.dataset.tab === target) {
          grid.classList.add('active');
          // Smooth stagger fade in for items in the newly activated tab
          const items = grid.querySelectorAll('.tech-item');
          gsap.fromTo(items, 
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
          );
        }
      });
    });
  });
}

// Trigger confetti utility
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#8B5CF6', '#3B82F6', '#06B6D4', '#EC4899', '#10B981']
  });
}

// Newsletter form
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        input.value = '';
        const btn = form.querySelector('button');
        const origText = btn.textContent;
        btn.textContent = '✓ Subscribed!';
        btn.style.background = '#4CAF50';
        triggerConfetti();
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.background = '';
        }, 3000);
      }
    });
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.querySelector('.form-success');

  if (form) {
    const budgetSelect = document.getElementById('contact-budget-select');
    const customBudgetContainer = document.getElementById('custom-budget-container');
    const customBudgetInput = document.getElementById('custom-budget-input');

    if (budgetSelect && customBudgetContainer) {
      budgetSelect.addEventListener('change', () => {
        if (budgetSelect.value === 'custom') {
          customBudgetContainer.style.display = 'block';
          if (customBudgetInput) {
            customBudgetInput.required = true;
            customBudgetInput.focus();
          }
        } else {
          customBudgetContainer.style.display = 'none';
          if (customBudgetInput) {
            customBudgetInput.required = false;
            customBudgetInput.value = '';
          }
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('active');
      }
      triggerConfetti();
      setTimeout(() => {
        form.style.display = '';
        form.reset();
        if (customBudgetContainer) {
          customBudgetContainer.style.display = 'none';
        }
        if (successMsg) {
          successMsg.classList.remove('active');
        }
      }, 5000);
    });
  }
}

// Careers form
function initCareersForm() {
  const form = document.getElementById('careers-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = '✓ Application Submitted!';
      btn.style.background = '#4CAF50';
      btn.style.borderColor = '#4CAF50';
      triggerConfetti();
      form.reset();
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 4000);
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initNavigation();
  initAnimations();
  // initThreeBg();
  init3DTilt();
  initSpotlight();
  initTechTabs();
  initPortfolio();
  initTestimonials();
  initFAQ();
  initChatbot();
  initNewsletter();
  initContactForm();
  initCareersForm();
});
