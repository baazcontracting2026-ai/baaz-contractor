/**
 * BAAZ CONTRACTING - OPTION 2 (CONTEMPORARY NORDIC ARCHITECTURAL EDITION)
 * Built on Trust. Driven by Precision.
 * Client-side script: Trade category filters, interactive consultation intake, smooth interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceFilters();
  initConsultationForm();
  initHeaderScroll();
  initSmoothScroll();
});

/* -------------------------------------------------------------------------- */
/* 7 Services Category Filter                                                 */
/* -------------------------------------------------------------------------- */
function initServiceFilters() {
  const chips = document.querySelectorAll('.filter-chip');
  const serviceBlocks = document.querySelectorAll('.service-block');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.dataset.filter;

      serviceBlocks.forEach(block => {
        if (filter === 'all' || block.dataset.category === filter) {
          block.style.display = 'flex';
          block.style.opacity = '1';
          block.style.transform = 'translateY(0)';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Consultation Intake Form                                                   */
/* -------------------------------------------------------------------------- */
function initConsultationForm() {
  const form = document.getElementById('nordicConsultForm');
  const formBox = document.getElementById('consultFormBox');
  const successBox = document.getElementById('consultSuccessBox');
  const resetBtn = document.getElementById('consultResetBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Securing Project Lead...';

      setTimeout(() => {
        formBox.style.display = 'none';
        successBox.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 600);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      formBox.style.display = 'block';
      successBox.style.display = 'none';
    });
  }

  // Pre-fill service buttons from service cards
  document.querySelectorAll('.inquire-trade-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetService = btn.dataset.service;
      const selectElem = document.getElementById('opt2Service');
      if (selectElem && targetService) {
        selectElem.value = targetService;
      }
      const consultSection = document.getElementById('consultation');
      if (consultSection) {
        consultSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Header Elevation on Scroll                                                 */
/* -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header-nav');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 10px 30px rgba(21, 26, 23, 0.06)';
      header.style.background = 'rgba(246, 244, 239, 0.96)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(246, 244, 239, 0.9)';
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Smooth Scroll Anchor Links                                                 */
/* -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
