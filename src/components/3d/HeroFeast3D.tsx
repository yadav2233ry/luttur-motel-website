import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroFeast3DProps {
  scrollY?: number;
}

export const HeroFeast3D: React.FC<HeroFeast3DProps> = ({ scrollY = 0 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 3.8, 6.2);
    camera.lookAt(0, 0, 0);

    // RENDERER
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglSupported(false);
      return;
    }

    // LIGHTING SETUP (Studio Culinary Lighting)
    const ambientLight = new THREE.AmbientLight(0x282015, 1.8);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xffecd1, 3.2);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Rim champagne spotlight
    const rimLight = new THREE.SpotLight(0xd4af37, 4.5, 20, Math.PI / 4, 0.4);
    rimLight.position.set(-5, 6, -3);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // Soft cool fill
    const fillLight = new THREE.PointLight(0xa5c4d4, 1.4, 15);
    fillLight.position.set(0, -2, 4);
    scene.add(fillLight);

    // Under-glow warm amber
    const underLight = new THREE.PointLight(0xd97706, 1.2, 10);
    underLight.position.set(0, -1, 0);
    scene.add(underLight);

    // ROOT FEAST GROUP
    const feastGroup = new THREE.Group();
    scene.add(feastGroup);

    // MATERIALS
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89b3c,
      metalness: 0.88,
      roughness: 0.22,
    });

    const innerThaliMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfb75c,
      metalness: 0.82,
      roughness: 0.28,
    });

    const katoriCopperMaterial = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      metalness: 0.75,
      roughness: 0.32,
    });

    // 1. MAIN THALI (Ceremonial Indian Brass Plate)
    const plateGroup = new THREE.Group();
    feastGroup.add(plateGroup);

    // Base plate
    const plateGeo = new THREE.CylinderGeometry(2.55, 2.45, 0.08, 64);
    const plateMesh = new THREE.Mesh(plateGeo, brassMaterial);
    plateMesh.receiveShadow = true;
    plateGroup.add(plateMesh);

    // Raised rim with bevel
    const rimGeo = new THREE.TorusGeometry(2.52, 0.09, 16, 64);
    const rimMesh = new THREE.Mesh(rimGeo, brassMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.05;
    plateGroup.add(rimMesh);

    // Inner embossed circle
    const innerRingGeo = new THREE.TorusGeometry(2.35, 0.025, 12, 64);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerThaliMaterial);
    innerRingMesh.rotation.x = Math.PI / 2;
    innerRingMesh.position.y = 0.045;
    plateGroup.add(innerRingMesh);

    // Center decorative crest
    const centerCrestGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.015, 32);
    const centerCrestMesh = new THREE.Mesh(centerCrestGeo, innerThaliMaterial);
    centerCrestMesh.position.y = 0.045;
    plateGroup.add(centerCrestMesh);

    // Helper to create a traditional Indian Katori bowl
    const createKatori = (x: number, z: number, radius = 0.72) => {
      const bowlGroup = new THREE.Group();
      bowlGroup.position.set(x, 0.05, z);

      // Outer bowl
      const bowlGeo = new THREE.CylinderGeometry(radius, radius * 0.75, 0.42, 32);
      const bowlMesh = new THREE.Mesh(bowlGeo, katoriCopperMaterial);
      bowlMesh.castShadow = true;
      bowlMesh.receiveShadow = true;
      bowlGroup.add(bowlMesh);

      // Bowl brass rim
      const bowlRimGeo = new THREE.TorusGeometry(radius, 0.035, 12, 32);
      const bowlRimMesh = new THREE.Mesh(bowlRimGeo, brassMaterial);
      bowlRimMesh.rotation.x = Math.PI / 2;
      bowlRimMesh.position.y = 0.21;
      bowlGroup.add(bowlRimMesh);

      return { bowlGroup, radius };
    };

    // 2. KATORI 1: PANEER BUTTER MASALA (Center-Left)
    const { bowlGroup: curryBowl, radius: curryRadius } = createKatori(-0.95, 0.45, 0.78);
    plateGroup.add(curryBowl);

    // Gravy surface
    const gravyGeo = new THREE.CylinderGeometry(curryRadius - 0.04, curryRadius - 0.04, 0.02, 32);
    const gravyMat = new THREE.MeshStandardMaterial({
      color: 0xd9531e, // Rich saffron-tomato butter curry
      metalness: 0.1,
      roughness: 0.35,
    });
    const gravyMesh = new THREE.Mesh(gravyGeo, gravyMat);
    gravyMesh.position.y = 0.18;
    curryBowl.add(gravyMesh);

    // Swirl of fresh cream
    const creamGeo = new THREE.TorusGeometry(0.35, 0.04, 8, 32);
    const creamMat = new THREE.MeshStandardMaterial({
      color: 0xfffaea,
      roughness: 0.4,
    });
    const creamMesh = new THREE.Mesh(creamGeo, creamMat);
    creamMesh.rotation.x = Math.PI / 2;
    creamMesh.position.y = 0.195;
    curryBowl.add(creamMesh);

    // Paneer cubes floating in gravy
    const paneerMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb, // Fresh creamy cottage cheese
      roughness: 0.65,
    });
    const paneerPositions = [
      { x: 0.12, z: 0.1, r: 0.2 },
      { x: -0.2, z: 0.15, r: 0.8 },
      { x: 0.0, z: -0.22, r: 0.4 },
      { x: -0.25, z: -0.1, r: 0.1 },
    ];
    paneerPositions.forEach((pos) => {
      const pCube = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.24), paneerMat);
      pCube.position.set(pos.x, 0.22, pos.z);
      pCube.rotation.y = pos.r;
      pCube.castShadow = true;
      curryBowl.add(pCube);
    });

    // Cilantro herb garnish flakes
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    for (let i = 0; i < 7; i++) {
      const flake = new THREE.Mesh(new THREE.DodecahedronGeometry(0.035), herbMat);
      flake.position.set((Math.random() - 0.5) * 0.45, 0.25, (Math.random() - 0.5) * 0.45);
      curryBowl.add(flake);
    }

    // 3. KATORI 2: DAL MAKHANI / TADKA (Center-Right)
    const { bowlGroup: dalBowl, radius: dalRadius } = createKatori(0.95, 0.45, 0.72);
    plateGroup.add(dalBowl);

    const dalMat = new THREE.MeshStandardMaterial({
      color: 0x5a2d18, // Rich slow-cooked black dal & butter
      roughness: 0.38,
    });
    const dalMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(dalRadius - 0.04, dalRadius - 0.04, 0.02, 32),
      dalMat
    );
    dalMesh.position.y = 0.18;
    dalBowl.add(dalMesh);

    // White butter dollop (Makkhan)
    const butterDollop = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    butterDollop.scale.set(1.2, 0.6, 1.2);
    butterDollop.position.set(0, 0.23, 0);
    dalBowl.add(butterDollop);

    // Red chilli tempering sliver
    const chilliMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.5 });
    const chilliMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.035, 0.22, 8), chilliMat);
    chilliMesh.rotation.z = Math.PI / 3;
    chilliMesh.position.set(0.08, 0.25, 0.05);
    dalBowl.add(chilliMesh);

    // 4. KATORI 3: AROMATIC SAFFRON JEERA RICE (Top Center)
    const { bowlGroup: riceBowl, radius: riceRadius } = createKatori(0, 1.15, 0.74);
    plateGroup.add(riceBowl);

    // Textured rice surface
    const riceSurfaceMat = new THREE.MeshStandardMaterial({
      color: 0xfffaea,
      roughness: 0.9,
    });
    const riceMound = new THREE.Mesh(
      new THREE.SphereGeometry(riceRadius - 0.03, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.42),
      riceSurfaceMat
    );
    riceMound.position.y = 0.12;
    riceBowl.add(riceMound);

    // Cumin seeds (jeera) and green peas on rice
    const cuminMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f });
    const peaMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });

    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * (riceRadius - 0.15);
      const jeera = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.06, 6), cuminMat);
      jeera.position.set(Math.cos(angle) * r, 0.26 + Math.random() * 0.04, Math.sin(angle) * r);
      jeera.rotation.x = Math.random() * Math.PI;
      jeera.rotation.z = Math.random() * Math.PI;
      riceBowl.add(jeera);
    }

    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * (riceRadius - 0.2);
      const pea = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), peaMat);
      pea.position.set(Math.cos(angle) * r, 0.28, Math.sin(angle) * r);
      riceBowl.add(pea);
    }

    // 5. CHARRED GOLDEN BUTTER NAAN (Front Section)
    const naanGroup = new THREE.Group();
    naanGroup.position.set(-0.35, 0.1, -0.9);
    naanGroup.rotation.y = -0.25;
    plateGroup.add(naanGroup);

    // Create an organic tear-drop / curved naan shape
    const naanShape = new THREE.Shape();
    naanShape.moveTo(0, 0);
    naanShape.bezierCurveTo(-0.7, 0.2, -0.9, 0.9, -0.4, 1.4);
    naanShape.bezierCurveTo(0, 1.7, 0.6, 1.5, 0.8, 1.0);
    naanShape.bezierCurveTo(1.0, 0.5, 0.6, 0.1, 0, 0);

    const extrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.03,
    };
    const naanGeo = new THREE.ExtrudeGeometry(naanShape, extrudeSettings);
    naanGeo.center();

    const naanMat = new THREE.MeshStandardMaterial({
      color: 0xdfbe7a, // Golden tandoori blistered dough
      roughness: 0.75,
      metalness: 0.05,
    });
    const naanMesh = new THREE.Mesh(naanGeo, naanMat);
    naanMesh.rotation.x = -Math.PI / 2 + 0.1;
    naanMesh.castShadow = true;
    naanGroup.add(naanMesh);

    // Blistered dark spots on Naan (Tandoor char marks)
    const charMat = new THREE.MeshStandardMaterial({ color: 0x452309, roughness: 0.95 });
    const charSpots = [
      { x: -0.2, z: 0.1, s: 0.08 },
      { x: 0.15, z: -0.2, s: 0.06 },
      { x: 0.3, z: 0.25, s: 0.09 },
      { x: -0.35, z: -0.15, s: 0.07 },
      { x: 0.0, z: 0.3, s: 0.05 },
    ];
    charSpots.forEach((spot) => {
      const charSpot = new THREE.Mesh(new THREE.SphereGeometry(spot.s, 10, 8), charMat);
      charSpot.scale.set(1.4, 0.2, 1.1);
      charSpot.position.set(spot.x, 0.035, spot.z);
      naanGroup.add(charSpot);
    });

    // 6. CRISPY PANEER TIKKA & GARNISH (Right Front)
    const tikkaGroup = new THREE.Group();
    tikkaGroup.position.set(1.15, 0.08, -0.65);
    plateGroup.add(tikkaGroup);

    // Tandoori tikka block with charred crust
    const tikkaMat = new THREE.MeshStandardMaterial({
      color: 0xb94719,
      roughness: 0.6,
    });
    const tikkaCube1 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.24, 0.32), tikkaMat);
    tikkaCube1.position.set(0, 0.1, 0);
    tikkaCube1.rotation.y = 0.3;
    tikkaCube1.castShadow = true;
    tikkaGroup.add(tikkaCube1);

    const tikkaCube2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.22, 0.28), tikkaMat);
    tikkaCube2.position.set(0.22, 0.09, 0.15);
    tikkaCube2.rotation.y = -0.5;
    tikkaCube2.castShadow = true;
    tikkaGroup.add(tikkaCube2);

    // Sliced lemon wedge
    const lemonMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3 });
    const lemonWedge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.04, 16, 1, false, 0, Math.PI),
      lemonMat
    );
    lemonWedge.rotation.x = Math.PI / 2;
    lemonWedge.position.set(-0.25, 0.05, 0.1);
    tikkaGroup.add(lemonWedge);

    // Cucumber round slice
    const cukeMat = new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.5 });
    const cukeDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.03, 20), cukeMat);
    cukeDisc.position.set(-0.35, 0.02, -0.15);
    tikkaGroup.add(cukeDisc);

    // 7. RISING STEAM PARTICLES (Subtle, Realistic Wisp)
    const steamParticleCount = 65;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamOpacities = new Float32Array(steamParticleCount);
    const steamSpeeds = new Float32Array(steamParticleCount);
    const steamYOffsets = new Float32Array(steamParticleCount);

    for (let i = 0; i < steamParticleCount; i++) {
      // Scatter around the warm bowls
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 1.4;
      steamPositions[i * 3] = Math.cos(angle) * radius;
      steamPositions[i * 3 + 1] = 0.4 + Math.random() * 2.2;
      steamPositions[i * 3 + 2] = Math.sin(angle) * radius;

      steamOpacities[i] = Math.random() * 0.45;
      steamSpeeds[i] = 0.008 + Math.random() * 0.012;
      steamYOffsets[i] = Math.random() * 2.5;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Custom steam canvas texture
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const ctx = steamCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.4, 'rgba(240, 230, 210, 0.3)');
      grad.addColorStop(1, 'rgba(200, 200, 200, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const steamTexture = new THREE.CanvasTexture(steamCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.45,
      map: steamTexture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    feastGroup.add(steamPoints);

    // 8. FLOATING GOLDEN BOKEH EMBERS (Atmospheric Awwwards Look)
    const emberCount = 140;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    const emberOriginals = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 6 + 1.5;
      const z = (Math.random() - 0.5) * 8;
      emberPositions[i * 3] = x;
      emberPositions[i * 3 + 1] = y;
      emberPositions[i * 3 + 2] = z;
      emberOriginals[i * 3] = x;
      emberOriginals[i * 3 + 1] = y;
      emberOriginals[i * 3 + 2] = z;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    const emberMat = new THREE.PointsMaterial({
      color: 0xf5d061,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    scene.add(emberPoints);

    // INTERACTIVE MOUSE TILTING
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 0.45;
      mouseY = normY * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow cinematic base rotation + mouse tilt
      targetRotY = mouseX + Math.sin(elapsed * 0.25) * 0.2;
      targetRotX = mouseY + 0.15;

      feastGroup.rotation.y += (targetRotY - feastGroup.rotation.y) * 0.04;
      feastGroup.rotation.x += (targetRotX - feastGroup.rotation.x) * 0.04;

      // Gentle floating levitation
      feastGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;

      // Scroll response (camera depth & tilt transition)
      const scrollFactor = Math.min((window.scrollY || scrollY) / 700, 1.5);
      camera.position.y = 3.8 + scrollFactor * 0.8;
      camera.position.z = 6.2 - scrollFactor * 1.2;
      camera.lookAt(0, scrollFactor * 0.2, 0);

      // Animate Steam particles
      const steamPos = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamParticleCount; i++) {
        steamPos[i * 3 + 1] += steamSpeeds[i];
        steamPos[i * 3] += Math.sin(elapsed + i) * 0.0015;

        // Reset when too high
        if (steamPos[i * 3 + 1] > 3.0) {
          steamPos[i * 3 + 1] = 0.4;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Animate floating golden embers
      const embPos = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        embPos[i * 3 + 1] = emberOriginals[i * 3 + 1] + Math.sin(elapsed * 0.8 + i) * 0.35;
        embPos[i * 3] = emberOriginals[i * 3] + Math.cos(elapsed * 0.5 + i) * 0.25;
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up geometries and materials
      plateGeo.dispose();
      rimGeo.dispose();
      brassMaterial.dispose();
      innerThaliMaterial.dispose();
      katoriCopperMaterial.dispose();
      steamGeo.dispose();
      steamMat.dispose();
      steamTexture.dispose();
      emberGeo.dispose();
      emberMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[580px] flex items-center justify-center overflow-hidden">
      {webglSupported ? (
        <div
          ref={mountRef}
          className={`w-full h-full absolute inset-0 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Interactive 3D pure vegetarian Indian feast at Luttur Motel"
        />
      ) : (
        /* WebGL Fallback: High-end static layered composition */
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center p-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4af37]/20 via-[#b45309]/10 to-transparent blur-3xl animate-pulse" />
          <div className="relative z-10 w-80 h-80 rounded-full border-2 border-[#d4af37]/40 shadow-2xl shadow-[#d4af37]/20 overflow-hidden bg-[#18181f]/80 p-3 flex flex-col items-center justify-center text-center">
            <img
              src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
              alt="LUTTUR MOTEL Pure Vegetarian Specialties"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      )}

      {/* Atmospheric lighting gradient overlay to blend 3D canvas seamlessly into dark background */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#08080a]/40 to-[#08080a]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#08080a] to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#08080a] to-transparent" />
    </div>
  );
};
