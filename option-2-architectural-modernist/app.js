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
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const errBox = document.getElementById('opt2FormError');
      if (errBox) errBox.style.display = 'none';

      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Securing Project Lead...</span>`;

      const name = document.getElementById('opt2Name')?.value || '';
      const phone = document.getElementById('opt2Phone')?.value || '';
      const email = document.getElementById('opt2Email')?.value || '';
      const service = document.getElementById('opt2Service')?.value || '';
      const notes = document.getElementById('opt2Notes')?.value || '';

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
          formBox.style.display = 'none';
          successBox.style.display = 'block';
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
