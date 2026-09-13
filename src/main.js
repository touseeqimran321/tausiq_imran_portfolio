import { init3DHeroScene } from './3d-scene.js';
import { initBackgroundParticles } from './particles.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Canvas Scene & Background Particles
  init3DHeroScene();
  initBackgroundParticles();

  // 2. Navigation Scroll Effect & Scrollspy
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu drawer
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      menuToggle.innerHTML = isOpen ? '&#x2715;' : '&#9776;';
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.innerHTML = '&#9776;';
      });
    });
  }

  // 3. Interactive 3D Skill Cards Flip
  const skillCards = document.querySelectorAll('.skill-card-3d');
  skillCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // 4. Interactive 3D Perspective Tilt on Project Cards & Service Cards
  const tiltCards = document.querySelectorAll('.project-card-3d, .service-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (limit between -8 and +8 deg)
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 5. Animated Counter for "Clients & Statistics"
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedStats = false;

  function animateCounters() {
    statNumbers.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        el.textContent = currentVal.toString();

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          el.textContent = target.toString();
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  if (statsSection && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedStats) {
            hasAnimatedStats = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.25 }
    );
    statsObserver.observe(statsSection);
  }

  // 6. Project Details Modal System
  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-description');
  const modalTechStack = document.getElementById('modal-tech-stack');
  const modalFeatures = document.getElementById('modal-features');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const projectDetailsData = {
    cybershield: {
      title: 'CyberShield Dashboard',
      category: 'Network Security • Telemetry Monitoring',
      description: 'A fictional, high-fidelity security operations center (SOC) dashboard engineered to simulate real-time packet inspection, automated intrusion alert triggers, DDoS mitigation monitoring, and firewall rule enforcement.',
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'WebSockets', 'Chart.js Simulation'],
      features: [
        'Real-time traffic throughput and packet drop telemetry visualizer',
        'Automated alert classification (Low, Warning, Critical threat levels)',
        'Simulated IP geolocation tracking and threat intelligence feed',
        'Interactive firewall port blocker and defensive rule toggles'
      ]
    },
    novastore: {
      title: 'NovaStore E-Commerce',
      category: 'Full-Stack Web App • E-Commerce',
      description: 'A futuristic digital marketplace concept featuring high-performance product indexing, multi-criteria filtering, local storage state synchronization, and an interactive 3D cart drawer.',
      tech: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Local State', 'REST API Mock'],
      features: [
        'Instant multi-parameter search and dynamic category filter tags',
        'Interactive sliding cart tray with animated item counter',
        'Persistent cart state using localStorage key-value architecture',
        'Responsive checkout validation workflow with responsive micro-interactions'
      ]
    },
    campusconnect: {
      title: 'CampusConnect Student Portal',
      category: 'Academic Management • University Systems',
      description: 'A dedicated student academic portal concept designed for university environments. Provides comprehensive course enrollment workflows, GPA calculation engines, semester timetables, and secure attendance verification.',
      tech: ['React', 'Node.js', 'SQL', 'Express', 'JWT Auth'],
      features: [
        'Modular student profile with verified transcript and grade breakdowns',
        'Weekly course schedule with conflict detection and venue mapping',
        'Direct lecturer messaging hub and assignment dropboxes',
        'Role-based security architecture separating student and faculty access'
      ]
    },
    portfolio3d: {
      title: '3D Portfolio Experience',
      category: 'Interactive 3D Web • Creative Engineering',
      description: 'A cutting-edge personal portfolio for Yawar Imran showcasing 3D WebGL geometry, CSS3 matrix transforms, smooth scrollspy navigation, and secure backend SMTP contact delivery.',
      tech: ['HTML5', 'CSS3 3D', 'Vanilla JavaScript', 'Three.js', 'Node.js / SMTP'],
      features: [
        'Custom 3D rotating geometric sphere with orbiting network nodes',
        'Dynamic background particle constellation with proximity connection lines',
        'Interactive 3D card tilt and 180° perspective flip cards',
        'Backend SMTP email delivery powered by Node.js and Nodemailer'
      ]
    }
  };

  document.querySelectorAll('.btn-view-project').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectDetailsData[projectId];
      if (!data || !projectModal) return;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalDescription) modalDescription.textContent = data.description;

      if (modalTechStack) {
        modalTechStack.innerHTML = data.tech
          .map((t) => `<span class="tech-badge">${t}</span>`)
          .join('');
      }

      if (modalFeatures) {
        modalFeatures.innerHTML = data.features
          .map((f) => `<li class="modal-feature-item"><i>&#x2714;</i> <span>${f}</span></li>`)
          .join('');
      }

      projectModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 7. Check SMTP Backend Health Status
  const smtpStatusBadge = document.getElementById('smtp-status-badge');
  const smtpStatusText = document.getElementById('smtp-status-text');

  fetch('/api/smtp-status')
    .then((res) => res.json())
    .then((data) => {
      if (smtpStatusBadge && smtpStatusText) {
        if (data.configured) {
          smtpStatusBadge.innerHTML = '<span class="status-dot-live"></span> SMTP Live Ready';
          smtpStatusBadge.style.color = 'var(--accent-emerald)';
          smtpStatusText.textContent = `Emails will be dispatched to ${data.receiver} via ${data.host}:${data.port}.`;
        } else {
          smtpStatusBadge.innerHTML = '<span class="status-dot-live" style="background:#38bdf8;box-shadow:0 0 10px #38bdf8;"></span> Server Active';
          smtpStatusBadge.style.color = '#38bdf8';
          smtpStatusText.textContent = 'Backend Node.js server is online and active with message intake and server logging.';
        }
      }
    })
    .catch((err) => {
      console.warn('SMTP status check unreachable:', err);
    });

  // 8. Contact Form Handling (Validation + SMTP Post)
  const contactForm = document.getElementById('contact-form');
  const alertBox = document.getElementById('contact-form-alert');
  const submitBtn = document.getElementById('submit-contact-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset errors & alerts
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

      // Validation
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
        showFieldError('subject-error', 'Please enter a subject (at least 2 characters).');
        hasError = true;
      }

      if (message.length < 10) {
        showFieldError('message-error', 'Please enter your message (at least 10 characters).');
        hasError = true;
      }

      if (hasError) return;

      // Trigger loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Transmitting Message...';
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (alertBox) {
            alertBox.className = 'form-alert success';
            alertBox.textContent = result.message || 'Thank you! Your message has been sent successfully.';
            alertBox.style.display = 'block';
          }
          contactForm.reset();
        } else {
          if (alertBox) {
            alertBox.className = 'form-alert error';
            alertBox.textContent = result.error || 'Unable to deliver message. Please try again.';
            alertBox.style.display = 'block';
          }
        }
      } catch (networkErr) {
        if (alertBox) {
          alertBox.className = 'form-alert error';
          alertBox.textContent = 'Network communication error. Please ensure the server is running.';
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

  function showFieldError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('active');
    }
  }
});
