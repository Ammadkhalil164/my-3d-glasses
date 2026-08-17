import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Waypoint {
  id: string;
  scale: number;
  rot: THREE.Vector3;
  z: number;
}

export default function ThreeDExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // Disable Three.js internal cache
    THREE.Cache.enabled = false;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Studio Environment Reflections Setup
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envMap = pmremGenerator.fromScene(roomEnv).texture;
    scene.environment = envMap;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff0dd, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffeedd, 1.8);
    dirLight1.position.set(-3, 6, 6);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf5e8d0, 0.6);
    dirLight2.position.set(3, 3, -3);
    scene.add(dirLight2);

    // 6. Define Waypoints for the 3D model
    const waypoints: Waypoint[] = [
      {
        id: "landing-zone-1", // Hero Section (Centered)
        scale: 1.5,
        rot: new THREE.Vector3(0, 0, 0),
        z: 0,
      },
      {
        id: "landing-zone-2", // DOPAMINE Section (Left container on screen)
        scale: 1.0,
        rot: new THREE.Vector3(0, -0.5, 0),
        z: -1,
      },
      {
        id: "landing-zone-3", // Key Achievements Section (Right mockup screen on screen)
        scale: 0.8,
        rot: new THREE.Vector3(0, 0.5, 0),
        z: 0,
      },
      {
        id: "landing-zone-4", // Most Expensive Mistake Section (Centered)
        scale: 0.5,
        rot: new THREE.Vector3(Math.PI / 4, 0, 0),
        z: -2,
      },
    ];

    // Helper: Convert 2D element screen position into 3D world position
    const getElementWorldPos = (elId: string, targetZ: number) => {
      const el = document.getElementById(elId);
      if (!el) {
        // Sensible fallback locations in world space
        if (elId === "landing-zone-1") return new THREE.Vector3(0, 0, 0);
        if (elId === "landing-zone-2") return new THREE.Vector3(-2.0, -1.0, -1);
        if (elId === "landing-zone-3") return new THREE.Vector3(1.8, -2.5, 0);
        if (elId === "landing-zone-4") return new THREE.Vector3(0, -4.0, -2);
        return new THREE.Vector3(0, 0, 0);
      }

      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Normalize device coordinates
      const ndcX = (x / window.innerWidth) * 2 - 1;
      const ndcY = -(y / window.innerHeight) * 2 + 1;

      // Project to world space
      const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = (targetZ - camera.position.z) / dir.z;

      return camera.position.clone().add(dir.multiplyScalar(distance));
    };

    // 7. Load 3D model
    let model: THREE.Group | null = null;
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/glasses-optimized.glb",
      (gltf) => {
        model = gltf.scene;

        // Center the geometry bounds
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Normalize initial model size
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 1.6 / maxDim;
        model.scale.setScalar(scaleFactor);

        // Group to manage local transforms
        const group = new THREE.Group();
        group.add(model);
        scene.add(group);

        // Apply luxury finishes: roughness: 0.2, metalness: 0.3, envMapIntensity: 0.8
        group.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.2;
              mat.metalness = 0.3;
              mat.envMapIntensity = 0.8;
              mat.needsUpdate = true;
            }
          }
        });

        // Setup ScrollTrigger Timeline mapping
        const animState = { progress: 0 };
        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#root",
            start: "top top",
            end: "bottom bottom",
            scrub: 2, // 2-second momentum lag
          },
        });

        // Build path stages (0 -> 1 -> 2 -> 3)
        scrollTimeline
          .to(animState, { progress: 0, duration: 1 }) // Hold in Hero
          .to(animState, { progress: 1, duration: 1.5, ease: "power2.inOut" }) // Slide to Dopamine
          .to(animState, { progress: 1, duration: 1 }) // Hold in Dopamine
          .to(animState, { progress: 2, duration: 1.5, ease: "power2.inOut" }) // Slide to Achievements
          .to(animState, { progress: 2, duration: 1 }) // Hold in Achievements
          .to(animState, { progress: 3, duration: 1.5, ease: "power2.inOut" }) // Slide to Mistake
          .to(animState, { progress: 3, duration: 1 }); // Hold in Mistake

        // Render & Update Loop
        const animate = () => {
          requestAnimationFrame(animate);

          if (group) {
            // Find current waypoint interval
            const progress = animState.progress;
            const index = Math.floor(progress);
            const frac = progress - index;

            const startWaypoint = waypoints[index];
            const endWaypoint = waypoints[index + 1] || startWaypoint;

            // Resolve target dimensions and coordinates
            const startPos = getElementWorldPos(startWaypoint.id, startWaypoint.z);
            const endPos = getElementWorldPos(endWaypoint.id, endWaypoint.z);

            const targetPos = new THREE.Vector3().lerpVectors(startPos, endPos, frac);
            const targetScale = THREE.MathUtils.lerp(startWaypoint.scale, endWaypoint.scale, frac);
            const targetRotX = THREE.MathUtils.lerp(startWaypoint.rot.x, endWaypoint.rot.x, frac);
            const targetRotY = THREE.MathUtils.lerp(startWaypoint.rot.y, endWaypoint.rot.y, frac);
            const targetRotZ = THREE.MathUtils.lerp(startWaypoint.rot.z, endWaypoint.rot.z, frac);

            // Antigravity Weightless Suspension float effect
            const floatOffset = Math.sin(Date.now() * 0.002) * 0.05;

            // Interpolate rotations and apply float offsets
            group.position.copy(targetPos);
            group.position.y += floatOffset;
            group.scale.setScalar(targetScale);

            // Mouse-guided micro-rotation for the Hero viewport
            let mouseOffset = new THREE.Vector3(0, 0, 0);
            if (progress < 0.2) {
              mouseOffset.y = mouseRef.current.x * 0.4;
              mouseOffset.x = mouseRef.current.y * -0.4;
            }

            group.rotation.set(
              targetRotX + mouseOffset.x,
              targetRotY + mouseOffset.y,
              targetRotZ
            );
          }

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading GLB glasses model:", error);
      }
    );

    // 8. Track Mouse position for interactive micro-rotation
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 9. Handle Window resizing to maintain projection metrics
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup listeners
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Explicitly traverse the scene to dispose of all geometries and materials
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;

        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-40"
    />
  );
}