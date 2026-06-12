import * as THREE from 'three';

export function initThreeBg() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  // Setup Three.js environment
  const scene = new THREE.Scene();
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 7.5;

  // Set up renderer with alpha for CSS background gradients
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  
  // Set resolution
  const heroSection = canvas.parentElement;
  renderer.setSize(heroSection.offsetWidth, heroSection.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2)); // Cap pixel ratio for WebGL performance

  // Disable shadow maps to optimize performance (massive rendering speedup)
  renderer.shadowMap.enabled = false;

  // Handle Resize
  function onWindowResize() {
    camera.aspect = heroSection.offsetWidth / heroSection.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(heroSection.offsetWidth, heroSection.offsetHeight);
  }
  window.addEventListener('resize', onWindowResize);

  // Group to contain all floating glass meshes
  const glassGroup = new THREE.Group();
  scene.add(glassGroup);

  // Helper: Create a glowing circle texture for background particles
  function createParticleTexture(colorHex) {
    const size = 32;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, colorHex);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }

  const textureStar = createParticleTexture('#ffffff');

  // ============================================
  // 1. LIGHTING (Spline Studio Setup)
  // ============================================
  
  // Base ambient light
  const ambientLight = new THREE.AmbientLight(0x0a0a18, 2.5);
  scene.add(ambientLight);

  // Spot 1: Neon HSL-driven light (Top Left)
  const spotCyan = new THREE.SpotLight(0x00f0ff, 35, 35, Math.PI / 4, 0.8, 1.2);
  spotCyan.position.set(-6, 6, 6);
  spotCyan.castShadow = false;
  scene.add(spotCyan);

  // Spot 2: Neon HSL-driven light (Bottom Right)
  const spotPink = new THREE.SpotLight(0xff007f, 35, 35, Math.PI / 4, 0.8, 1.2);
  spotPink.position.set(6, -6, 6);
  spotPink.castShadow = false;
  scene.add(spotPink);

  // Spot 3: Soft Violet (Center Behind)
  const pointViolet = new THREE.PointLight(0x8b5cf6, 20, 25);
  pointViolet.position.set(0, 2, -4);
  scene.add(pointViolet);

  // Directional: Key White Light for specular highlights
  const keyLight = new THREE.DirectionalLight(0xffffff, 5.0);
  keyLight.position.set(2, 4, 5);
  scene.add(keyLight);

  // ============================================
  // 2. MATERIALS & SHADERS (Chrome & Frosted Glass Hybrid)
  // ============================================
  
  // Material 1: Purple-Indigo Chrome (Main Torus Knot)
  const purpleChromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x7c3aed,
    metalness: 0.9,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  });

  // Material 2: Frosted Glass (Orb Sphere)
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    opacity: 0.45,
    transparent: true,
    side: THREE.DoubleSide
  });

  // Material 3: Cyan Chrome (Orb Torus)
  const cyanChromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    metalness: 0.9,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  });

  // Material 4: Coral Chrome (Orb Octahedron)
  const coralChromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff4d80,
    metalness: 0.9,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
  });

  // Material 5: Gold Chrome (Large Outer Ring)
  const goldChromeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.01,
  });

  // ============================================
  // 3. GEOMETRIES (Futuristic 3D Mesh Assemblies)
  // ============================================

  // Shape 1: Central Torus Knot (Main Spline asset)
  const knotGeometry = new THREE.TorusKnotGeometry(1.4, 0.45, 120, 16, 2, 3);
  const mainKnot = new THREE.Mesh(knotGeometry, purpleChromeMaterial);
  mainKnot.castShadow = false;
  mainKnot.receiveShadow = false;
  glassGroup.add(mainKnot);

  // Shape 2: Orbiting Glass Sphere (Large right)
  const sphereGeom = new THREE.SphereGeometry(0.55, 32, 32);
  const orbSphere = new THREE.Mesh(sphereGeom, glassMaterial);
  orbSphere.position.set(3.2, 1.8, -1);
  glassGroup.add(orbSphere);

  // Shape 3: Orbiting Glass Torus (Small left)
  const torusGeom = new THREE.TorusGeometry(0.45, 0.15, 16, 64);
  const orbTorus = new THREE.Mesh(torusGeom, cyanChromeMaterial);
  orbTorus.position.set(-3.2, -1.8, 1);
  orbTorus.rotation.x = Math.PI / 3;
  glassGroup.add(orbTorus);

  // Shape 4: Orbiting Glass Octahedron (Bottom right)
  const octGeom = new THREE.OctahedronGeometry(0.5);
  const orbOctahedron = new THREE.Mesh(octGeom, coralChromeMaterial);
  orbOctahedron.position.set(2.0, -2.2, 1.5);
  glassGroup.add(orbOctahedron);

  // Shape 5: Large Outer Ring orbiting the scene
  const ringGeom = new THREE.TorusGeometry(2.8, 0.06, 16, 100);
  const outerRing = new THREE.Mesh(ringGeom, goldChromeMaterial);
  outerRing.rotation.x = Math.PI / 4;
  glassGroup.add(outerRing);

  // ============================================
  // 4. BACKGROUND REFRACTIVE PARTICLES
  // ============================================
  const starsCount = 150;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starsCount * 3);

  for (let i = 0; i < starsCount; i++) {
    // Keep them behind the glass meshes so they refract beautifully
    starPositions[i * 3] = (Math.random() - 0.5) * 16;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    starPositions[i * 3 + 2] = -4; // depth layer behind shapes
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  const starsMaterial = new THREE.PointsMaterial({
    size: 0.12,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: textureStar,
    opacity: 0.45
  });

  const starsField = new THREE.Points(starGeometry, starsMaterial);
  scene.add(starsField);

  // ============================================
  // 5. INTERACTION & ANIMATION
  // ============================================
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  
  function onMouseMove(event) {
    mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  window.addEventListener('mousemove', onMouseMove);

  const clock = new THREE.Clock();
  let animationFrameId;
  let isTabActive = true;

  function animate() {
    if (!isTabActive) return;

    animationFrameId = requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // 1. Slow, organic rotations for each shape
    mainKnot.rotation.y = time * 0.15;
    mainKnot.rotation.x = time * 0.08;
    
    // Floating movement (sin/cos translation)
    mainKnot.position.y = Math.sin(time * 0.8) * 0.12;

    // Orb 2 (Sphere) floating & orbiting
    orbSphere.position.y = 1.8 + Math.sin(time * 1.2) * 0.15;
    orbSphere.position.x = 3.2 + Math.cos(time * 0.6) * 0.15;
    orbSphere.rotation.x = time * 0.3;

    // Orb 3 (Torus) floating & orbiting
    orbTorus.position.y = -1.8 + Math.cos(time * 1.0) * 0.15;
    orbTorus.position.x = -3.2 + Math.sin(time * 0.7) * 0.15;
    orbTorus.rotation.y = time * 0.4;
    orbTorus.rotation.z = time * 0.2;

    // Orb 4 (Octahedron) floating & rotating
    orbOctahedron.position.y = -2.2 + Math.sin(time * 1.4) * 0.12;
    orbOctahedron.rotation.y = time * 0.5;
    orbOctahedron.rotation.x = time * 0.3;

    // Outer gold ring floating & rotating
    outerRing.rotation.z = -time * 0.12;
    outerRing.rotation.y = Math.sin(time * 0.5) * 0.2;

    // 2. Parallax mouse drift
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Shift lighting based on mouse for interactive specular highlights
    spotCyan.position.x = -6 + mouse.x * 3.5;
    spotCyan.position.y = 6 + mouse.y * 3.5;
    
    spotPink.position.x = 6 + mouse.x * 3.5;
    spotPink.position.y = -6 + mouse.y * 3.5;

    keyLight.position.x = 2 + mouse.x * 4.0;
    keyLight.position.y = 4 + mouse.y * 4.0;

    // Slow color-shifting gradient lights
    const hueCyan = (time * 0.02) % 1;
    const huePink = (time * 0.02 + 0.4) % 1;
    const hueViolet = (time * 0.015 + 0.7) % 1;
    
    spotCyan.color.setHSL(hueCyan, 1.0, 0.5);
    spotPink.color.setHSL(huePink, 1.0, 0.5);
    pointViolet.color.setHSL(hueViolet, 0.9, 0.65);

    // Tilt the entire glass group based on mouse
    glassGroup.rotation.x = -mouse.y * 0.25;
    glassGroup.rotation.y = mouse.x * 0.25;

    // Shift camera slightly for perspective parallax
    camera.position.x = mouse.x * 0.8;
    camera.position.y = mouse.y * 0.8;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // Handle visibility state to optimize system resources
  function handleVisibilityChange() {
    if (document.hidden) {
      isTabActive = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isTabActive = true;
      clock.getDelta();
      animate();
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Start loop
  animate();

  // Return destroy/cleanup handler
  return {
    destroy: () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      
      knotGeometry.dispose();
      sphereGeom.dispose();
      torusGeom.dispose();
      octGeom.dispose();
      ringGeom.dispose();
      starGeometry.dispose();
      
      purpleChromeMaterial.dispose();
      glassMaterial.dispose();
      cyanChromeMaterial.dispose();
      coralChromeMaterial.dispose();
      goldChromeMaterial.dispose();
      starsMaterial.dispose();
      textureStar.dispose();
    }
  };
}
