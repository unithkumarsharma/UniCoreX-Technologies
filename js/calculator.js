// ============================================
// UniCoreX Technologies — Project Cost Calculator
// ============================================

export function initCalculator() {
  const typeButtons = document.querySelectorAll('.calc-type-btn');
  const checkboxes = document.querySelectorAll('.calc-checkbox');
  const slider = document.querySelector('.calc-slider');
  const resultPrice = document.querySelector('.calc-result-price');

  if (!resultPrice) return;

  const basePrices = {
    website: { min: 50000, max: 300000 },
    mobile: { min: 200000, max: 1500000 },
    saas: { min: 500000, max: 3000000 },
    chatbot: { min: 100000, max: 800000 }
  };

  const featureMultipliers = {
    auth: 1.1,
    payments: 1.15,
    analytics: 1.08,
    api: 1.12,
    admin: 1.15,
    multilang: 1.1
  };

  let selectedType = 'website';
  let selectedFeatures = new Set();
  let complexity = 1;

  function updatePrice() {
    const base = basePrices[selectedType];
    let multiplier = 1;

    selectedFeatures.forEach(feature => {
      if (featureMultipliers[feature]) {
        multiplier *= featureMultipliers[feature];
      }
    });

    // Complexity: 1=basic, 2=medium, 3=complex
    const complexityMultiplier = 0.7 + (complexity * 0.3);

    const minPrice = Math.round(base.min * multiplier * complexityMultiplier);
    const maxPrice = Math.round(base.max * multiplier * complexityMultiplier);

    resultPrice.textContent = `₹${formatNumber(minPrice)} — ₹${formatNumber(maxPrice)}`;
  }

  function formatNumber(num) {
    if (num >= 100000) {
      const lakhs = num / 100000;
      return lakhs % 1 === 0 ? `${lakhs}L` : `${lakhs.toFixed(1)}L`;
    }
    return num.toLocaleString('en-IN');
  }

  // Project type selection
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedType = btn.dataset.type;
      updatePrice();
    });
  });

  // Feature checkboxes
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) {
        selectedFeatures.add(cb.dataset.feature);
      } else {
        selectedFeatures.delete(cb.dataset.feature);
      }
      updatePrice();
    });
  });

  // Complexity slider
  if (slider) {
    slider.addEventListener('input', () => {
      complexity = parseInt(slider.value);
      updatePrice();
    });
  }

  // Initial price
  updatePrice();
}
