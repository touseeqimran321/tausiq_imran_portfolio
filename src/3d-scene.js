import * as THREE from 'three';

export function init3DHeroScene() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas) return;

  const container = canvas.parentElement;
  if (!container) return;

  let width = container.clientWidth || 500;
  let height = container.clientHeight || 500;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 24;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  } catch (e) {
    console.warn('WebGL initialization failed:', e);
    return;
  }

  // Root group for all 3D portfolio objects
  const rootGroup = new THREE.Group();
  scene.add(rootGroup);

  // 1. Inner Geometric Icosahedron (Core Data Core)
  const coreGeometry = new THREE.IcosahedronGeometry(4.6, 2);
  const coreMaterial = new THREE.MeshPhongMaterial({
    color: 0x0c172b,
    emissive: 0x003366,
    specular: 0x00f2fe,
    shininess: 90,
    wireframe: false,
    flatShading: true,
    transparent: true,
    opacity: 0.85
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  rootGroup.add(coreMesh);

  // 2. Wireframe Outer Network Sphere (Geometric Wireframe Globe)
  const wireGeometry = new THREE.IcosahedronGeometry(5.2, 2);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  rootGroup.add(wireMesh);

  // 3. Floating Network Nodes (Vertices points)
  const nodeCount = 120;
  const nodeGeometry = new THREE.BufferGeometry();
  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeColors = new Float32Array(nodeCount * 3);

  const cyan = new THREE.Color(0x00f2fe);
  const purple = new THREE.Color(0x8b5cf6);

  for (let i = 0; i < nodeCount; i++) {
    // Generate points on spherical shell
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 5.2 + (Math.random() * 2.2);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    nodePositions[i * 3] = x;
    nodePositions[i * 3 + 1] = y;
    nodePositions[i * 3 + 2] = z;

    const mixedColor = cyan.clone().lerp(purple, Math.random());
    nodeColors[i * 3] = mixedColor.r;
    nodeColors[i * 3 + 1] = mixedColor.g;
    nodeColors[i * 3 + 2] = mixedColor.b;
  }

  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
  nodeGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

  const nodeMaterial = new THREE.PointsMaterial({
    size: 0.22,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
  rootGroup.add(nodePoints);

  // 4. Orbital Cyber Rings
  const ring1Geometry = new THREE.TorusGeometry(7.2, 0.04, 16, 100);
  const ring1Material = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.6
  });
  const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
  ring1.rotation.x = Math.PI / 2.8;
  ring1.rotation.y = Math.PI / 6;
  rootGroup.add(ring1);

  const ring2Geometry = new THREE.TorusGeometry(8.4, 0.03, 16, 100);
  const ring2Material = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.45
  });
  const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
  ring2.rotation.x = -Math.PI / 3.2;
  ring2.rotation.z = Math.PI / 4;
  rootGroup.add(ring2);

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0x0c1424, 2.5);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x00f2fe, 3.5);
  dirLight1.position.set(10, 10, 15);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 2.5);
  dirLight2.position.set(-10, -10, -10);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0x00f2fe, 2, 20);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // Mouse interaction state
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  function onMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    if (!isDragging) {
      targetRotationY = x * 0.8;
      targetRotationX = -y * 0.8;
    } else {
      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;
      rootGroup.rotation.y += deltaX * 0.006;
      rootGroup.rotation.x += deltaY * 0.006;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  }

  function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }

  function onMouseUp() {
    isDragging = false;
  }

  // Touch handlers for mobile devices
  function onTouchStart(event) {
    if (event.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
  }

  function onTouchMove(event) {
    if (isDragging && event.touches.length === 1) {
      const deltaX = event.touches[0].clientX - previousMousePosition.x;
      const deltaY = event.touches[0].clientY - previousMousePosition.y;
      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x += deltaY * 0.008;
      previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
  }

  function onTouchEnd() {
    isDragging = false;
  }

  window.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd);

  // Resize handling
  function handleResize() {
    if (!container) return;
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const resizeObserver = new ResizeObserver(() => {
    handleResize();
  });
  resizeObserver.observe(container);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Constant planetary rotation
    if (!isDragging) {
      rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.04 + 0.004;
      rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.04;
    }

    // Counter-rotations for intricate dynamic layering
    wireMesh.rotation.y -= 0.002;
    wireMesh.rotation.z += 0.001;

    coreMesh.rotation.x += 0.0015;

    ring1.rotation.z += 0.007;
    ring2.rotation.z -= 0.005;

    // Node breathing pulse
    const scaleFactor = 1 + Math.sin(time * 1.5) * 0.03;
    nodePoints.scale.set(scaleFactor, scaleFactor, scaleFactor);

    renderer.render(scene, camera);
  }

  animate();
}
