/**
 * Three.js Digital Universe & 3D Interactive Constellation Engine
 * High-performance WebGL rendering for background depth and interactive constellation
 */

import * as THREE from 'three';
import { audioEngine } from './audio.js';

export class DigitalUniverseEngine {
  constructor() {
    this.bgCanvas = document.getElementById('universe-canvas');
    this.constellationCanvas = document.getElementById('constellation-sub-canvas');
    
    // Mouse state
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollY = 0;
    this.targetScrollY = 0;

    this.initBackgroundScene();
    this.initConstellationScene();
    this.bindEvents();
    this.animate();
  }

  // =========================================================================
  // 1. FULLSCREEN BACKGROUND UNIVERSE (Particles, Fog, Hero Polyhedron)
  // =========================================================================
  initBackgroundScene() {
    if (!this.bgCanvas) return;

    this.bgScene = new THREE.Scene();
    this.bgScene.fog = new THREE.FogExp2(0x030306, 0.0012);

    this.bgCamera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.bgCamera.position.z = 100;

    this.bgRenderer = new THREE.WebGLRenderer({
      canvas: this.bgCanvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
    this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0x0c1020, 1.2);
    this.bgScene.add(ambientLight);

    this.cyanLight = new THREE.PointLight(0x00F0FF, 3, 300);
    this.cyanLight.position.set(20, 20, 60);
    this.bgScene.add(this.cyanLight);

    this.violetLight = new THREE.PointLight(0x8B5CF6, 2.5, 300);
    this.violetLight.position.set(-30, -20, 40);
    this.bgScene.add(this.violetLight);

    // Deep Particle Nebula (3,500 particles)
    const particleCount = window.innerWidth < 768 ? 1600 : 3200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00F0FF);
    const color2 = new THREE.Color(0x8B5CF6);
    const color3 = new THREE.Color(0xE2E8F0);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 800;
      positions[idx + 1] = (Math.random() - 0.5) * 800;
      positions[idx + 2] = (Math.random() - 0.5) * 600;

      // Color variation
      const r = Math.random();
      const chosenColor = r < 0.4 ? color1 : r < 0.75 ? color2 : color3;
      colors[idx] = chosenColor.r;
      colors[idx + 1] = chosenColor.g;
      colors[idx + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle texture for particles
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,240,255,0.7)');
    grad.addColorStop(1, 'rgba(0,240,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 3.2,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, pMaterial);
    this.bgScene.add(this.particles);

    // Hero 3D Polyhedron Core (Geometric quantum structure)
    const polyGeo = new THREE.IcosahedronGeometry(18, 1);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0x060b18,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: false
    });
    this.heroCore = new THREE.Mesh(polyGeo, polyMat);
    this.heroCore.position.set(0, 5, 10);
    this.bgScene.add(this.heroCore);

    // Wireframe lattice overlay
    const wireGeo = new THREE.IcosahedronGeometry(18.4, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.heroWire = new THREE.Mesh(wireGeo, wireMat);
    this.heroCore.add(this.heroWire);

    // Outer orbital rings
    const ringGeo = new THREE.TorusGeometry(26, 0.3, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.4
    });
    this.heroRing1 = new THREE.Mesh(ringGeo, ringMat);
    this.heroRing1.rotation.x = Math.PI / 3;
    this.heroCore.add(this.heroRing1);

    const ringGeo2 = new THREE.TorusGeometry(32, 0.2, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.25
    });
    this.heroRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.heroRing2.rotation.y = Math.PI / 4;
    this.heroCore.add(this.heroRing2);
  }

  // =========================================================================
  // 2. THE TECHNOLOGY CONSTELLATION 3D SCENE
  // =========================================================================
  initConstellationScene() {
    if (!this.constellationCanvas) return;

    this.cScene = new THREE.Scene();
    this.cCamera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    this.cCamera.position.set(0, 0, 75);

    this.cRenderer = new THREE.WebGLRenderer({
      canvas: this.constellationCanvas,
      alpha: true,
      antialias: true
    });
    this.updateConstellationSize();

    // Lighting
    const cAmbient = new THREE.AmbientLight(0xffffff, 0.8);
    this.cScene.add(cAmbient);
    const cPoint = new THREE.PointLight(0x00F0FF, 3, 100);
    cPoint.position.set(0, 0, 30);
    this.cScene.add(cPoint);

    // Technologies definition
    this.techList = [
      { id: 'html5', name: 'HTML5', category: 'Foundation', level: 'Mastery' },
      { id: 'css3', name: 'CSS3', category: 'Styling & Systems', level: 'Advanced' },
      { id: 'javascript', name: 'JAVASCRIPT', category: 'Application Logic', level: 'Mastery' },
      { id: 'react', name: 'REACT', category: 'Frontend Architecture', level: 'Mastery' },
      { id: 'nodejs', name: 'NODE.JS', category: 'Server Architecture', level: 'Advanced' },
      { id: 'php', name: 'PHP', category: 'Backend Systems', level: 'Skilled' },
      { id: 'database', name: 'DATABASE', category: 'Data Persistence', level: 'Advanced' },
      { id: 'figma', name: 'FIGMA', category: 'UI / UX Design', level: 'Advanced' },
      { id: 'bootstrap', name: 'BOOTSTRAP', category: 'Responsive Framework', level: 'Skilled' },
      { id: 'nextjs', name: 'NEXT.JS', category: 'Production Architecture', level: 'Mastery' },
      { id: 'typescript', name: 'TYPESCRIPT', category: 'Type Engineering', level: 'Mastery' }
    ];

    this.nodeMeshes = [];
    this.nodeGroup = new THREE.Group();
    this.cScene.add(this.nodeGroup);

    // Central "TAUSIQ" Core Node
    const centerCanvas = this.createTextTexture('TAUSIQ', '#00F0FF', '#03050B', 48);
    const centerMat = new THREE.SpriteMaterial({
      map: centerCanvas,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.centerSprite = new THREE.Sprite(centerMat);
    this.centerSprite.scale.set(16, 8, 1);
    this.nodeGroup.add(this.centerSprite);

    // Central glowing energy sphere
    const centerGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const centerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    this.centerSphere = new THREE.Mesh(centerGeo, centerSphereMat);
    this.nodeGroup.add(this.centerSphere);

    // Orbital Nodes Generation
    const total = this.techList.length;
    const radius = 28;

    this.techList.forEach((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Node Node Mesh
      const nodeGeo = new THREE.SphereGeometry(1.6, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x10172A,
        emissive: 0x00F0FF,
        emissiveIntensity: 0.35,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { ...tech, originalPosition: new THREE.Vector3(x, y, z) };

      // Holographic text label sprite
      const labelTexture = this.createTextTexture(tech.name, '#E2E8F0', 'rgba(10,14,24,0.7)', 32);
      const labelMat = new THREE.SpriteMaterial({
        map: labelTexture,
        transparent: true,
        depthWrite: false
      });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.position.set(0, 2.6, 0);
      labelSprite.scale.set(8.5, 4.25, 1);
      nodeMesh.add(labelSprite);

      this.nodeGroup.add(nodeMesh);
      this.nodeMeshes.push(nodeMesh);
    });

    // Connecting Filaments / Constellation Lines
    this.updateConstellationFilaments();

    // Raycaster for interactivity
    this.raycaster = new THREE.Raycaster();
    this.cMouse = new THREE.Vector2(-999, -999);
    this.activeNodeId = 'html5';
  }

  createTextTexture(text, color, bgColor, fontSize = 32) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Background pill
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(16, 24, 224, 80, 40);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();

    // Text
    ctx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 64);

    return new THREE.CanvasTexture(canvas);
  }

  updateConstellationFilaments() {
    if (this.filamentLines) {
      this.nodeGroup.remove(this.filamentLines);
    }

    const linePoints = [];
    const centerPos = new THREE.Vector3(0, 0, 0);

    // Lines from center to all nodes
    this.nodeMeshes.forEach(mesh => {
      linePoints.push(centerPos);
      linePoints.push(mesh.position);
    });

    // Inter-node neighboring connections
    for (let i = 0; i < this.nodeMeshes.length; i++) {
      const next = this.nodeMeshes[(i + 1) % this.nodeMeshes.length];
      linePoints.push(this.nodeMeshes[i].position);
      linePoints.push(next.position);
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    this.filamentLines = new THREE.LineSegments(lineGeo, lineMat);
    this.nodeGroup.add(this.filamentLines);
  }

  updateConstellationSize() {
    if (!this.constellationCanvas || !this.cRenderer || !this.cCamera) return;
    const rect = this.constellationCanvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height || 480;

    this.cCamera.aspect = width / height;
    this.cCamera.updateProjectionMatrix();
    this.cRenderer.setSize(width, height);
    this.cRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // =========================================================================
  // INTERACTION & EVENTS
  // =========================================================================
  bindEvents() {
    window.addEventListener('resize', () => {
      // Resize BG
      if (this.bgCamera && this.bgRenderer) {
        this.bgCamera.aspect = window.innerWidth / window.innerHeight;
        this.bgCamera.updateProjectionMatrix();
        this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
      }
      // Resize Constellation
      this.updateConstellationSize();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      // Constellation hover check
      if (this.constellationCanvas) {
        const rect = this.constellationCanvas.getBoundingClientRect();
        this.cMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.cMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    });

    // Touch interaction for 3D constellation
    if (this.constellationCanvas) {
      let isDragging = false;
      let prevTouchX = 0;
      let prevTouchY = 0;

      this.constellationCanvas.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
          isDragging = true;
          prevTouchX = e.touches[0].clientX;
          prevTouchY = e.touches[0].clientY;
        }
      }, { passive: true });

      this.constellationCanvas.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length === 0) return;
        const deltaX = e.touches[0].clientX - prevTouchX;
        const deltaY = e.touches[0].clientY - prevTouchY;
        prevTouchX = e.touches[0].clientX;
        prevTouchY = e.touches[0].clientY;

        if (this.nodeGroup) {
          this.nodeGroup.rotation.y += deltaX * 0.01;
          this.nodeGroup.rotation.x += deltaY * 0.01;
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        isDragging = false;
      });

      this.constellationCanvas.addEventListener('click', (e) => {
        const rect = this.constellationCanvas.getBoundingClientRect();
        const clickMouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );

        this.raycaster.setFromCamera(clickMouse, this.cCamera);
        const intersects = this.raycaster.intersectObjects(this.nodeMeshes);

        if (intersects.length > 0) {
          const selected = intersects[0].object.userData;
          if (selected && selected.id) {
            this.selectTechnology(selected.id);
            audioEngine.playNodeChime();
          }
        }
      });
    }

    window.addEventListener('scroll', () => {
      this.targetScrollY = window.scrollY;
    }, { passive: true });
  }

  selectTechnology(techId) {
    this.activeNodeId = techId;

    // Highlight node mesh
    this.nodeMeshes.forEach(mesh => {
      if (mesh.userData.id === techId) {
        mesh.material.emissiveIntensity = 1.0;
        mesh.scale.set(1.5, 1.5, 1.5);
      } else {
        mesh.material.emissiveIntensity = 0.35;
        mesh.scale.set(1, 1, 1);
      }
    });

    // Dispatch custom event for UI inspector update
    window.dispatchEvent(new CustomEvent('techSelected', { detail: { id: techId } }));
  }

  // =========================================================================
  // ANIMATION LOOP
  // =========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.08;

    // 1. Render Background Scene
    if (this.bgRenderer && this.bgScene && this.bgCamera) {
      // Parallax camera
      this.bgCamera.position.x = this.mouse.x * 12;
      this.bgCamera.position.y = -this.mouse.y * 12 - (this.scrollY * 0.04);
      this.bgCamera.lookAt(0, -this.scrollY * 0.04, 0);

      // Light orbit
      const time = performance.now() * 0.001;
      this.cyanLight.position.x = Math.sin(time * 0.7) * 40;
      this.cyanLight.position.y = Math.cos(time * 0.5) * 30;
      this.violetLight.position.x = -Math.sin(time * 0.6) * 40;
      this.violetLight.position.z = Math.cos(time * 0.4) * 30 + 30;

      // Particle rotation & drift
      if (this.particles) {
        this.particles.rotation.y = time * 0.03;
        this.particles.rotation.x = time * 0.015;
      }

      // Hero Polyhedron rotation
      if (this.heroCore) {
        this.heroCore.rotation.x += 0.004 + this.mouse.y * 0.008;
        this.heroCore.rotation.y += 0.006 + this.mouse.x * 0.008;
        this.heroRing1.rotation.z += 0.01;
        this.heroRing2.rotation.z -= 0.008;
      }

      this.bgRenderer.render(this.bgScene, this.bgCamera);
    }

    // 2. Render Constellation Scene
    if (this.cRenderer && this.cScene && this.cCamera && this.nodeGroup) {
      const cTime = performance.now() * 0.0008;
      this.nodeGroup.rotation.y += 0.003;
      this.nodeGroup.rotation.x = Math.sin(cTime) * 0.15 + (this.mouse.y * 0.2);

      if (this.centerSphere) {
        this.centerSphere.rotation.y += 0.01;
        this.centerSphere.rotation.z += 0.008;
      }

      // Hover Raycasting check on constellation
      this.raycaster.setFromCamera(this.cMouse, this.cCamera);
      const intersects = this.raycaster.intersectObjects(this.nodeMeshes);

      if (intersects.length > 0) {
        const hovered = intersects[0].object;
        hovered.scale.set(1.4, 1.4, 1.4);
        hovered.material.emissiveIntensity = 0.85;
      } else {
        this.nodeMeshes.forEach(mesh => {
          if (mesh.userData.id !== this.activeNodeId) {
            mesh.scale.set(1, 1, 1);
            mesh.material.emissiveIntensity = 0.35;
          }
        });
      }

      this.cRenderer.render(this.cScene, this.cCamera);
    }
  }
}
