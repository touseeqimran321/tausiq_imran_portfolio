/**
 * Professional 3D Portfolio Engine
 * Tausiq Imran — Full-Stack Developer
 * Minimalist, elegant WebGL interactions, interactive 3D hero centerpiece,
 * card tilt physics, and architecture code playground.
 */

import * as THREE from 'three';

// Real-world code snippets and architectural details for Tausiq's technologies
export const TECH_DATA = {
  react: {
    name: 'React.js',
    category: 'frontend',
    tagline: 'Modern UI Component Architecture & State Management',
    description: 'Specializing in building reactive, component-driven web applications with modern React 18+ patterns, custom hooks, and optimized re-render cycles.',
    highlights: ['Server & Client Components', 'Custom Hook Systems', 'Performance Profiling', 'Context & State Machines'],
    snippet: `// Example: Modern reactive hook architecture
import { useState, useEffect, useCallback } from 'react';

export function useDataStream<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const sync = useCallback(async () => {
    setLoading(true);
    const result = await fetcher();
    setData(result);
    setLoading(false);
  }, [fetcher]);

  useEffect(() => { sync(); }, [sync]);
  return { data, loading, refetch: sync };
}`
  },
  nextjs: {
    name: 'Next.js',
    category: 'frontend',
    tagline: 'Full-Stack React Framework & SSR/SSG Production Systems',
    description: 'Developing high-performance, SEO-optimized web applications with Next.js App Router, Server Actions, edge caching, and automated static generation.',
    highlights: ['App Router Architecture', 'Edge Middleware', 'Hybrid Pre-Rendering', 'API Route Handlers'],
    snippet: `// Next.js App Router: Dynamic Edge Route
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    payload: { query, region: process.env.VERCEL_REGION }
  });
}`
  },
  typescript: {
    name: 'TypeScript',
    category: 'frontend',
    tagline: 'Type-Safe Software Engineering & Scalable Contracts',
    description: 'Enforcing strict type safety, predictable interfaces, and robust enterprise domain models to prevent runtime exceptions before code reaches production.',
    highlights: ['Generics & Utility Types', 'Discriminated Unions', 'API Contract Enforcement', 'Strict Null Checks'],
    snippet: `// Strict Domain Model & Type Inference
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

interface UserProfile {
  readonly id: string;
  name: string;
  role: 'developer' | 'architect' | 'lead';
  skills: ReadonlyArray<string>;
}

function parsePayload(input: unknown): Result<UserProfile> {
  // Safe runtime validation and typing
  return { success: true, data: input as UserProfile };
}`
  },
  nodejs: {
    name: 'Node.js',
    category: 'backend',
    tagline: 'High-Throughput Asynchronous Server Architecture',
    description: 'Designing modular microservices, RESTful APIs, and event-driven backend systems with asynchronous I/O and resilient middleware pipelines.',
    highlights: ['REST & WebSocket APIs', 'Async Event Loop', 'Secure Authentication (JWT)', 'Process Clustering'],
    snippet: `// Express / Node.js High-Throughput Service
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/projects', async (req: Request, res: Response) => {
  const { title, client, stack } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const record = await db.insert({ title, client, stack, createdAt: new Date() });
  return res.status(201).json({ success: true, record });
});`
  },
  php: {
    name: 'PHP',
    category: 'backend',
    tagline: 'Object-Oriented Backend Development & CMS Systems',
    description: 'Developing reliable server-side applications, custom CMS integrations, and database operations using modern PHP 8+ object-oriented standards.',
    highlights: ['PHP 8+ OOP Standards', 'Custom API Endpoints', 'Session & Auth Security', 'Database Layer (PDO)'],
    snippet: `<?php
declare(strict_types=1);

namespace App\\Services;

class ProjectEngine {
    public function __construct(private \\PDO $db) {}

    public function retrieveActive(int $limit = 10): array {
        $stmt = $this->db->prepare("SELECT * FROM projects WHERE status = 'active' LIMIT :limit");
        $stmt->bindValue(':limit', $limit, \\PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(\\PDO::FETCH_ASSOC);
    }
}`
  },
  database: {
    name: 'Database (SQL / NoSQL)',
    category: 'database',
    tagline: 'Data Modeling, Relational Integrity & Query Optimization',
    description: 'Architecting relational schemas (PostgreSQL, MySQL) and document stores, writing performant queries, indexing, and maintaining data consistency.',
    highlights: ['Relational Schema Design', 'ACID Compliance', 'Index Optimization', 'ORM & Direct SQL'],
    snippet: `-- Relational Schema with Constraints & Indexes
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(120) NOT NULL,
    category VARCHAR(50) NOT NULL,
    tech_stack TEXT[] NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_category ON projects(category);`
  },
  javascript: {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    tagline: 'Core Language Fundamentals & Interactive Systems',
    description: 'Deep mastery of DOM manipulation, functional programming patterns, event delegation, closures, and modern ESNext specifications.',
    highlights: ['ESNext Features', 'Event Loop & Promises', 'Functional Utilities', 'Interactive DOM APIs'],
    snippet: `// Asynchronous pipeline with functional composition
const pipeline = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const sanitize = str => str.trim().toLowerCase();
const slugify = str => str.replace(/\\s+/g, '-');

const createSlug = pipeline(sanitize, slugify);
console.log(createSlug('  Full-Stack Engineering  ')); // 'full-stack-engineering'`
  },
  html5: {
    name: 'HTML5',
    category: 'frontend',
    tagline: 'Semantic Web Architecture & Web Accessibility',
    description: 'Writing clean, accessible semantic HTML5 structures adhering to W3C standards, SEO best practices, and WCAG AA guidelines.',
    highlights: ['Semantic Landmarks', 'ARIA Specifications', 'Metadata & OpenGraph', 'Native Web Components'],
    snippet: `<!-- Accessible, semantic layout architecture -->
<section id="services" aria-labelledby="services-heading">
  <header>
    <h2 id="services-heading">Engineering Solutions</h2>
    <p>Scalable web systems built with modern standards.</p>
  </header>
  <ul role="list" class="solutions-grid">
    <!-- Component items -->
  </ul>
</section>`
  },
  css3: {
    name: 'CSS3 / Modern Styling',
    category: 'frontend',
    tagline: 'Fluid Design Systems, Responsive Grids & Animations',
    description: 'Crafting responsive layouts using CSS Grid, Flexbox, custom properties, fluid typography, and GPU-accelerated micro-interactions.',
    highlights: ['CSS Grid & Subgrid', 'Fluid clamp() Scaling', 'GPU Transforms', 'Design Tokens'],
    snippet: `/* Modern Responsive CSS Grid with Design Tokens */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: clamp(1rem, 2.5vw, 2rem);
  padding: clamp(1.25rem, 3vw, 2.5rem);
}

.interactive-card {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}`
  },
  bootstrap: {
    name: 'Bootstrap',
    category: 'frontend',
    tagline: 'Rapid Responsive Prototyping & Grid Consistency',
    description: 'Leveraging Bootstrap’s utility classes and fluid responsive grid to rapidly construct structured, mobile-first web layouts.',
    highlights: ['Responsive Breakpoints', 'Utility-First Classes', 'Modular Components', 'Custom Sass Theming'],
    snippet: `<!-- Clean, responsive grid layout -->
<div class="container py-5">
  <div class="row g-4 align-items-center">
    <div class="col-lg-6">
      <h3 class="fw-bold text-light">Clean Engineering</h3>
    </div>
    <div class="col-lg-6">
      <p class="text-secondary">Delivering reliable, scalable systems.</p>
    </div>
  </div>
</div>`
  },
  figma: {
    name: 'Figma',
    category: 'design',
    tagline: 'UI/UX Design Systems, Prototyping & Developer Handoff',
    description: 'Designing intuitive user interfaces, wireframes, atomic design systems, and responsive prototypes before turning them into production code.',
    highlights: ['Design Systems & Tokens', 'Auto Layout & Variants', 'High-Fidelity Wireframes', 'Design-to-Code Precision'],
    snippet: `/* Figma Design Tokens to CSS Output */
:root {
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --radius-md: 10px;
  --color-primary: #3b82f6;
  --color-surface: #11141a;
}`
  }
};

export class Professional3DShowcase {
  constructor() {
    this.canvas = document.getElementById('hero-3d-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.meshGroup = new THREE.Group();
    this.coreMesh = null;
    this.wireframeMesh = null;
    this.haloRings = [];
    this.clock = new THREE.Clock();

    // Mouse & physics
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isHovering = false;
    this.dragState = { isDragging: false, prevX: 0, prevY: 0, rotX: 0, rotY: 0 };

    if (this.canvas) {
      this.init3D();
      this.setupEventListeners();
      this.animate();
    }

    this.initCardTilt();
    this.initTechPlayground();
    this.initInteractiveFeatures();
  }

  // =========================================================================
  // 1. CLEAN 3D HERO VISUALIZER (Refined, Subtle, Apple/Stripe-level elegance)
  // =========================================================================
  init3D() {
    const width = this.canvas.clientWidth || 400;
    const height = this.canvas.clientHeight || 400;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 5.2);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    // Professional studio lighting: subtle, clean, soft reflections
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(3, 4, 4);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x3b82f6, 2.4);
    rimLight.position.set(-4, -2, -2);
    this.scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    this.scene.add(ambientLight);

    // Modern Glassy Crystal Geometry (Icosahedron / Faceted Diamond)
    const geometry = new THREE.IcosahedronGeometry(1.3, 0);

    // Frosted Physical Glass Core
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.2,
      roughness: 0.18,
      transmission: 0.65,
      thickness: 1.0,
      ior: 1.45,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    this.coreMesh = new THREE.Mesh(geometry, glassMaterial);
    this.meshGroup.add(this.coreMesh);

    // Clean Architectural Accent Edges
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.65,
    });
    this.wireframeMesh = new THREE.LineSegments(edges, lineMaterial);
    this.meshGroup.add(this.wireframeMesh);

    // Subtle Outer Orbit Ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.015, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    this.haloRings.push(ring);
    this.meshGroup.add(ring);

    this.scene.add(this.meshGroup);
  }

  setupEventListeners() {
    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      this.isHovering = inBounds;

      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mouse.targetX = nx;
      this.mouse.targetY = ny;
    });

    // Touch & Drag on 3D canvas
    this.canvas.addEventListener('mousedown', (e) => {
      this.dragState.isDragging = true;
      this.dragState.prevX = e.clientX;
      this.dragState.prevY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.dragState.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.dragState.isDragging) {
        const dx = e.clientX - this.dragState.prevX;
        const dy = e.clientY - this.dragState.prevY;
        this.dragState.rotY += dx * 0.008;
        this.dragState.rotX += dy * 0.008;
        this.dragState.prevX = e.clientX;
        this.dragState.prevY = e.clientY;
      }
    });

    // Touch handlers
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.dragState.isDragging = true;
        this.dragState.prevX = e.touches[0].clientX;
        this.dragState.prevY = e.touches[0].clientY;
      }
    });

    window.addEventListener('touchend', () => {
      this.dragState.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (this.dragState.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.dragState.prevX;
        const dy = e.touches[0].clientY - this.dragState.prevY;
        this.dragState.rotY += dx * 0.01;
        this.dragState.rotX += dy * 0.01;
        this.dragState.prevX = e.touches[0].clientX;
        this.dragState.prevY = e.touches[0].clientY;
      }
    });

    // Resize
    window.addEventListener('resize', () => {
      if (!this.canvas || !this.camera || !this.renderer) return;
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      if (width > 0 && height > 0) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // Smooth inertia
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

    if (this.meshGroup) {
      // Natural idle rotation
      this.meshGroup.rotation.y = elapsed * 0.4 + this.dragState.rotY + this.mouse.x * 0.5;
      this.meshGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.15 + this.dragState.rotX - this.mouse.y * 0.4;

      // Gentle floating levitation
      this.meshGroup.position.y = Math.sin(elapsed * 1.2) * 0.1;

      // Orbit ring counter-rotation
      if (this.haloRings[0]) {
        this.haloRings[0].rotation.z = elapsed * 0.6;
      }
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  // =========================================================================
  // 2. 3D CARD TILT ON HOVER (Linear / Stripe style physics)
  // =========================================================================
  initCardTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // =========================================================================
  // 3. INTERACTIVE TECH STACK PLAYGROUND & REAL CODE INSPECTOR
  // =========================================================================
  initTechPlayground() {
    const techButtons = document.querySelectorAll('.tech-pill');
    const filterButtons = document.querySelectorAll('.tech-filter-btn');
    const titleEl = document.getElementById('playground-title');
    const taglineEl = document.getElementById('playground-tagline');
    const descEl = document.getElementById('playground-desc');
    const highlightsEl = document.getElementById('playground-highlights');
    const codeEl = document.getElementById('playground-code');

    const updatePlayground = (key) => {
      const data = TECH_DATA[key];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.name;
      if (taglineEl) taglineEl.textContent = data.tagline;
      if (descEl) descEl.textContent = data.description;

      if (highlightsEl) {
        highlightsEl.innerHTML = data.highlights
          .map(h => `<li class="tech-highlight-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${h}</li>`)
          .join('');
      }

      if (codeEl) {
        codeEl.textContent = data.snippet;
      }

      techButtons.forEach(btn => {
        if (btn.dataset.tech === key) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    };

    // Tech pill click
    techButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tech;
        if (key) updatePlayground(key);
      });
    });

    // Category filter
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        techButtons.forEach(pill => {
          const pillCat = pill.dataset.category;
          if (cat === 'all' || pillCat === cat) {
            pill.style.display = 'inline-flex';
          } else {
            pill.style.display = 'none';
          }
        });
      });
    });

    // Default to React
    updatePlayground('react');
  }

  // =========================================================================
  // 4. INTERACTIVE FEATURES: EMAIL COPY & CONTACT FORM
  // =========================================================================
  initInteractiveFeatures() {
    // Copy email button
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('touseeqimran321@gmail.com').then(() => {
          const originalText = copyEmailBtn.innerHTML;
          copyEmailBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="color: #10b981;">Copied to Clipboard!</span>
          `;
          setTimeout(() => {
            copyEmailBtn.innerHTML = originalText;
          }, 2500);
        });
      });
    }

    // Mobile navigation drawer toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });

      mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Professional contact form
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('contact-form-feedback');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : 'Project Inquiry';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
          if (formFeedback) {
            formFeedback.className = 'form-feedback error';
            formFeedback.textContent = 'Please fill in your name, email, and message.';
          }
          return;
        }

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = 'Opening your email client to send message to Tausiq Imran...';
        }

        const mailtoUrl = `mailto:touseeqimran321@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent(message + '\n\nSender: ' + name + ' (' + email + ')')}`;

        setTimeout(() => {
          window.location.href = mailtoUrl;
          contactForm.reset();
          if (formFeedback) {
            setTimeout(() => {
              formFeedback.className = 'form-feedback';
              formFeedback.textContent = '';
            }, 4000);
          }
        }, 600);
      });
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new Professional3DShowcase();
});
