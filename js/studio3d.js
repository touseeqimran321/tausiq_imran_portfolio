/**
 * 3D Architectural Engineering Studio Engine (Three.js)
 * Clean, professional, high-end monolithic 3D spatial graphics.
 * Replaces universe/space with precision architectural kinetic sculptures,
 * studio lighting, infinite drafting perspective grid, and interactive 3D tech matrix.
 */

import * as THREE from 'three';

export class Studio3DEngine {
  constructor() {
    this.canvas = document.getElementById('studio-canvas');
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // 3D Objects
    this.monolithGroup = new THREE.Group();
    this.floorGrid = null;
    this.floatingPrisms = [];
    this.innerCore = null;
    this.outerLattice = null;
    this.gyroscopicRings = [];

    // Interaction & Animation State
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.targetScrollY = 0;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.manualRotation = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // Secondary 3D Tech Matrix Canvas
    this.techCanvas = document.getElementById('tech-matrix-canvas');
    this.techScene = null;
    this.techCamera = null;
    this.techRenderer = null;
    this.techNodesGroup = new THREE.Group();
    this.techNodes = [];
    this.selectedTechIndex = 0;
    this.techDrag = { isDragging: false, prevX: 0, rotationY: 0, targetRotationY: 0 };

    this.initMainStudio();
    this.initTechMatrix();
    this.setupEventListeners();
    this.animate();
  }

  // =========================================================================
  // 1. MAIN ARCHITECTURAL STUDIO SCENE
  // =========================================================================
  initMainStudio() {
    // Scene & Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0b0e);
    this.scene.fog = new THREE.FogExp2(0x0a0b0e, 0.015);

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    this.camera.position.set(0, 1.2, 7.5);

    // WebGL Renderer with High Precision & Studio Soft Shadows
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Studio Lighting
    this.setupStudioLighting();

    // 3D Architectural Perspective Drafting Grid
    this.setupArchitecturalFloor();

    // 3D Kinetic Precision Monolith Centerpiece
    this.setupKineticMonolith();

    // 3D Ambient Prismatic Slabs / Engineering Geometry
    this.setupAmbientPrisms();
  }

  setupStudioLighting() {
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0x161a22, 1.5);
    this.scene.add(ambientLight);

    // Key Light (Cool Studio White)
    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.8);
    keyLight.position.set(5, 8, 5);
    this.scene.add(keyLight);

    // Rim / Backlight (Electric Cobalt / Cyan)
    const rimLight = new THREE.DirectionalLight(0x00d2ff, 2.0);
    rimLight.position.set(-6, 4, -4);
    this.scene.add(rimLight);

    // Warm Under-Glow (Titanium Gold / Champagne Accent)
    const floorLight = new THREE.PointLight(0x38bdf8, 2.2, 15);
    floorLight.position.set(0, -1.8, 2);
    this.scene.add(floorLight);

    // Monolith Core Emissive Light
    const coreLight = new THREE.PointLight(0x60a5fa, 3.5, 8);
    coreLight.position.set(0, 0, 0);
    this.monolithGroup.add(coreLight);
  }

  setupArchitecturalFloor() {
    // Endless architectural grid floor
    const gridHelper = new THREE.GridHelper(50, 50, 0x334155, 0x1e293b);
    gridHelper.position.y = -2.4;
    this.floorGrid = gridHelper;
    this.scene.add(gridHelper);

    // Reflective floor plane
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.35,
      metalness: 0.8,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.42;
    this.scene.add(floorMesh);
  }

  setupKineticMonolith() {
    this.monolithGroup.position.set(2.4, 0.2, 0); // Positioned elegantly next to hero text on desktop

    // Inner Glowing Core (Icosahedron / Diamond)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.9,
      flatShading: true,
    });
    this.innerCore = new THREE.Mesh(coreGeo, coreMat);
    this.monolithGroup.add(this.innerCore);

    // Translucent Frosted Glass Outer Shell (Octahedron / Prism)
    const shellGeo = new THREE.OctahedronGeometry(1.4, 0);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.75,
      ior: 1.5,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    this.monolithGroup.add(shell);

    // Outer Wireframe Architectural Bevel
    const wireGeo = new THREE.OctahedronGeometry(1.42, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    this.outerLattice = new THREE.Mesh(wireGeo, wireMat);
    this.monolithGroup.add(this.outerLattice);

    // Gyroscopic Precision Engineering Rings
    const ringConfigs = [
      { radius: 1.8, tube: 0.015, color: 0x64748b, rot: [0.3, 0.2, 0] },
      { radius: 2.1, tube: 0.012, color: 0x38bdf8, rot: [-0.4, 0.5, 0.2] },
      { radius: 2.4, tube: 0.01, color: 0x94a3b8, rot: [0.6, -0.3, 0.4] },
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.3,
        metalness: 0.9,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      this.gyroscopicRings.push(ring);
      this.monolithGroup.add(ring);
    });

    this.scene.add(this.monolithGroup);
  }

  setupAmbientPrisms() {
    // 14 floating architectural prisms and bevelled slabs at varying depths
    const prismGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 }),
      new THREE.MeshPhysicalMaterial({ color: 0x94a3b8, transmission: 0.8, roughness: 0.1, transparent: true }),
    ];

    for (let i = 0; i < 16; i++) {
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(prismGeo, mat);

      // Distribute in a balanced spatial volume around the scene
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 8 - 1;

      mesh.position.set(x, y, z);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      const scale = 0.5 + Math.random() * 0.9;
      mesh.scale.set(scale, scale, scale);

      this.floatingPrisms.push({
        mesh,
        baseY: y,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        floatSpeed: 0.5 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      });

      this.scene.add(mesh);
    }
  }

  // =========================================================================
  // 2. INTERACTIVE 3D TECH MATRIX (SKILLS SECTION)
  // =========================================================================
  initTechMatrix() {
    if (!this.techCanvas) return;

    this.techScene = new THREE.Scene();
    this.techCamera = new THREE.PerspectiveCamera(40, this.techCanvas.clientWidth / this.techCanvas.clientHeight, 0.1, 50);
    this.techCamera.position.set(0, 0.8, 6.2);

    this.techRenderer = new THREE.WebGLRenderer({
      canvas: this.techCanvas,
      antialias: true,
      alpha: true,
    });
    this.techRenderer.setSize(this.techCanvas.clientWidth, this.techCanvas.clientHeight);
    this.techRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio lighting for the tech model
    const techKey = new THREE.DirectionalLight(0xffffff, 2.5);
    techKey.position.set(3, 4, 3);
    this.techScene.add(techKey);

    const techRim = new THREE.DirectionalLight(0x0284c7, 2.2);
    techRim.position.set(-3, 2, -2);
    this.techScene.add(techRim);

    const techFill = new THREE.AmbientLight(0x1e293b, 1.2);
    this.techScene.add(techFill);

    // Build the 11 3D technology modules arranged in an architectural circular spatial carousel
    this.buildTechMatrixNodes();
    this.techScene.add(this.techNodesGroup);

    // Drag interaction on Tech Canvas
    this.techCanvas.addEventListener('mousedown', (e) => {
      this.techDrag.isDragging = true;
      this.techDrag.prevX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      this.techDrag.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.techDrag.isDragging) {
        const deltaX = e.clientX - this.techDrag.prevX;
        this.techDrag.targetRotationY += deltaX * 0.008;
        this.techDrag.prevX = e.clientX;
      }
    });

    // Touch support
    this.techCanvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.techDrag.isDragging = true;
        this.techDrag.prevX = e.touches[0].clientX;
      }
    });

    window.addEventListener('touchend', () => {
      this.techDrag.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (this.techDrag.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - this.techDrag.prevX;
        this.techDrag.targetRotationY += deltaX * 0.01;
        this.techDrag.prevX = e.touches[0].clientX;
      }
    });
  }

  buildTechMatrixNodes() {
    const techList = [
      { id: 'html5', label: 'HTML5', color: 0xe34f26 },
      { id: 'css3', label: 'CSS3', color: 0x1572b6 },
      { id: 'javascript', label: 'JAVASCRIPT', color: 0xf7df1e },
      { id: 'react', label: 'REACT', color: 0x61dafb },
      { id: 'nodejs', label: 'NODE.JS', color: 0x339933 },
      { id: 'php', label: 'PHP', color: 0x777bb4 },
      { id: 'database', label: 'DATABASE', color: 0x00758f },
      { id: 'figma', label: 'FIGMA', color: 0xf24e1e },
      { id: 'bootstrap', label: 'BOOTSTRAP', color: 0x7952b3 },
      { id: 'nextjs', label: 'NEXT.JS', color: 0xffffff },
      { id: 'typescript', label: 'TYPESCRIPT', color: 0x3178c6 },
    ];

    const radius = 2.4;
    const count = techList.length;

    // Central Precision Core
    const centerCoreGeo = new THREE.DodecahedronGeometry(0.7, 0);
    const centerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false,
    });
    const centerMesh = new THREE.Mesh(centerCoreGeo, centerCoreMat);
    this.techNodesGroup.add(centerMesh);

    // Inner wireframe
    const centerWire = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.74, 0),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true })
    );
    this.techNodesGroup.add(centerWire);

    techList.forEach((tech, i) => {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Architectural Glass Plaque
      const plaqueGeo = new THREE.BoxGeometry(0.7, 0.45, 0.08);
      const plaqueMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.2,
      });
      const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaque.position.set(x, 0, z);
      plaque.lookAt(0, 0, 0);

      // Bevel edge highlight
      const edgeGeo = new THREE.EdgesGeometry(plaqueGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      plaque.add(edgeLines);

      // Connector ray to center
      const rayGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, 0, z),
      ]);
      const rayMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.6 });
      const ray = new THREE.Line(rayGeo, rayMat);
      this.techNodesGroup.add(ray);

      plaque.userData = { id: tech.id, index: i, defaultColor: 0x1e293b, activeColor: 0x0284c7 };
      this.techNodes.push({ mesh: plaque, edgeLines, data: tech, ray });
      this.techNodesGroup.add(plaque);
    });
  }

  selectTechnology(techId) {
    const idx = this.techNodes.findIndex((n) => n.data.id === techId);
    if (idx !== -1) {
      this.selectedTechIndex = idx;
      const count = this.techNodes.length;
      const targetAngle = -((idx / count) * Math.PI * 2) - Math.PI / 2;
      this.techDrag.targetRotationY = targetAngle;

      // Update plaque highlights
      this.techNodes.forEach((node, i) => {
        if (i === idx) {
          node.mesh.material.color.setHex(0x0284c7);
          node.mesh.scale.set(1.25, 1.25, 1.25);
          node.ray.material.color.setHex(0x38bdf8);
          node.ray.material.opacity = 1.0;
        } else {
          node.mesh.material.color.setHex(0x1e293b);
          node.mesh.scale.set(1, 1, 1);
          node.ray.material.color.setHex(0x334155);
          node.ray.material.opacity = 0.4;
        }
      });
    }
  }

  // =========================================================================
  // 3. EVENT LISTENERS & PHYSICS
  // =========================================================================
  setupEventListeners() {
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      this.mouse.targetX = nx;
      this.mouse.targetY = ny;
    });

    window.addEventListener('scroll', () => {
      this.targetScrollY = window.scrollY;
    });

    window.addEventListener('resize', () => {
      this.onResize();
    });

    // Touch Parallax for Mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const nx = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        const ny = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        this.mouse.targetX = nx * 0.8;
        this.mouse.targetY = ny * 0.8;
      }
    });
  }

  onResize() {
    // Resize main studio
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Resize tech matrix
    if (this.techCamera && this.techRenderer && this.techCanvas) {
      const width = this.techCanvas.clientWidth;
      const height = this.techCanvas.clientHeight;
      this.techCamera.aspect = width / height;
      this.techCamera.updateProjectionMatrix();
      this.techRenderer.setSize(width, height);
    }
  }

  // =========================================================================
  // 4. MAIN RENDER LOOP
  // =========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth Interpolation for Mouse and Scroll
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.06;

    // 2. Kinetic Monolith Movement
    if (this.monolithGroup) {
      // Rotation
      this.monolithGroup.rotation.y = elapsedTime * 0.35 + this.mouse.x * 0.6;
      this.monolithGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15 - this.mouse.y * 0.4;

      // Responsive positioning: on mobile center it, on desktop keep it to the right
      const isMobile = window.innerWidth < 1024;
      const targetPosX = isMobile ? 0 : 2.2;
      const targetPosY = isMobile ? 1.0 : 0.2;
      this.monolithGroup.position.x += (targetPosX - this.monolithGroup.position.x) * 0.05;
      this.monolithGroup.position.y = targetPosY + Math.sin(elapsedTime * 0.8) * 0.12 - (this.scrollY * 0.0012);

      // Inner core pulse
      if (this.innerCore) {
        this.innerCore.rotation.y = -elapsedTime * 0.5;
        this.innerCore.rotation.z = elapsedTime * 0.25;
      }

      // Gyroscopic rings counter-rotation
      this.gyroscopicRings.forEach((ring, i) => {
        ring.rotation.z = elapsedTime * (0.2 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
      });
    }

    // 3. Floating Architectural Prisms Levitation
    this.floatingPrisms.forEach((p) => {
      p.mesh.rotation.x += p.rotSpeedX;
      p.mesh.rotation.y += p.rotSpeedY;
      p.mesh.position.y = p.baseY + Math.sin(elapsedTime * p.floatSpeed + p.offset) * 0.25;
    });

    // 4. Camera Parallax reacting to scroll & mouse
    if (this.camera) {
      this.camera.position.x = this.mouse.x * 0.8;
      this.camera.position.y = 1.2 + this.mouse.y * 0.4 - (this.scrollY * 0.001);
      this.camera.lookAt(0, 0, 0);
    }

    // 5. Render Main Studio Scene
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    // 6. Animate Tech Matrix Scene
    if (this.techRenderer && this.techScene && this.techCamera) {
      this.techDrag.rotationY += (this.techDrag.targetRotationY - this.techDrag.rotationY) * 0.08;
      this.techNodesGroup.rotation.y = this.techDrag.rotationY;

      // Subtle float
      this.techNodesGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08;

      this.techRenderer.render(this.techScene, this.techCamera);
    }
  }
}
