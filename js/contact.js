/* ==========================================================================
   Areesha Amjad — Premium Graphic Designer Portfolio
   Contact Form Module: Pure Frontend Validation & Mailto Integration
   ========================================================================== */

export function initContactForm() {
  const form = document.getElementById('designer-contact-form');
  const feedbackBanner = document.getElementById('form-feedback-banner');
  const mailtoLink = document.getElementById('mailto-fallback-link');

  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-form-btn');

  // Clear errors dynamically on input
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('active');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error states
    document.querySelectorAll('.form-field-error').forEach((el) => {
      el.textContent = '';
      el.classList.remove('active');
    });

    if (feedbackBanner) {
      feedbackBanner.style.display = 'none';
      feedbackBanner.className = 'form-feedback-banner';
    }

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    let isValid = true;

    // Name Validation
    if (name.length < 2) {
      showError('contact-name-error', 'Please enter your full name (at least 2 characters).');
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError('contact-email-error', 'Please enter a valid email address.');
      isValid = false;
    }

    // Message Validation
    if (message.length < 10) {
      showError('contact-message-error', 'Please enter your creative brief or message (at least 10 characters).');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate swift UX feedback with frontend success state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Preparing Message...';
    }

    setTimeout(() => {
      if (feedbackBanner) {
        feedbackBanner.className = 'form-feedback-banner success';
        feedbackBanner.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <strong>Thank you, ${escapeHtml(name)}!</strong><br>
            Your message has been validated successfully. An email window can also be launched directly using the link below.
          </div>
        `;
        feedbackBanner.style.display = 'flex';
      }

      // Update mailto fallback link with user's inputs
      if (mailtoLink) {
        const subjectEncoded = encodeURIComponent(`Design Inquiry from ${name}`);
        const bodyEncoded = encodeURIComponent(`Hi Areesha,\n\n${message}\n\nFrom: ${name} (${email})`);
        mailtoLink.href = `mailto:areesha.design@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
      }

      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span> <span style="font-size:1.15rem;">&#x2197;</span>`;
      }
    }, 450);
  });

  function showError(id, message) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = message;
      el.classList.add('active');
    }
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
}
