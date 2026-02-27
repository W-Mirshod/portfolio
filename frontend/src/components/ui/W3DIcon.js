import * as THREE from 'three';

const NOISE_GLSL = `
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod(i,289.0);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=1.0/7.0;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;

function createWShape() {
  const shape = new THREE.Shape();

  shape.moveTo(-1.1, 1.0);
  shape.lineTo(-0.55, -1.0);
  shape.lineTo(-0.33, -1.0);
  shape.lineTo(0.0, 0.2);
  shape.lineTo(0.33, -1.0);
  shape.lineTo(0.55, -1.0);
  shape.lineTo(1.1, 1.0);
  shape.lineTo(0.88, 1.0);
  shape.lineTo(0.33, -0.3);
  shape.lineTo(0.0, 0.55);
  shape.lineTo(-0.33, -0.3);
  shape.lineTo(-0.88, 1.0);
  shape.closePath();

  return shape;
}

function createEnvironment(renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();

  const roomGeo = new THREE.BoxGeometry(10, 10, 10);
  const roomMat = new THREE.MeshBasicMaterial({ color: 0x080818, side: THREE.BackSide });
  envScene.add(new THREE.Mesh(roomGeo, roomMat));

  const panelGeo = new THREE.PlaneGeometry(4, 4);
  const addPanel = (color, pos, rot) => {
    const mat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(panelGeo.clone(), mat);
    mesh.position.set(...pos);
    if (rot) mesh.rotation.set(...rot);
    envScene.add(mesh);
  };

  addPanel(0x2244ff, [0, 4, 0], [Math.PI / 2, 0, 0]);
  addPanel(0xff2288, [-4, 0, 0], [0, Math.PI / 2, 0]);
  addPanel(0x22ffaa, [4, 0, 0], [0, -Math.PI / 2, 0]);
  addPanel(0x6622ff, [0, -4, 0], [-Math.PI / 2, 0, 0]);
  addPanel(0x88ccff, [0, 0, -4], [0, 0, 0]);
  addPanel(0xffffff, [0, 2, 4], [0.2, 0, 0]);

  const envMap = pmremGenerator.fromScene(envScene, 0.04).texture;
  pmremGenerator.dispose();

  envScene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) obj.material.dispose();
  });

  return envMap;
}

function createParticleSystem(count = 60) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const speeds = new Float32Array(count);
  const offsets = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 2.0 + Math.random() * 1.0;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = 1.0 + Math.random() * 2.5;
    speeds[i] = 0.15 + Math.random() * 0.4;
    offsets[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aSpeed;
      attribute float aOffset;
      uniform float uTime;
      uniform float uPixelRatio;
      varying float vAlpha;
      void main() {
        float t = uTime * aSpeed + aOffset;
        vec3 pos = position;
        float ct = cos(t);
        float st = sin(t);
        mat3 rot = mat3(ct, 0.0, st, 0.0, 1.0, 0.0, -st, 0.0, ct);
        pos = rot * pos;
        pos.y += sin(t * 1.5) * 0.15;
        vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPos;
        gl_PointSize = aSize * uPixelRatio * (160.0 / -mvPos.z);
        vAlpha = 0.3 + 0.35 * sin(t * 2.0);
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.05, d) * vAlpha;
        vec3 color = mix(vec3(0.4, 0.6, 1.0), vec3(0.7, 0.4, 1.0), gl_PointCoord.y);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

export function createW3DScene(container, options = {}) {
  const {
    enableMouseTracking = true,
    enableLiquidMorph = true,
    enableParticles = true,
    autoRotateSpeed = 0.15,
    floatAmplitude = 0.08,
    cameraDistance = 3.6,
    pixelRatio = Math.min(window.devicePixelRatio, 2),
    bevelSegments = 8,
  } = options;

  let width = container.offsetWidth || 300;
  let height = container.offsetHeight || 300;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, cameraDistance);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(pixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.6;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const envMap = createEnvironment(renderer);
  scene.environment = envMap;

  const wShape = createWShape();
  const geometry = new THREE.ExtrudeGeometry(wShape, {
    depth: 0.6,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelOffset: 0,
    bevelSegments,
    curveSegments: 1,
  });
  geometry.computeVertexNormals();
  geometry.center();

  const timeUniform = { value: 0 };
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x080828),
    metalness: 1.0,
    roughness: 0.03,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
    iridescence: 1.0,
    iridescenceIOR: 1.4,
    iridescenceThicknessRange: [100, 900],
    envMapIntensity: 3.2,
    reflectivity: 1.0,
    sheen: 0.5,
    sheenRoughness: 0.15,
    sheenColor: new THREE.Color(0x6699ff),
    emissive: new THREE.Color(0x0a0a40),
    emissiveIntensity: 0.5,
  });

  if (enableLiquidMorph) {
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = timeUniform;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>\nuniform float uTime;\n${NOISE_GLSL}`
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float noiseVal = snoise(position * 1.8 + uTime * 0.35) * 0.04;
        float noiseVal2 = snoise(position * 3.5 + uTime * 0.6 + 100.0) * 0.018;
        transformed += normal * (noiseVal + noiseVal2);`
      );
    };
  }

  const wMesh = new THREE.Mesh(geometry, material);
  scene.add(wMesh);

  let particles = null;
  if (enableParticles) {
    particles = createParticleSystem(50);
    scene.add(particles);
  }

  const ambientLight = new THREE.AmbientLight(0x303060, 0.5);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
  mainLight.position.set(3, 4, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x4488ff, 1.2);
  fillLight.position.set(-3, -1, 3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xcc44ff, 0.9);
  rimLight.position.set(0, 3, -3);
  scene.add(rimLight);

  const bottomLight = new THREE.PointLight(0x0066ff, 4, 10);
  bottomLight.position.set(0, -3, 2);
  scene.add(bottomLight);

  const topLight = new THREE.PointLight(0x8844ff, 3, 10);
  topLight.position.set(1, 3, 2);
  scene.add(topLight);

  let mouseX = 0, mouseY = 0;
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  if (enableMouseTracking) {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  const startTime = performance.now();
  let animationId;
  let isVisible = true;

  function animate() {
    animationId = requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = (performance.now() - startTime) * 0.001;
    timeUniform.value = time;

    const targetRotY = time * autoRotateSpeed + (enableMouseTracking ? mouseX * 0.4 : 0);
    const targetRotX = enableMouseTracking ? mouseY * 0.3 : Math.sin(time * 0.3) * 0.1;

    wMesh.rotation.x += (targetRotX - wMesh.rotation.x) * 0.04;
    wMesh.rotation.y += (targetRotY - wMesh.rotation.y) * 0.04;
    wMesh.position.y = Math.sin(time * 0.7) * floatAmplitude;

    if (particles) {
      particles.material.uniforms.uTime.value = time;
      particles.rotation.y = time * 0.05;
    }

    renderer.render(scene, camera);
  }

  animate();

  const visibilityObserver = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  visibilityObserver.observe(container);

  const resizeObserver = new ResizeObserver(() => {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    if (w === 0 || h === 0) return;
    width = w;
    height = h;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  resizeObserver.observe(container);

  const dispose = () => {
    cancelAnimationFrame(animationId);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    if (enableMouseTracking) window.removeEventListener('mousemove', onMouseMove);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    if (particles) {
      particles.geometry.dispose();
      particles.material.dispose();
    }
    envMap.dispose();
    canvas.remove();
  };

  return { dispose, canvas };
}

export function initHomeW3D(containerElement) {
  return createW3DScene(containerElement, {
    enableMouseTracking: true,
    enableLiquidMorph: true,
    enableParticles: true,
    autoRotateSpeed: 0.15,
    floatAmplitude: 0.08,
    cameraDistance: 3.6,
    bevelSegments: 8,
  });
}

export function initLogoW3D(containerElement) {
  return createW3DScene(containerElement, {
    enableMouseTracking: false,
    enableLiquidMorph: true,
    enableParticles: false,
    autoRotateSpeed: 0.3,
    floatAmplitude: 0.03,
    cameraDistance: 4.0,
    pixelRatio: Math.min(window.devicePixelRatio, 1.5),
    bevelSegments: 4,
  });
}
