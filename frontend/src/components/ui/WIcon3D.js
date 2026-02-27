import * as THREE from 'three';

/**
 * Creates a 3D metallic liquid "W" icon using Three.js.
 * Features iridescent liquid-metal material with smooth animation.
 * @returns {{ element: HTMLElement, cleanup: Function }}
 */
export default function createWIcon3D() {
  const container = document.createElement('div');
  container.className = 'w-icon-3d-container';

  // ── Renderer ──
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(320, 320);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // ── Scene & Camera ──
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 5.5);

  // ── Environment for reflections ──
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envScene = buildEnvScene();
  const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
  pmremGenerator.dispose();
  envScene.clear();

  // ── Build "W" shape ──
  const wShape = buildWShape();
  const extrudeSettings = {
    depth: 0.38,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelOffset: 0,
    bevelSegments: 6,
    curveSegments: 24,
  };
  const geometry = new THREE.ExtrudeGeometry(wShape, extrudeSettings);
  geometry.center();
  geometry.computeVertexNormals();

  // ── Liquid metallic material ──
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x8ab4f8),
    metalness: 0.92,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 1.0,
    envMap: envMap,
    envMapIntensity: 2.0,
    iridescence: 1.0,
    iridescenceIOR: 1.8,
    iridescenceThicknessRange: [200, 600],
    sheen: 0.3,
    sheenRoughness: 0.2,
    sheenColor: new THREE.Color(0xaaccff),
    transparent: true,
    opacity: 0.95,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(0.9, 0.9, 0.9);
  scene.add(mesh);

  // ── Lighting ──
  const ambientLight = new THREE.AmbientLight(0x4488cc, 0.4);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xddeeff, 2.0);
  mainLight.position.set(3, 4, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x88aaff, 0.8);
  fillLight.position.set(-3, -1, 3);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x66bbff, 1.5, 12);
  rimLight.position.set(-2, 3, -2);
  scene.add(rimLight);

  const bottomGlow = new THREE.PointLight(0x4466ff, 0.6, 10);
  bottomGlow.position.set(0, -3, 2);
  scene.add(bottomGlow);

  // ── Animation ──
  let animId = null;
  const timer = new THREE.Timer();

  // ── Mouse interaction ──
  let targetRotX = 0;
  let targetRotY = 0;

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetRotY = mx * 0.4;
    targetRotX = -my * 0.3;
  }

  function onMouseLeave() {
    targetRotX = 0;
    targetRotY = 0;
  }

  // Enhanced animate with mouse tracking
  function animateWithMouse() {
    animId = requestAnimationFrame(animateWithMouse);
    timer.update();
    const elapsed = timer.getElapsed();

    // Blend auto-rotation with mouse
    const autoRotY = Math.sin(elapsed * 0.4) * 0.25;
    const autoRotX = Math.sin(elapsed * 0.3) * 0.08;

    mesh.rotation.y += (targetRotY + autoRotY - mesh.rotation.y) * 0.06;
    mesh.rotation.x += (targetRotX + autoRotX - mesh.rotation.x) * 0.06;

    const breathe = 1 + Math.sin(elapsed * 0.8) * 0.02;
    mesh.scale.set(0.9 * breathe, 0.9 * breathe, 0.9 * breathe);

    material.iridescenceThicknessRange = [
      200 + Math.sin(elapsed * 0.5) * 80,
      600 + Math.cos(elapsed * 0.3) * 100,
    ];
    material.envMapIntensity = 2.0 + Math.sin(elapsed * 1.2) * 0.3;

    renderer.render(scene, camera);
  }

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', onMouseLeave);

  // ── Responsive resize ──
  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width > 0 && height > 0) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

  // Observe size changes
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  // Start animation
  animateWithMouse();

  // ── Cleanup ──
  function cleanup() {
    if (animId) cancelAnimationFrame(animId);
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('mouseleave', onMouseLeave);
    resizeObserver.disconnect();
    geometry.dispose();
    material.dispose();
    envMap.dispose();
    renderer.dispose();
  }

  return { element: container, cleanup };
}

/**
 * Build a Three.js Shape for the letter "W"
 */
function buildWShape() {
  const shape = new THREE.Shape();

  // W letter outline — a clean geometric W
  // Scale: roughly 2 units wide, 2 units tall, centered at origin
  const w = 2.0;
  const h = 2.0;
  const strokeW = 0.28;
  const halfW = w / 2;

  // Outer contour (clockwise)
  shape.moveTo(-halfW, h / 2);
  shape.lineTo(-halfW + strokeW, h / 2);
  shape.lineTo(-halfW + strokeW * 1.5, -h / 2 + strokeW * 1.8);
  shape.lineTo(-strokeW * 0.4, h / 2 - strokeW * 1.2);
  shape.lineTo(0, h / 2 - strokeW * 0.4);
  shape.lineTo(strokeW * 0.4, h / 2 - strokeW * 1.2);
  shape.lineTo(halfW - strokeW * 1.5, -h / 2 + strokeW * 1.8);
  shape.lineTo(halfW - strokeW, h / 2);
  shape.lineTo(halfW, h / 2);
  shape.lineTo(halfW - strokeW * 0.2, -h / 2);
  shape.lineTo(halfW - strokeW * 1.2, -h / 2);
  shape.lineTo(0, h / 2 - strokeW * 2.8);
  shape.lineTo(-halfW + strokeW * 1.2, -h / 2);
  shape.lineTo(-halfW + strokeW * 0.2, -h / 2);
  shape.closePath();

  return shape;
}

/**
 * Build a scene used for environment map generation
 * Creates a gradient sky dome with colored lights for reflections
 */
function buildEnvScene() {
  const envScene = new THREE.Scene();

  // Gradient sphere for reflections
  const skyGeo = new THREE.SphereGeometry(10, 32, 32);
  const skyMat = new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    vertexColors: true,
  });

  // Color gradient on the sphere
  const colors = [];
  const positions = skyGeo.attributes.position;
  const topColor = new THREE.Color(0x0a1628);
  const midColor = new THREE.Color(0x1a2a48);
  const botColor = new THREE.Color(0x0c1220);

  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const normalized = (y + 10) / 20; // 0 to 1
    const color = new THREE.Color();
    if (normalized > 0.5) {
      color.lerpColors(midColor, topColor, (normalized - 0.5) * 2);
    } else {
      color.lerpColors(botColor, midColor, normalized * 2);
    }
    colors.push(color.r, color.g, color.b);
  }

  skyGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const skyMesh = new THREE.Mesh(skyGeo, skyMat);
  envScene.add(skyMesh);

  // Hot spots for sharper reflections
  const spots = [
    { pos: [5, 5, 0], color: 0x8ab4f8, intensity: 2 },
    { pos: [-4, 3, 4], color: 0x66aaff, intensity: 1.5 },
    { pos: [0, -5, 5], color: 0x4488cc, intensity: 1 },
    { pos: [3, 0, -5], color: 0xaaccff, intensity: 1.2 },
  ];

  spots.forEach(({ pos, color, intensity }) => {
    const spotGeo = new THREE.SphereGeometry(0.8, 8, 8);
    const spotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
    });
    const spotMesh = new THREE.Mesh(spotGeo, spotMat);
    spotMesh.position.set(pos[0], pos[1], pos[2]);
    envScene.add(spotMesh);
  });

  return envScene;
}
