/**
 * Professional 3D Portfolio Graphics Engine (Three.js)
 * Tausiq Imran — Full-Stack Developer
 * 
 * Features:
 * - High-refraction Crystalline Prism / Titanium Core
 * - Orbiting gyroscopic rings with micro-nodes
 * - Ambient floating luminous particle cloud
 * - Interactive Mouse Drag & Touch Orbit controls with smooth momentum
 * - 3 Interactive Render Modes: [Prism Crystal, Wireframe Blueprint, Quantum Network]
 * - Dynamic Lighting synchronized with theme accent colors
 * - Multi-layer 3D Architecture Stack with interactive expansion
 */

import * as THREE from 'three';

export class Portfolio3DEngine {
  constructor() {
    this.heroCanvas = document.getElementById('hero-3d-canvas');
    this.stackCanvas = document.getElementById('stack-3d-canvas');

    this.heroScene = null;
    this.heroCamera = null;
    this.heroRenderer = null;
    this.heroGroup = null;

    this.prismMesh = null;
    this.wireframeMesh = null;
    this.innerCore = null;
    this.orbitRing1 = null;
    this.orbitRing2 = null;
    this.particleSystem = null;

    this.stackScene = null;
    this.stackCamera = null;
    this.stackRenderer = null;
    this.stackGroup = null;
    this.slabMeshes = [];

    this.currentMode = 'crystal'; // 'crystal' | 'wireframe' | 'particles'
    this.accentColor = 0x38bdf8;
    this.secondaryColor = 0x818cf8;

    this.clock = new THREE.Clock();

    // Mouse & Drag State
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.rotationMomentum = { x: 0, y: 0 };
    this.manualRotation = { x: 0.2, y: 0 };

    if (this.heroCanvas) this.initHero3D();
    if (this.stackCanvas) this.initStack3D();

    this.setupListeners();
    this.setupModeControls();
    this.animate();
  }

  // =========================================================================
  // 1. HERO 3D SCULPTURE: HIGH-REFRACTION CRYSTAL & QUANTUM FIELD
  // =========================================================================
  initHero3D() {
    const width = this.heroCanvas.clientWidth || 460;
    const height = this.heroCanvas.clientHeight || 420;

    this.heroScene = new THREE.Scene();
    this.heroCamera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    this.heroCamera.position.set(0, 0, 6.2);

    this.heroRenderer = new THREE.WebGLRenderer({
      canvas: this.heroCanvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.heroRenderer.setSize(width, height);
    this.heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lighting setup
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.heroScene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    this.keyLight.position.set(5, 6, 5);
    this.heroScene.add(this.keyLight);

    this.accentLight1 = new THREE.PointLight(this.accentColor, 3.5, 15);
    this.accentLight1.position.set(-4, -2, 3);
    this.heroScene.add(this.accentLight1);

    this.accentLight2 = new THREE.PointLight(this.secondaryColor, 3.0, 15);
    this.accentLight2.position.set(4, -3, -3);
    this.heroScene.add(this.accentLight2);

    this.heroGroup = new THREE.Group();

    // 1. Central Faceted Crystal Prism (Icosahedron)
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 0);
    this.crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1122,
      emissive: 0x031838,
      emissiveIntensity: 0.35,
      metalness: 0.15,
      roughness: 0.1,
      transmission: 0.82,
      ior: 1.65,
      thickness: 1.8,
      transparent: true,
      opacity: 0.92,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    this.prismMesh = new THREE.Mesh(icoGeo, this.crystalMat);
    this.heroGroup.add(this.prismMesh);

    // 2. Blueprint Wireframe Skeleton
    const wireGeo = new THREE.WireframeGeometry(icoGeo);
    this.wireMat = new THREE.LineBasicMaterial({
      color: this.accentColor,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5,
    });
    this.wireframeMesh = new THREE.LineSegments(wireGeo, this.wireMat);
    this.heroGroup.add(this.wireframeMesh);

    // 3. Glowing Internal Energy Nucleus
    const coreGeo = new THREE.OctahedronGeometry(0.65, 0);
    this.coreMat = new THREE.MeshStandardMaterial({
      color: this.accentColor,
      emissive: this.accentColor,
      emissiveIntensity: 1.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    this.innerCore = new THREE.Mesh(coreGeo, this.coreMat);
    this.heroGroup.add(this.innerCore);

    // 4. Gyroscopic Precision Rings
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.022, 16, 80);
    this.ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
    });
    this.orbitRing1 = new THREE.Mesh(ring1Geo, this.ring1Mat);
    this.orbitRing1.rotation.x = Math.PI / 3.2;
    this.heroGroup.add(this.orbitRing1);

    const ring2Geo = new THREE.TorusGeometry(2.35, 0.018, 16, 80);
    this.ring2Mat = new THREE.MeshStandardMaterial({
      color: this.accentColor,
      metalness: 0.85,
      roughness: 0.2,
      emissive: this.accentColor,
      emissiveIntensity: 0.25,
    });
    this.orbitRing2 = new THREE.Mesh(ring2Geo, this.ring2Mat);
    this.orbitRing2.rotation.y = Math.PI / 4;
    this.heroGroup.add(this.orbitRing2);

    // Micro nodes attached to rings
    this.createRingNodes(this.orbitRing1, 6, 2.0);
    this.createRingNodes(this.orbitRing2, 8, 2.35);

    // 5. Floating Ambient Particle Field
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const c1 = new THREE.Color(this.accentColor);
    const c2 = new THREE.Color(this.secondaryColor);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() > 0.5 ? c1 : c2;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    this.particleSystem = new THREE.Points(particleGeo, particleMat);
    this.heroScene.add(this.particleSystem);

    this.heroScene.add(this.heroGroup);
  }

  createRingNodes(ringMesh, count, radius) {
    const nodeGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      ringMesh.add(node);
    }
  }

  // =========================================================================
  // 2. SKILLS 3D ARCHITECTURAL TOPOLOGY STACK
  // =========================================================================
  initStack3D() {
    const width = this.stackCanvas.clientWidth || 360;
    const height = this.stackCanvas.clientHeight || 360;

    this.stackScene = new THREE.Scene();
    this.stackCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    this.stackCamera.position.set(3.2, 2.5, 4.4);
    this.stackCamera.lookAt(0, 0, 0);

    this.stackRenderer = new THREE.WebGLRenderer({
      canvas: this.stackCanvas,
      antialias: true,
      alpha: true,
    });
    this.stackRenderer.setSize(width, height);
    this.stackRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const amb = new THREE.AmbientLight(0xffffff, 1.5);
    this.stackScene.add(amb);

    const dir = new THREE.DirectionalLight(this.accentColor, 2.2);
    dir.position.set(4, 6, 4);
    this.stackScene.add(dir);

    const rim = new THREE.DirectionalLight(0xffffff, 1.2);
    rim.position.set(-3, -2, -2);
    this.stackScene.add(rim);

    this.stackGroup = new THREE.Group();

    // 3 Distinct Architectural Slabs: Frontend UI, API Services, Data Persistence
    const layers = [
      { y: 0.75, color: this.accentColor, name: 'Frontend Client' },
      { y: 0.0, color: 0x0284c7, name: 'Node / REST Services' },
      { y: -0.75, color: 0x1e293b, name: 'ACID Database' },
    ];

    this.slabMeshes = [];
    layers.forEach((layer, index) => {
      const slabGeo = new THREE.BoxGeometry(2.0, 0.18, 2.0);
      const slabMat = new THREE.MeshPhysicalMaterial({
        color: layer.color,
        roughness: 0.2,
        metalness: 0.6,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = layer.y;

      const edgeGeo = new THREE.EdgesGeometry(slabGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: index === 0 ? 0xffffff : 0x94a3b8,
        transparent: true,
        opacity: 0.85,
      });
      const edge = new THREE.LineSegments(edgeGeo, edgeMat);
      slab.add(edge);

      // Micro status pillar/conduit
      if (index < layers.length - 1) {
        const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.55, 12);
        const pillarMat = new THREE.MeshBasicMaterial({ color: this.accentColor, wireframe: true });
        const p1 = new THREE.Mesh(pillarGeo, pillarMat);
        p1.position.set(0.7, -0.37, 0.7);
        slab.add(p1);

        const p2 = new THREE.Mesh(pillarGeo, pillarMat);
        p2.position.set(-0.7, -0.37, -0.7);
        slab.add(p2);
      }

      this.slabMeshes.push(slab);
      this.stackGroup.add(slab);
    });

    this.stackScene.add(this.stackGroup);
  }

  // =========================================================================
  // 3. INTERACTIVE 3D CONTROLS (Modes & Drag Orbit)
  // =========================================================================
  setupModeControls() {
    const buttons = document.querySelectorAll('.mode-switch-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-mode');
        if (mode) {
          this.setMode(mode);
          buttons.forEach((b) => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
        }
      });
    });

    // Reset button
    const resetBtn = document.getElementById('btn-reset-3d');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.manualRotation.x = 0.2;
        this.manualRotation.y = 0;
        this.rotationMomentum.x = 0;
        this.rotationMomentum.y = 0;
      });
    }
  }

  setMode(mode) {
    this.currentMode = mode;
    if (!this.prismMesh || !this.wireframeMesh || !this.innerCore) return;

    if (mode === 'crystal') {
      this.prismMesh.visible = true;
      this.wireframeMesh.visible = true;
      this.wireframeMesh.material.opacity = 0.6;
      this.innerCore.visible = true;
      this.orbitRing1.visible = true;
      this.orbitRing2.visible = true;
    } else if (mode === 'wireframe') {
      this.prismMesh.visible = false;
      this.wireframeMesh.visible = true;
      this.wireframeMesh.material.opacity = 1.0;
      this.innerCore.visible = true;
      this.orbitRing1.visible = true;
      this.orbitRing2.visible = true;
    } else if (mode === 'particles') {
      this.prismMesh.visible = false;
      this.wireframeMesh.visible = false;
      this.innerCore.visible = true;
      this.orbitRing1.visible = true;
      this.orbitRing2.visible = true;
    }
  }

  setAccentColor(hexColor) {
    this.accentColor = hexColor;
    const col = new THREE.Color(hexColor);

    if (this.accentLight1) this.accentLight1.color = col;
    if (this.wireMat) this.wireMat.color = col;
    if (this.coreMat) {
      this.coreMat.color = col;
      this.coreMat.emissive = col;
    }
    if (this.ring2Mat) {
      this.ring2Mat.color = col;
      this.ring2Mat.emissive = col;
    }
    if (this.slabMeshes && this.slabMeshes[0]) {
      this.slabMeshes[0].material.color = col;
    }
  }

  setupListeners() {
    // Parallax mouse position
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Direct Canvas Drag to Orbit
    if (this.heroCanvas) {
      const onDown = (clientX, clientY) => {
        this.isDragging = true;
        this.dragStart.x = clientX;
        this.dragStart.y = clientY;
      };

      const onMove = (clientX, clientY) => {
        if (!this.isDragging) return;
        const deltaX = clientX - this.dragStart.x;
        const deltaY = clientY - this.dragStart.y;
        this.dragStart.x = clientX;
        this.dragStart.y = clientY;

        this.rotationMomentum.y = deltaX * 0.008;
        this.rotationMomentum.x = deltaY * 0.008;

        this.manualRotation.y += this.rotationMomentum.y;
        this.manualRotation.x += this.rotationMomentum.x;
      };

      const onUp = () => {
        this.isDragging = false;
      };

      this.heroCanvas.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
      window.addEventListener('mousemove', (e) => {
        if (this.isDragging) onMove(e.clientX, e.clientY);
      });
      window.addEventListener('mouseup', onUp);

      // Touch events
      this.heroCanvas.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
        },
        { passive: true }
      );

      window.addEventListener(
        'touchmove',
        (e) => {
          if (this.isDragging && e.touches.length === 1) {
            onMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        },
        { passive: true }
      );

      window.addEventListener('touchend', onUp);
    }

    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  onResize() {
    if (this.heroCanvas && this.heroRenderer && this.heroCamera) {
      const width = this.heroCanvas.clientWidth;
      const height = this.heroCanvas.clientHeight;
      if (width && height) {
        this.heroCamera.aspect = width / height;
        this.heroCamera.updateProjectionMatrix();
        this.heroRenderer.setSize(width, height);
      }
    }

    if (this.stackCanvas && this.stackRenderer && this.stackCamera) {
      const width = this.stackCanvas.clientWidth;
      const height = this.stackCanvas.clientHeight;
      if (width && height) {
        this.stackCamera.aspect = width / height;
        this.stackCamera.updateProjectionMatrix();
        this.stackRenderer.setSize(width, height);
      }
    }
  }

  // =========================================================================
  // 4. ANIMATION TICK
  // =========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const t = this.clock.getElapsedTime();

    // Smooth Mouse Interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Apply drag inertia / continuous subtle rotation
    if (!this.isDragging) {
      this.rotationMomentum.x *= 0.94;
      this.rotationMomentum.y *= 0.94;
      this.manualRotation.y += this.rotationMomentum.y + 0.0035;
      this.manualRotation.x += this.rotationMomentum.x;
    }

    // 1. Hero 3D Centerpiece
    if (this.heroGroup && this.heroRenderer && this.heroScene && this.heroCamera) {
      this.heroGroup.rotation.y = this.manualRotation.y + this.mouse.x * 0.45;
      this.heroGroup.rotation.x = this.manualRotation.x - this.mouse.y * 0.25;

      // Inner Core Pulse
      if (this.innerCore) {
        this.innerCore.rotation.y = -t * 1.2;
        this.innerCore.rotation.z = t * 0.8;
        const scalePulse = 1 + Math.sin(t * 2.5) * 0.06;
        this.innerCore.scale.set(scalePulse, scalePulse, scalePulse);
      }

      // Independent Ring counter-rotations
      if (this.orbitRing1) {
        this.orbitRing1.rotation.z = t * 0.6;
      }
      if (this.orbitRing2) {
        this.orbitRing2.rotation.z = -t * 0.45;
      }

      // Particle cloud floating spin
      if (this.particleSystem) {
        this.particleSystem.rotation.y = t * 0.08;
        this.particleSystem.rotation.x = Math.sin(t * 0.1) * 0.1;
      }

      this.heroRenderer.render(this.heroScene, this.heroCamera);
    }

    // 2. Skills Stack 3D
    if (this.stackGroup && this.stackRenderer && this.stackScene && this.stackCamera) {
      this.stackGroup.rotation.y = t * 0.35 + this.mouse.x * 0.35;

      this.slabMeshes.forEach((slab, i) => {
        const baseY = i === 0 ? 0.75 : i === 1 ? 0 : -0.75;
        slab.position.y = baseY + Math.sin(t * 1.8 + i * 0.9) * 0.05;
      });

      this.stackRenderer.render(this.stackScene, this.stackCamera);
    }
  }
}
