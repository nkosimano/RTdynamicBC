import React, { useLayoutEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export interface WebGLBackgroundHandle {
  triggerCameraAnimation: () => void;
  triggerDramaticZoom: () => void;
  triggerOrbitAnimation: () => void;
  resetCamera: () => void;
}

const WebGLBackground = forwardRef<WebGLBackgroundHandle>((props, ref) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const particleSystemRef = useRef<THREE.Points>();
  const animationTimelineRef = useRef<gsap.core.Timeline>();
  const resetTimeoutRef = useRef<NodeJS.Timeout>();

  // Initial camera position for reset
  const initialCameraPos = { x: 0, y: 0, z: 5 };
  const initialCameraRot = { x: 0, y: 0, z: 0 };

  // Auto-reset functionality
  const scheduleAutoReset = useCallback(() => {
    // Clear any existing timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    
    // Set new timeout for auto-reset
    resetTimeoutRef.current = setTimeout(() => {
      if (!cameraRef.current) return;
      
      // Kill any existing animations
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
      
      const camera = cameraRef.current;
      
      gsap.to(camera.position, {
        x: initialCameraPos.x,
        y: initialCameraPos.y,
        z: initialCameraPos.z,
        duration: 2,
        ease: 'power3.inOut',
      });
      
      gsap.to(camera.rotation, {
        x: initialCameraRot.x,
        y: initialCameraRot.y,
        z: initialCameraRot.z,
        duration: 2,
        ease: 'power3.inOut',
      });

      gsap.to(camera, {
        fov: 75,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      });
    }, 10000); // 10 seconds
  }, [initialCameraPos.x, initialCameraPos.y, initialCameraPos.z, initialCameraRot.x, initialCameraRot.y, initialCameraRot.z]);

  // Enhanced camera shake effect
  const addCameraShake = useCallback((intensity = 0.1, duration = 0.5) => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const originalPos = { ...camera.position };

    gsap.to(camera.position, {
      x: originalPos.x + (Math.random() - 0.5) * intensity,
      y: originalPos.y + (Math.random() - 0.5) * intensity,
      z: originalPos.z + (Math.random() - 0.5) * intensity,
      duration: 0.1,
      repeat: Math.floor(duration / 0.1),
      yoyo: true,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(camera.position, {
          x: originalPos.x,
          y: originalPos.y,
          z: originalPos.z,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    });
  }, []);

  // Expose enhanced animation functions to the parent
  useImperativeHandle(ref, () => ({
    triggerCameraAnimation() {
      if (!cameraRef.current || !particleSystemRef.current) return;

      // Kill any existing timeline
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
      
      // Schedule auto-reset after animation
      scheduleAutoReset();

      const camera = cameraRef.current;
      const particles = particleSystemRef.current;
      
      // Create a complex animation timeline
      const tl = gsap.timeline();
      animationTimelineRef.current = tl;

      // Phase 1: Dramatic pull back with rotation
      tl.to(camera.position, {
        x: -8,
        y: 4,
        z: 12,
        duration: 2,
        ease: 'power3.out',
      }, 0)
      .to(camera.rotation, {
        x: -Math.PI / 6,
        y: -Math.PI / 8,
        z: Math.PI / 32,
        duration: 2,
        ease: 'power3.out',
      }, 0)
      
      // Phase 2: Accelerate particle rotation
      .to(particles.rotation, {
        y: particles.rotation.y + Math.PI * 2,
        x: particles.rotation.x + Math.PI / 4,
        duration: 3,
        ease: 'power2.inOut',
      }, 0.5)
      
      // Phase 3: Swooping dive
      .to(camera.position, {
        x: 3,
        y: -2,
        z: 8,
        duration: 1.5,
        ease: 'power4.inOut',
      }, 2)
      .to(camera.rotation, {
        x: Math.PI / 12,
        y: Math.PI / 16,
        z: -Math.PI / 64,
        duration: 1.5,
        ease: 'power4.inOut',
      }, 2)
      
      // Phase 4: Final positioning with shake
      .to(camera.position, {
        x: 0,
        y: 0,
        z: 6,
        duration: 1.8,
        ease: 'back.out(1.7)',
        onComplete: () => addCameraShake(0.05, 0.3)
      }, 3.5)
      .to(camera.rotation, {
        x: -Math.PI / 8,
        y: 0,
        z: 0,
        duration: 1.8,
        ease: 'back.out(1.7)',
      }, 3.5);
    },

    triggerDramaticZoom() {
      if (!cameraRef.current) return;
      
      // Schedule auto-reset after animation
      scheduleAutoReset();
      
      const camera = cameraRef.current;
      
      // Dramatic zoom with field of view change
      const tl = gsap.timeline();
      
      tl.to(camera, {
        fov: 120,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: () => camera.updateProjectionMatrix()
      })
      .to(camera.position, {
        z: 15,
        duration: 1.2,
        ease: 'power4.out',
      }, 0)
      .to(camera.rotation, {
        z: Math.PI / 4,
        duration: 1.2,
        ease: 'power3.inOut',
      }, 0)
      .to(camera, {
        fov: 75,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      }, 1.2)
      .to(camera.position, {
        z: 8,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      }, 1.5)
      .to(camera.rotation, {
        z: 0,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
      }, 1.5);
    },

    triggerOrbitAnimation() {
      if (!cameraRef.current || !particleSystemRef.current) return;
      
      // Schedule auto-reset after animation
      scheduleAutoReset();
      
      const camera = cameraRef.current;
      const particles = particleSystemRef.current;
      
      // Create orbital movement
      const radius = 10;
      const centerY = 2;
      
      const tl = gsap.timeline({ repeat: 1, yoyo: true });
      
      // Orbit animation
      tl.to({}, {
        duration: 6,
        ease: 'none',
        onUpdate: function() {
          const progress = this.progress();
          const angle = progress * Math.PI * 2;
          
          camera.position.x = Math.cos(angle) * radius;
          camera.position.z = Math.sin(angle) * radius + 5;
          camera.position.y = centerY + Math.sin(angle * 3) * 2;
          
          // Look at center
          camera.lookAt(0, 0, 0);
        }
      })
      
      // Sync particle rotation
      .to(particles.rotation, {
        y: particles.rotation.y + Math.PI * 4,
        x: particles.rotation.x + Math.PI * 2,
        z: particles.rotation.z + Math.PI,
        duration: 6,
        ease: 'none',
      }, 0);
    },

    resetCamera() {
      if (!cameraRef.current) return;
      
      // Kill any existing animations
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
      
      const camera = cameraRef.current;
      
      gsap.to(camera.position, {
        x: initialCameraPos.x,
        y: initialCameraPos.y,
        z: initialCameraPos.z,
        duration: 2,
        ease: 'power3.inOut',
      });
      
      gsap.to(camera.rotation, {
        x: initialCameraRot.x,
        y: initialCameraRot.y,
        z: initialCameraRot.z,
        duration: 2,
        ease: 'power3.inOut',
      });

      gsap.to(camera, {
        fov: 75,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => camera.updateProjectionMatrix()
      });
    }
  }));

  useLayoutEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(initialCameraPos.x, initialCameraPos.y, initialCameraPos.z);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Serene particle system with gentle movement
    const particleCount = 2800;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Spread particles gently across a wider area
      positions[i] = (Math.random() - 0.5) * 30;     // x
      positions[i + 1] = (Math.random() - 0.5) * 20; // y  
      positions[i + 2] = (Math.random() - 0.5) * 25; // z
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: '#00A3A1',
      size: 0.04,
      transparent: true,
      opacity: 0.3,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // Gentle animation loop for serenity
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005; // Slower time progression for gentleness
      
      // Gentle floating movement for each particle
      const positions = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const particleTime = time + i * 0.1; // Slight offset per particle
        
        // Gentle horizontal drift
        positions[i3] += Math.sin(particleTime * 0.3) * 0.002;
        
        // Subtle vertical floating
        positions[i3 + 1] += Math.cos(particleTime * 0.4) * 0.001;
        
        // Very gentle depth movement
        positions[i3 + 2] += Math.sin(particleTime * 0.2) * 0.0005;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      
      // Very slow, peaceful rotation
      particleSystem.rotation.y += 0.0002;
      particleSystem.rotation.x += 0.0001;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount && camera && renderer) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [addCameraShake, scheduleAutoReset, initialCameraPos.x, initialCameraPos.y, initialCameraPos.z]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
});

WebGLBackground.displayName = 'WebGLBackground';

export default WebGLBackground;