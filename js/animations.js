/* ==========================================================================
   Areesha Amjad — Premium Graphic Designer Portfolio
   Animation & 3D Interaction Engine (Pure Vanilla JavaScript)
   ========================================================================== */

/**
 * Initializes 3D Tilt effect on interactive cards (Skills, Services, Portrait)
 */
export function init3DTiltCards() {
  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (!tiltElements.length) return;

  tiltElements.forEach((card) => {
    // Inject subtle glare reflection element if missing
    if (!card.querySelector('.tilt-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);
    }

    const glare = card.querySelector('.tilt-glare');
    const maxTilt = parseFloat(card.getAttribute('data-tilt-max') || '8');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (((y - centerY) / centerY) * -maxTilt).toFixed(2);
      const rotateY = (((x - centerX) / centerX) * maxTilt).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      if (glare) {
        const glareX = ((x / rect.width) * 100).toFixed(1);
        const glareY = ((y / rect.height) * 100).toFixed(1);
        glare.style.setProperty('--glare-x', `${glareX}%`);
        glare.style.setProperty('--glare-y', `${glareY}%`);
        glare.style.setProperty('--glare-opacity', '0.25');
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      if (glare) {
        glare.style.setProperty('--glare-opacity', '0');
      }
    });
  });
}

/**
 * Interactive 3D Parallax for Hero Artwork Stage
 */
export function initHeroParallax() {
  const stage = document.getElementById('hero-visual-stage');
  const scene = document.getElementById('hero-3d-scene');
  if (!stage || !scene) return;

  let bounds = stage.getBoundingClientRect();
  window.addEventListener('resize', () => {
    bounds = stage.getBoundingClientRect();
  });

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    if (mouseX >= -100 && mouseX <= bounds.width + 100 &&
        mouseY >= -100 && mouseY <= bounds.height + 100) {
      const normX = (mouseX / bounds.width - 0.5) * 2;
      const normY = (mouseY / bounds.height - 0.5) * 2;
      targetX = normX * 12; // tilt degrees
      targetY = -normY * 10;
    } else {
      targetX = 0;
      targetY = 0;
    }
  });

  // Smooth lerp loop
  function render() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    scene.style.transform = `perspective(1000px) rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/**
 * Scroll Reveal using IntersectionObserver
 */
export function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * Ambient floating canvas artwork background for hero
 */
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 400);
  let height = (canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : 500);

  window.addEventListener('resize', () => {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    }
  });

  // Generate subtle geometric design particles
  const items = Array.from({ length: 14 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 30 + 10,
    type: Math.random() > 0.5 ? 'circle' : 'cross',
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    color: Math.random() > 0.6 ? 'rgba(200, 100, 70, 0.12)' : 'rgba(220, 161, 94, 0.15)',
    rotation: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.01,
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);

    items.forEach((item) => {
      item.x += item.vx;
      item.y += item.vy;
      item.rotation += item.vr;

      if (item.x < -40) item.x = width + 40;
      if (item.x > width + 40) item.x = -40;
      if (item.y < -40) item.y = height + 40;
      if (item.y > height + 40) item.y = -40;

      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);

      if (item.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, item.size / 2, 0, Math.PI * 2);
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      } else {
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-item.size / 2, 0);
        ctx.lineTo(item.size / 2, 0);
        ctx.moveTo(0, -item.size / 2);
        ctx.lineTo(0, item.size / 2);
        ctx.stroke();
      }
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
