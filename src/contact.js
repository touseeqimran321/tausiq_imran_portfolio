import { initBackgroundParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundParticles();

  // Mobile drawer toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      menuToggle.innerHTML = isOpen ? '&#x2715;' : '&#9776;';
    });
  }

  // SMTP backend status check
  const smtpStatusBadge = document.getElementById('smtp-status-badge');
  const smtpStatusText = document.getElementById('smtp-status-text');

  fetch('/api/smtp-status')
    .then((res) => res.json())
    .then((data) => {
      if (smtpStatusBadge && smtpStatusText) {
        if (data.configured) {
          smtpStatusBadge.innerHTML = '<span class="status-dot-live"></span> SMTP Ready';
          smtpStatusBadge.style.color = 'var(--accent-emerald)';
          smtpStatusText.textContent = `Inbound messages are securely dispatched directly to ${data.receiver} via ${data.host}.`;
        } else {
          smtpStatusBadge.innerHTML = '<span class="status-dot-live" style="background:#38bdf8;box-shadow:0 0 10px #38bdf8;"></span> Server Active';
          smtpStatusBadge.style.color = '#38bdf8';
          smtpStatusText.textContent = 'Node.js backend server is operational with input sanitization and server logging.';
        }
      }
    })
    .catch((err) => {
      console.warn('Backend status unreachable:', err);
    });

  // Contact Form Handling
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('contact-form-alert');
  const submitBtn = document.getElementById('submit-contact-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset field errors
      document.querySelectorAll('.form-field-error').forEach((el) => {
        el.classList.remove('active');
        el.textContent = '';
      });

      if (alertBox) {
        alertBox.className = 'form-alert';
        alertBox.style.display = 'none';
        alertBox.textContent = '';
      }

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput?.value?.trim() || '';
      const email = emailInput?.value?.trim() || '';
      const subject = subjectInput?.value?.trim() || '';
      const message = messageInput?.value?.trim() || '';

      let hasError = false;

      if (name.length < 2) {
        showFieldError('name-error', 'Please enter your full name (at least 2 characters).');
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showFieldError('email-error', 'Please enter a valid email address.');
        hasError = true;
      }

      if (subject.length < 2) {
        showFieldError('subject-error', 'Please enter a message subject (at least 2 characters).');
        hasError = true;
      }

      if (message.length < 10) {
        showFieldError('message-error', 'Please enter your message (at least 10 characters).');
        hasError = true;
      }

      if (hasError) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Transmitting Message...';
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (alertBox) {
            alertBox.className = 'form-alert success';
            alertBox.textContent = result.message || 'Thank you! Your message has been transmitted successfully.';
            alertBox.style.display = 'block';
          }
          form.reset();
        } else {
          if (alertBox) {
            alertBox.className = 'form-alert error';
            alertBox.textContent = result.error || 'Unable to deliver message. Please try again later.';
            alertBox.style.display = 'block';
          }
        }
      } catch (err) {
        if (alertBox) {
          alertBox.className = 'form-alert error';
          alertBox.textContent = 'Server communication error. Please ensure the backend is active.';
          alertBox.style.display = 'block';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          const btnText = submitBtn.querySelector('.btn-text');
          if (btnText) btnText.textContent = 'Send Message';
        }
      }
    });
  }

  function showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add('active');
    }
  }
});
