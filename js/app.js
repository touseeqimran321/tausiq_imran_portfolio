/**
 * Professional Portfolio Controller
 * Tausiq Imran — Full-Stack Developer
 *
 * Implements:
 * - Interactive 3D WebGL centerpiece with drag orbit & mode switcher
 * - Dynamic card spotlight illumination effect
 * - Interactive Project Filtering (All, Full-Stack, Frontend, Backend)
 * - Interactive Case Study Modal with deep architecture specs
 * - Interactive Tech Inspector & live code preview in Skills
 * - Interactive Project Scope & Timeline Estimator
 * - Accent Color Theme Switcher (Cyan, Emerald, Violet, Amber)
 * - Accessible Contact Form with verified validation
 */

import { Portfolio3DEngine } from './portfolio3d.js';

// Project Case Study Data
const PROJECT_STUDIES = {
  apex: {
    id: 'apex',
    title: 'Apex Cloud Analytics Platform',
    category: 'Full-Stack SaaS & Cloud Telemetry',
    summary:
      'A high-throughput telemetry and metrics dashboard processing 25,000+ events per second with sub-50ms query latency, streaming WebSockets, and role-based multi-tenant security.',
    badge: 'Enterprise Telemetry',
    stats: [
      { label: 'Ingestion Rate', val: '25k evt/s' },
      { label: 'Query P95', val: '38ms' },
      { label: 'Test Coverage', val: '94%' },
      { label: 'Uptime SLA', val: '99.95%' },
    ],
    architecture: [
      'Frontend: Next.js 14 App Router, React Server Components, Tailwind CSS, Canvas-based charting for 60fps graph renders.',
      'Backend: Node.js clustered microservices with Express and WebSocket pub/sub broadcasting.',
      'Persistence: PostgreSQL with timescaled partition tables and Redis caching cluster for sub-millisecond hot reads.',
      'DevOps: Docker containers, GitHub Actions CI/CD pipeline, and automatic zero-downtime rollouts.',
    ],
    challenges:
      'Challenge: Rendering thousands of concurrent real-time metric streams without dropping UI framerates.\nSolution: Implemented offscreen Web Workers for delta calculation, batching WebSocket packets at 60Hz and pushing to an optimized HTML5 Canvas chart renderer.',
    tech: ['React 19', 'Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'WebSockets'],
  },
  chronos: {
    id: 'chronos',
    title: 'Chronos Headless E-Commerce Engine',
    category: 'High-Performance Commerce & Edge Delivery',
    summary:
      'Sub-second edge commerce engine handling high-concurrency flash sales, server-side rendered catalogs, atomic cart synchronization, and PCI-compliant checkout.',
    badge: 'Sub-Second Edge',
    stats: [
      { label: 'Lighthouse Score', val: '99/100' },
      { label: 'First Contentful Paint', val: '0.42s' },
      { label: 'Checkout Conversion', val: '+28%' },
      { label: 'Cart Sync Latency', val: '18ms' },
    ],
    architecture: [
      'Frontend: Next.js with incremental static regeneration (ISR) for instant product detail page loads.',
      'Backend: RESTful PHP & Node.js API gateway with optimistic inventory locking.',
      'Database: ACID-compliant relational schemas with pessimistic row-locking on cart transactions to eliminate race conditions.',
      'Payment: Fully integrated multi-currency Stripe webhook listeners with automated idempotency keys.',
    ],
    challenges:
      'Challenge: Preventing overselling during concurrent flash-sale traffic spikes.\nSolution: Engineered a distributed atomic lock pipeline ensuring inventory decr/incr operations occur atomically before processing payment intents.',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PHP API', 'PostgreSQL', 'Tailwind', 'Stripe'],
  },
  nexus: {
    id: 'nexus',
    title: 'Nexus Enterprise Component System',
    category: 'Design Systems & Accessibility Architecture',
    summary:
      'A production-grade, multi-brand React UI system with 60+ accessible components, automated Figma token extraction, zero-runtime CSS tokens, and WCAG AA conformance.',
    badge: '100% Accessible',
    stats: [
      { label: 'Component Suite', val: '65+ UI Elements' },
      { label: 'WCAG Conformance', val: 'Level AA' },
      { label: 'Bundle Impact', val: '< 14kb Gzipped' },
      { label: 'Figma Sync', val: 'Automated' },
    ],
    architecture: [
      'Architecture: Headless Radix primitive foundation wrapped in customizable semantic token utilities.',
      'Tokens: JSON-based design tokens compiled into CSS custom properties and typed Tailwind presets.',
      'Testing: 100% automated visual regression tests via Playwright, plus axe-core accessibility auditing in CI.',
      'Documentation: Interactive Storybook with live props playground, keyboard navigation maps, and color contrast checkers.',
    ],
    challenges:
      'Challenge: Supporting multi-brand theming with contrasting dark/light modes without CSS bundle bloat.\nSolution: Designed pure CSS variable cascades scoped to data-attributes, eliminating JavaScript theme-recalc overhead.',
    tech: ['React', 'TypeScript', 'CSS Variables', 'Storybook', 'Figma API', 'Playwright', 'a11y'],
  },
  pulse: {
    id: 'pulse',
    title: 'Pulse Distributed State & Collab Engine',
    category: 'Real-Time Sync & WebSocket Infrastructure',
    summary:
      'A collaborative multiplayer workspace engine enabling real-time document editing, cursor broadcasts, conflict resolution via CRDTs, and offline-first synchronization.',
    badge: 'Zero Conflict Sync',
    stats: [
      { label: 'Sync Latency', val: '12ms' },
      { label: 'Peer Capacity', val: '500+ / doc' },
      { label: 'Offline Support', val: 'Full IndexedDB' },
      { label: 'Reconnection', val: 'Auto-Healing' },
    ],
    architecture: [
      'State Engine: Yjs CRDTs (Conflict-free Replicated Data Types) for deterministic document convergence without central locks.',
      'Transport: Binary WebSocket protocol with fallback to HTTP long-polling behind Cloudflare load balancers.',
      'Offline: Local-first persistence in browser IndexedDB with automatic background delta sync upon network restoration.',
    ],
    challenges:
      'Challenge: Resolving network partition splits where two users edit identical paragraphs while offline.\nSolution: Implemented state-based CRDT vectors with tombstone garbage collection that merge deterministically once reconnected.',
    tech: ['TypeScript', 'WebSockets', 'Node.js', 'CRDTs', 'IndexedDB', 'React', 'Docker'],
  },
};

// Tech Playground Code Samples
const TECH_SNIPPETS = {
  react: {
    title: 'Modern React 19 & Next.js Architecture',
    subtitle: 'Server Components, Suspense Streaming & Custom Hooks',
    metric: 'Lighthouse Performance: 99 / 100',
    code: `// Scalable typed data fetcher with cache deduplication
export async function getProductCatalog(tenantId: string): Promise<CatalogResponse> {
  'use server';
  const data = await db.query.products.findMany({
    where: eq(products.tenantId, tenantId),
    with: { variants: true, inventory: true }
  });
  return sanitizeCatalog(data);
}

// Composable UI hook with optimistic local mutation
export function useCartActions() {
  const [cart, setCart] = useOptimistic(initialCart, (state, update) => ({
    ...state,
    items: [...state.items, update]
  }));
  return { cart, addItem: (item) => startTransition(() => setCart(item)) };
}`,
  },
  node: {
    title: 'Node.js & Express RESTful API Gateway',
    subtitle: 'Clustered process, rate-limiting, and middleware security',
    metric: 'Throughput: 18,500 req/sec @ 14ms latency',
    code: `// Resilient controller with schema validation & structured error logs
import { z } from 'zod';
import { Router } from 'express';

const apiRouter = Router();
const RequestSchema = z.object({
  projectId: z.string().uuid(),
  eventPayload: z.record(z.unknown()),
  timestamp: z.number().int()
});

apiRouter.post('/v1/telemetry', rateLimiter({ max: 100 }), async (req, res, next) => {
  try {
    const payload = RequestSchema.parse(req.body);
    const result = await telemetryQueue.push(payload);
    return res.status(202).json({ ack: true, queueId: result.id });
  } catch (err) {
    next(new ApiError(400, 'Invalid telemetry schema', err));
  }
});`,
  },
  database: {
    title: 'Relational Database Design & Query Optimization',
    subtitle: 'ACID transactions, indexed foreign keys, and normalized schemas',
    metric: 'Average Indexed Query Execution: 3.2ms',
    code: `-- High-performance partitioned schema for telemetry events
CREATE TABLE telemetry_events (
    id UUID DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    event_type VARCHAR(64) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Multi-column B-Tree index for instant filtered lookups
CREATE INDEX idx_telemetry_lookup 
ON telemetry_events(tenant_id, event_type, created_at DESC);`,
  },
  typescript: {
    title: 'Strict TypeScript Type Systems',
    subtitle: 'Discriminated unions, compile-time validation, generic utilities',
    metric: 'Zero Any Policy • 100% Strict Type Safety',
    code: `// Fully typed API response contract with Discriminated Unions
export type ServiceResult<TData, TError = string> = 
  | { success: true; data: TData; latencyMs: number }
  | { success: false; error: TError; code: number };

export type ApiResponse<T> = Promise<ServiceResult<T>>;

// Type-safe schema builder enforcing domain constraints
export interface SystemHealthReport {
  readonly serviceName: string;
  readonly status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  readonly cpuLoadPct: number;
  readonly memoryUsageMb: number;
  readonly activeSockets: number;
}`,
  },
};

// =========================================================================
// NATIVE WEB AUDIO API SYNTHESIZER (Micro-interactions)
// =========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playChime();
    }
    return this.enabled;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      [440, 554, 659, 880].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.06 + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.06);
        osc.stop(this.ctx.currentTime + i * 0.06 + 0.09);
      });
    } catch (e) {}
  }
}

class PortfolioController {
  constructor() {
    this.engine3d = null;
    this.sfx = new SoundFX();
    this.init();
  }

  init() {
    // 1. Initialize 3D Engine
    this.engine3d = new Portfolio3DEngine();

    // 2. Setup navigation, smooth scrolling & mobile drawer
    this.initNavigation();

    // 3. Setup Spotlight Card Hover Effect
    this.initSpotlightCards();

    // 4. Setup Theme Accent Switcher
    this.initThemeSwitcher();

    // 5. Setup Project Filters & Case Study Modal
    this.initProjectInteractions();

    // 6. Setup Tech Inspector (Skills section)
    this.initTechInspector();

    // 7. Setup Live Architecture Request Flow Simulator
    this.initArchitectureSimulator();

    // 8. Setup Interactive Developer CLI Terminal (TI-SHELL)
    this.initDeveloperTerminal();

    // 9. Setup Animated Executive Impact Numbers
    this.initImpactStats();

    // 10. Setup Executive Resume Modal
    this.initResumeModal();

    // 11. Setup Project Scope & Timeline Estimator
    this.initProjectEstimator();

    // 12. Setup Contact Form & Clipboard helpers
    this.initContactForm();
  }

  // =========================================================================
  // NAVIGATION & SCROLL
  // =========================================================================
  initNavigation() {
    const mobileBtn = document.getElementById('nav-mobile-btn');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });

      mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Scroll to contact helper
    document.querySelectorAll('.btn-scroll-contact').forEach((btn) => {
      btn.addEventListener('click', () => {
        const contactSec = document.getElementById('contact');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Active nav link highlight on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener(
      'scroll',
      () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 120;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      },
      { passive: true }
    );
  }

  // =========================================================================
  // CARD SPOTLIGHT MOUSE GLOW
  // =========================================================================
  initSpotlightCards() {
    const cards = document.querySelectorAll(
      '.project-card, .tech-skill-card, .about-card-prose, .about-metrics-card, .step-card, .edu-card, .estimator-card, .philosophy-banner-card'
    );

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // =========================================================================
  // THEME ACCENT COLOR SWITCHER
  // =========================================================================
  initThemeSwitcher() {
    const accentPills = document.querySelectorAll('.accent-picker-pill');
    const colorThemes = {
      cyan: {
        primary: '#38bdf8',
        blue: '#0284c7',
        glow: 'rgba(56, 189, 248, 0.35)',
        hex: 0x38bdf8,
      },
      emerald: {
        primary: '#10b981',
        blue: '#059669',
        glow: 'rgba(16, 185, 129, 0.35)',
        hex: 0x10b981,
      },
      violet: {
        primary: '#a855f7',
        blue: '#7c3aed',
        glow: 'rgba(168, 85, 247, 0.35)',
        hex: 0xa855f7,
      },
      amber: {
        primary: '#f59e0b',
        blue: '#d97706',
        glow: 'rgba(245, 158, 11, 0.35)',
        hex: 0xf59e0b,
      },
    };

    accentPills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        const themeKey = e.currentTarget.getAttribute('data-accent');
        const theme = colorThemes[themeKey];
        if (!theme) return;

        accentPills.forEach((p) => p.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Update root CSS variables
        document.documentElement.style.setProperty('--accent-cyan', theme.primary);
        document.documentElement.style.setProperty('--accent-blue', theme.blue);
        document.documentElement.style.setProperty('--accent-glow', theme.glow);

        // Update 3D WebGL lights & materials
        if (this.engine3d) {
          this.engine3d.setAccentColor(theme.hex);
        }
      });
    });
  }

  // =========================================================================
  // PROJECT FILTERING & INTERACTIVE CASE STUDY MODAL
  // =========================================================================
  initProjectInteractions() {
    // Project Category Filtering
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.getAttribute('data-filter');
        filterBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInCard 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Case Study Modal Elements
    const modal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const openModal = (projectId) => {
      const data = PROJECT_STUDIES[projectId];
      if (!data || !modal) return;

      document.getElementById('modal-project-title').textContent = data.title;
      document.getElementById('modal-project-category').textContent = data.category;
      document.getElementById('modal-project-summary').textContent = data.summary;
      document.getElementById('modal-project-badge').textContent = data.badge;

      // Stats row
      const statsContainer = document.getElementById('modal-stats-row');
      if (statsContainer) {
        statsContainer.innerHTML = data.stats
          .map(
            (s) => `
          <div class="modal-stat-box">
            <span class="modal-stat-val">${s.val}</span>
            <span class="modal-stat-label">${s.label}</span>
          </div>
        `
          )
          .join('');
      }

      // Architecture List
      const archContainer = document.getElementById('modal-arch-list');
      if (archContainer) {
        archContainer.innerHTML = data.architecture
          .map(
            (item) => `
          <li class="modal-arch-item">
            <span class="arch-check">&bull;</span>
            <span>${item}</span>
          </li>
        `
          )
          .join('');
      }

      // Challenges
      const challengeEl = document.getElementById('modal-challenge-text');
      if (challengeEl) {
        challengeEl.textContent = data.challenges;
      }

      // Tech Pills
      const techContainer = document.getElementById('modal-tech-pills');
      if (techContainer) {
        techContainer.innerHTML = data.tech
          .map((t) => `<span class="project-tech-pill">${t}</span>`)
          .join('');
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    // Attach trigger to buttons
    document.querySelectorAll('.btn-open-case-study').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const projectId = e.currentTarget.getAttribute('data-project');
        if (projectId) openModal(projectId);
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // =========================================================================
  // TECH INSPECTOR (Skills Section Interactive Sandbox)
  // =========================================================================
  initTechInspector() {
    const tabs = document.querySelectorAll('.inspector-tab');
    const titleEl = document.getElementById('inspector-title');
    const subEl = document.getElementById('inspector-sub');
    const metricEl = document.getElementById('inspector-metric');
    const codeEl = document.getElementById('inspector-code');

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-tech');
        const snippet = TECH_SNIPPETS[key];
        if (!snippet) return;

        tabs.forEach((t) => t.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if (titleEl) titleEl.textContent = snippet.title;
        if (subEl) subEl.textContent = snippet.subtitle;
        if (metricEl) metricEl.textContent = snippet.metric;
        if (codeEl) codeEl.textContent = snippet.code;
      });
    });
  }

  // =========================================================================
  // INTERACTIVE PROJECT ESTIMATOR
  // =========================================================================
  initProjectEstimator() {
    const typeSelect = document.getElementById('est-type');
    const scopeSelect = document.getElementById('est-scope');
    const timelineVal = document.getElementById('est-result-timeline');
    const stackVal = document.getElementById('est-result-stack');
    const sendBtn = document.getElementById('btn-est-send');

    const recalculate = () => {
      if (!typeSelect || !scopeSelect || !timelineVal || !stackVal) return;

      const type = typeSelect.value;
      const scope = scopeSelect.value;

      let timeline = '2 – 3 Weeks';
      let stack = 'React 19, TypeScript, Tailwind, REST API';

      if (type === 'saas') {
        stack = 'Next.js 14, Node.js API, PostgreSQL, Redis, Stripe, Docker';
        timeline = scope === 'mvp' ? '3 – 4 Weeks' : '6 – 8 Weeks';
      } else if (type === 'ecommerce') {
        stack = 'Next.js ISR, Node.js Cart Gateway, PostgreSQL, Stripe Webhooks';
        timeline = scope === 'mvp' ? '2 – 3 Weeks' : '4 – 6 Weeks';
      } else if (type === 'api') {
        stack = 'Node.js Express / TS, PostgreSQL, Redis Cache, JWT Auth, Docker';
        timeline = scope === 'mvp' ? '1 – 2 Weeks' : '3 – 4 Weeks';
      } else {
        // web-app
        stack = 'React 19, TypeScript, Node.js Services, Responsive CSS3 / Tailwind';
        timeline = scope === 'mvp' ? '2 – 3 Weeks' : '4 – 5 Weeks';
      }

      timelineVal.textContent = timeline;
      stackVal.textContent = stack;

      if (sendBtn) {
        const mailSubject = `Project Inquiry: ${type.toUpperCase()} (${scope.toUpperCase()})`;
        const mailBody = `Hi Tausiq,\n\nI used your portfolio project estimator and would like to discuss building:\n- Project Type: ${typeSelect.options[typeSelect.selectedIndex].text}\n- Target Scope: ${scopeSelect.options[scopeSelect.selectedIndex].text}\n- Recommended Timeline: ${timeline}\n- Stack: ${stack}\n\nPlease let me know your availability for an introductory call.\n\nBest regards,`;
        sendBtn.setAttribute(
          'href',
          `mailto:touseeqimran321@gmail.com?subject=${encodeURIComponent(
            mailSubject
          )}&body=${encodeURIComponent(mailBody)}`
        );
      }
    };

    if (typeSelect && scopeSelect) {
      typeSelect.addEventListener('change', recalculate);
      scopeSelect.addEventListener('change', recalculate);
      recalculate();
    }
  }

  // =========================================================================
  // CONTACT FORM VALIDATION & DIRECT EMAIL LAUNCH
  // =========================================================================
  initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const alertBox = document.getElementById('form-alert-msg');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        if (alertBox) {
          alertBox.className = 'form-alert-msg error';
          alertBox.textContent = 'Please fill out all fields (Name, Email, and Message).';
          alertBox.style.display = 'block';
        }
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (alertBox) {
          alertBox.className = 'form-alert-msg error';
          alertBox.textContent = 'Please provide a valid email address.';
          alertBox.style.display = 'block';
        }
        return;
      }

      if (alertBox) {
        alertBox.className = 'form-alert-msg success';
        alertBox.textContent = 'Opening your email client to connect with Tausiq Imran...';
        alertBox.style.display = 'block';
      }

      const mailtoUri = `mailto:touseeqimran321@gmail.com?subject=${encodeURIComponent(
        'Project Inquiry from ' + name
      )}&body=${encodeURIComponent(message + '\n\nBest regards,\n' + name + '\nEmail: ' + email)}`;

      setTimeout(() => {
        window.location.href = mailtoUri;
        form.reset();
        setTimeout(() => {
          if (alertBox) alertBox.style.display = 'none';
        }, 5000);
      }, 600);
    });

    // Copy email buttons
    document.querySelectorAll('.btn-copy-email').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.copyEmailToClipboard();
      });
    });

    // SFX Toggle button
    const sfxBtn = document.getElementById('btn-sfx-toggle');
    const sfxIcon = document.getElementById('sfx-icon');
    if (sfxBtn && sfxIcon) {
      sfxBtn.addEventListener('click', () => {
        const isEnabled = this.sfx.toggle();
        if (isEnabled) {
          sfxIcon.innerHTML = '&#128266;';
          sfxBtn.classList.add('active');
          this.showToast('Audio micro-feedback enabled');
        } else {
          sfxIcon.innerHTML = '&#128263;';
          sfxBtn.classList.remove('active');
          this.showToast('Audio feedback muted');
        }
      });
    }
  }

  // =========================================================================
  // TOAST NOTIFICATIONS & CLIPBOARD
  // =========================================================================
  showToast(message) {
    const toast = document.getElementById('global-toast');
    const textEl = document.getElementById('global-toast-text');
    if (!toast) return;
    if (textEl) textEl.textContent = message;
    toast.classList.add('show');
    if (this.sfx) this.sfx.playChime();
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyEmailToClipboard() {
    const email = 'touseeqimran321@gmail.com';
    if (this.sfx) this.sfx.playClick();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          this.showToast(`Email copied: ${email}`);
        })
        .catch(() => {
          this.showToast(`Contact: ${email}`);
        });
    } else {
      this.showToast(`Contact: ${email}`);
    }
  }

  // =========================================================================
  // ANIMATED EXECUTIVE IMPACT STATS COUNTER
  // =========================================================================
  initImpactStats() {
    const counters = document.querySelectorAll('.counter-target');
    if (!counters.length) return;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            counters.forEach((counter) => {
              const target = parseFloat(counter.getAttribute('data-target'));
              const isFloat = target % 1 !== 0;
              const isLessThan = counter.textContent.startsWith('<');
              const duration = 1800;
              const startTime = performance.now();

              const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic: 1 - (1 - x)^3
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = target * ease;

                if (isLessThan) {
                  counter.textContent = `<${Math.round(current)}`;
                } else if (isFloat) {
                  counter.textContent = current.toFixed(1);
                } else {
                  counter.textContent = Math.round(current);
                }

                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                } else {
                  if (isLessThan) counter.textContent = `<${target}`;
                  else if (isFloat) counter.textContent = target.toFixed(1);
                  else counter.textContent = target;
                }
              };
              requestAnimationFrame(updateCounter);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const statsSection = document.getElementById('executive-stats');
    if (statsSection) observer.observe(statsSection);
  }

  // =========================================================================
  // LIVE ARCHITECTURE REQUEST FLOW SIMULATOR
  // =========================================================================
  initArchitectureSimulator() {
    const btn = document.getElementById('btn-simulate-packet');
    const nodes = [
      document.getElementById('node-client'),
      document.getElementById('node-edge'),
      document.getElementById('node-gateway'),
      document.getElementById('node-database'),
    ];
    const statusEl = document.getElementById('flow-status');
    const rttEl = document.getElementById('flow-rtt');
    const payloadEl = document.getElementById('flow-payload');

    if (!btn || !nodes[0]) return;

    let isSimulating = false;

    btn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      btn.disabled = true;
      btn.style.opacity = '0.6';
      if (this.sfx) this.sfx.playClick();

      nodes.forEach((n) => n?.classList.remove('active'));
      if (statusEl) statusEl.textContent = 'Routing request...';
      if (rttEl) rttEl.textContent = 'Measuring...';
      if (payloadEl) payloadEl.textContent = 'SYN / GET /api/v2/telemetry/nodes';

      const latencies = [80, 220, 420, 640];
      latencies.forEach((delay, idx) => {
        setTimeout(() => {
          nodes.forEach((n, i) => {
            if (i === idx) n?.classList.add('active');
            else n?.classList.remove('active');
          });
          if (this.sfx) this.sfx.playClick();
        }, delay);
      });

      setTimeout(() => {
        nodes.forEach((n) => n?.classList.add('active'));
        const simulatedRtt = (Math.random() * 6 + 29).toFixed(1);
        if (statusEl) statusEl.textContent = '200 OK • Completed';
        if (rttEl) rttEl.textContent = `${simulatedRtt}ms (P95)`;
        if (payloadEl)
          payloadEl.textContent = `{"status":"healthy","uptime":99.99,"cache":"redis-hit"}`;
        if (this.sfx) this.sfx.playSuccess();
        this.showToast(`Request cycle resolved in ${simulatedRtt}ms`);

        setTimeout(() => {
          nodes.forEach((n) => n?.classList.remove('active'));
          btn.disabled = false;
          btn.style.opacity = '1';
          isSimulating = false;
        }, 2500);
      }, 900);
    });
  }

  // =========================================================================
  // INTERACTIVE DEVELOPER CLI TERMINAL (TI-SHELL v2.6)
  // =========================================================================
  initDeveloperTerminal() {
    const terminalInput = document.getElementById('cli-terminal-input');
    const historyLog = document.getElementById('cli-history-log');
    const viewport = document.getElementById('cli-output-viewport');
    const chipBtns = document.querySelectorAll('.cli-chip-btn');

    if (!terminalInput || !historyLog) return;

    const executeCommand = (rawCmd) => {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      if (this.sfx) this.sfx.playClick();

      if (cmd === 'clear' || cmd === 'cls') {
        historyLog.innerHTML = '';
        terminalInput.value = '';
        return;
      }

      let response = '';
      switch (cmd) {
        case 'help':
          response = `Available commands in TI-SHELL v2.6:
  • help      : List all available system commands
  • bio       : Academic foundation, university & engineering philosophy
  • skills    : Technical stack matrix (Frontend, Backend, DB, DevOps)
  • projects  : Production systems overview & architecture highlights
  • stats     : Operational metrics & system telemetry
  • contact   : Direct email, location & contact SLA
  • hire      : Trigger direct priority recruitment intro sequence
  • clear     : Clear terminal history window`;
          break;

        case 'bio':
          response = `Candidate: Tausiq Imran
Title    : Full-Stack Developer
Academics: Bachelor of Science in Computer Science (BSCS)
Campus   : Lahore Garrison University, Lahore, Pakistan
Manifesto: "Code is creative engineering. I design systems, engineer experiences, and solve real-world problems."`;
          break;

        case 'skills':
          response = `TECHNICAL CAPABILITIES:
  [Frontend] : React 19, Next.js (App Router), TypeScript, Tailwind CSS, WebGL/Three.js
  [Backend]  : Node.js, Express, REST APIs, GraphQL, Microservices, WebSockets
  [Database] : PostgreSQL, MySQL, Redis Caching, Prisma ORM, Drizzle
  [DevOps]   : Docker, Linux/Bash, Git/GitHub Actions, Vite, Edge Compute`;
          break;

        case 'projects':
          response = `FEATURED PRODUCTION SYSTEMS:
  1. Apex Cloud Telemetry : Real-time distributed telemetry (50,000 synthetic metrics/sec)
  2. Chronos Store        : Headless multi-tenant e-commerce with deterministic Stripe checkout
  3. Nexus Collaborative  : Low-latency distributed workspace with operational transforms
  4. Pulse 3D Engine      : GPU-accelerated WebGL geometry visualizer`;
          break;

        case 'stats':
          response = `OPERATIONAL TELEMETRY:
  • Production Systems : 15+ Architected & Deployed
  • P95 Query Latency  : < 40ms
  • System Reliability : 99.9% Availability
  • Type Safety        : 100% Strict TypeScript
  • Lighthouse Score   : 99 / 100 Performance`;
          break;

        case 'contact':
          response = `DIRECT CHANNELS:
  • Email      : touseeqimran321@gmail.com
  • Location   : Lahore, Pakistan
  • Work Type  : Full-Time Software Roles & High-Impact Contracts
  • Turnaround : Within 12-24 hours`;
          break;

        case 'hire':
        case 'sudo hire':
          response = `★ [OFFER SEQUENCE TRIGGERED]
Direct route established to Tausiq Imran.
Email: touseeqimran321@gmail.com
Status: Ready for interview invitations, technical screenings, and full-stack challenges.`;
          this.showToast('Priority Offer Sequence Triggered! Connecting to Tausiq...');
          if (this.sfx) this.sfx.playSuccess();
          setTimeout(() => {
            const contactSec = document.getElementById('contact');
            if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
          }, 1200);
          break;

        default:
          response = `ti-shell: command not found: "${rawCmd}". Type 'help' for available commands.`;
          break;
      }

      const entry = document.createElement('div');
      entry.className = 'cli-history-entry';
      entry.innerHTML = `
        <div class="cli-history-cmd">
          <span class="prompt-user">tausiq@dev:~$</span>
          <span>${rawCmd}</span>
        </div>
        <div class="cli-history-response">${response}</div>
      `;
      historyLog.appendChild(entry);
      terminalInput.value = '';

      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    };

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(terminalInput.value);
      }
    });

    chipBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const cmd = e.currentTarget.getAttribute('data-cmd');
        if (cmd) executeCommand(cmd);
      });
    });
  }

  // =========================================================================
  // EXECUTIVE RESUME / CV MODAL
  // =========================================================================
  initResumeModal() {
    const modal = document.getElementById('resume-modal');
    const closeBtn = document.getElementById('btn-close-resume-modal');
    const backdrop = document.getElementById('resume-backdrop');
    const printBtn = document.getElementById('btn-print-resume');
    const inquireBtn = document.getElementById('btn-resume-inquire');

    const openModal = () => {
      if (!modal) return;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (this.sfx) this.sfx.playChime();
    };

    const closeModal = () => {
      if (!modal) return;
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (this.sfx) this.sfx.playClick();
    };

    document.querySelectorAll('.btn-open-resume-modal, #btn-nav-cv').forEach((btn) => {
      btn.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => {
        closeModal();
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioController();
});
