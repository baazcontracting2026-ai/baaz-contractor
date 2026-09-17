/**
 * BAAZ CONTRACTING - OPTION 1 (VERCEL & TAILWIND ARCHITECTURE)
 * Built on Trust. Driven by Precision.
 * Client-side interactive logic: Theme toggle, Edge cost calculator, Before/After slider, Consultation modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEstimator();
  initSlider();
  initConsultationModal();
  initFaqAccordion();
  initSmoothScroll();
});

/* -------------------------------------------------------------------------- */
/* Theme Management (Dark / Light Mode)                                       */
/* -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('baaz_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('baaz_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const iconSpan = document.getElementById('themeIcon');
  if (!iconSpan) return;
  if (theme === 'dark') {
    // Sun icon for switching back to light
    iconSpan.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  } else {
    // Moon icon for switching to dark
    iconSpan.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}

/* -------------------------------------------------------------------------- */
/* Interactive Project Cost Estimator                                         */
/* -------------------------------------------------------------------------- */
function initEstimator() {
  const serviceSelect = document.getElementById('calcService');
  const sqftSlider = document.getElementById('calcSqft');
  const sqftVal = document.getElementById('calcSqftVal');
  const tierButtons = document.querySelectorAll('.tier-btn');
  const totalDisplay = document.getElementById('estTotal');
  const rangeDisplay = document.getElementById('estRange');
  const timelineDisplay = document.getElementById('estTimeline');
  const rateDisplay = document.getElementById('estRate');
  const bookEstimateBtn = document.getElementById('bookEstimateBtn');

  if (!sqftSlider) return;

  const baseRates = {
    'new-home': 295,
    'additions': 245,
    'kitchen': 185,
    'bathroom': 210,
    'basement': 115,
    'roofing': 52,
    'flooring': 32
  };

  const tierMultipliers = {
    'signature': 1.0,
    'architectural': 1.35,
    'masterpiece': 1.85
  };

  let currentTier = 'architectural';

  function calculate() {
    const service = serviceSelect.value;
    const sqft = parseInt(sqftSlider.value, 10);
    sqftVal.textContent = sqft.toLocaleString() + ' sq ft';

    const baseRate = baseRates[service] || 200;
    const multiplier = tierMultipliers[currentTier];
    const finalRate = Math.round(baseRate * multiplier);
    const total = Math.round(finalRate * sqft);

    const low = Math.round(total * 0.92);
    const high = Math.round(total * 1.08);

    // Timeline calculation based on scope and square footage
    let weeks = Math.max(3, Math.round(sqft / 120));
    if (service === 'roofing' || service === 'flooring') weeks = Math.max(1, Math.round(sqft / 400));
    if (service === 'new-home') weeks = Math.max(24, Math.round(sqft / 80));

    totalDisplay.textContent = '$' + total.toLocaleString();
    rangeDisplay.textContent = `Projected Range: $${low.toLocaleString()} – $${high.toLocaleString()}`;
    timelineDisplay.textContent = `${weeks} – ${weeks + 3} Weeks`;
    rateDisplay.textContent = `$${finalRate} / sq ft`;
  }

  sqftSlider.addEventListener('input', calculate);
  serviceSelect.addEventListener('change', calculate);

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tierButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTier = btn.dataset.tier;
      calculate();
    });
  });

  // Calculate immediately
  calculate();

  if (bookEstimateBtn) {
    bookEstimateBtn.addEventListener('click', () => {
      const selectedServiceName = serviceSelect.options[serviceSelect.selectedIndex].text;
      const sqft = sqftSlider.value;
      const estTotal = totalDisplay.textContent;

      openModalWithPrefill({
        service: serviceSelect.value,
        details: `Interested in estimate ${estTotal} for ${sqft} sq ft (${selectedServiceName} - ${currentTier.toUpperCase()} tier).`
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Interactive Before / After Renovation Slider                               */
/* -------------------------------------------------------------------------- */
function initSlider() {
  const container = document.getElementById('beforeAfterSlider');
  const beforeLayer = document.getElementById('sliderBefore');
  const handle = document.getElementById('sliderHandle');

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  function setSliderPosition(x) {
    const rect = container.getBoundingClientRect();
    let pos = (x - rect.left) / rect.width;
    if (pos < 0.05) pos = 0.05;
    if (pos > 0.95) pos = 0.95;

    const percentage = pos * 100;
    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* -------------------------------------------------------------------------- */
/* Consultation Modal                                                         */
/* -------------------------------------------------------------------------- */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  const closeBtn = document.getElementById('modalClose');
  const openTriggers = document.querySelectorAll('.open-consultation-btn');
  const form = document.getElementById('consultationForm');
  const formContainer = document.getElementById('modalFormContainer');
  const successState = document.getElementById('modalSuccessState');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceTarget = btn.dataset.service;
      if (serviceTarget) {
        const modalServiceSelect = document.getElementById('modalService');
        if (modalServiceSelect) modalServiceSelect.value = serviceTarget;
      }
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const errBox = document.getElementById('modalFormError');
      if (errBox) errBox.style.display = 'none';

      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting to Edge...</span>`;

      const name = document.getElementById('modalName')?.value || '';
      const phone = document.getElementById('modalPhone')?.value || '';
      const email = document.getElementById('modalEmail')?.value || '';
      const service = document.getElementById('modalService')?.value || '';
      const notes = document.getElementById('modalNotes')?.value || '';

      const payload = {
        name,
        phone,
        email,
        service,
        notes,
        _subject: `New Consultation Request - ${name || 'Baaz Contracting Client'}`,
        _replyto: email,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/baazcontracting2026@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok || (result && (result.success === "true" || result.success === true || (result.message && result.message.includes('Activation'))))) {
          formContainer.style.display = 'none';
          successState.style.display = 'block';
        } else {
          // Fallback to standard form POST submission
          HTMLFormElement.prototype.submit.call(form);
        }
      } catch (err) {
        console.warn('AJAX submit issue, submitting via native POST fallback...', err);
        HTMLFormElement.prototype.submit.call(form);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
    });
  }

  const resetBtn = document.getElementById('modalResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      formContainer.style.display = 'block';
      successState.style.display = 'none';
      closeModal();
    });
  }
}

function openModalWithPrefill({ service, details }) {
  const modal = document.getElementById('consultationModal');
  const modalService = document.getElementById('modalService');
  const modalNotes = document.getElementById('modalNotes');

  if (modalService && service) modalService.value = service;
  if (modalNotes && details) modalNotes.value = details;

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/* -------------------------------------------------------------------------- */
/* Smooth Scrolling                                                           */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* FAQ Accordion Interactive Logic                                            */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    function toggleItem(isOpen) {
      if (isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.removeAttribute('hidden');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0px';
        setTimeout(() => {
          if (!item.classList.contains('active')) {
            panel.setAttribute('hidden', '');
          }
        }, 350);
      }
    }

    trigger.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');
      
      // Close other open FAQ items for clean accordion UX
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          if (otherTrigger && otherPanel) {
            otherItem.classList.remove('active');
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherPanel.style.maxHeight = '0px';
            setTimeout(() => {
              if (!otherItem.classList.contains('active')) {
                otherPanel.setAttribute('hidden', '');
              }
            }, 350);
          }
        }
      });

      toggleItem(!isCurrentlyActive);
    });

    // Keyboard accessibility
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
}

