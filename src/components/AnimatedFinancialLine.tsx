import React, { useLayoutEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register the necessary GSAP plugins
gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

export interface AnimationHandle {
  speedUp: () => void;
}

// Helper function to generate a financial path with straight lines and dips
const generateFinancialPath = (startPoint: {x: number, y: number}, endPoint: {x: number, y: number}): string => {
  const segments = 5; // Number of "rise and dip" sections
  let path = `M ${startPoint.x},${startPoint.y}`;

  // Build the path with straight line segments
  for (let i = 1; i <= segments; i++) {
    const progress = i / segments;
    // Calculate the next major point on the upward trajectory
    const riseX = startPoint.x + (endPoint.x - startPoint.x) * progress;
    const riseY = startPoint.y + (endPoint.y - startPoint.y) * progress;
    
    // Add a "dip" by creating a point below the main trajectory
    if (i < segments) {
        const dipX = riseX - 40; // Move left for the dip
        const dipY = riseY + 60 + Math.random() * 40; // Move down
        path += ` L ${dipX},${dipY}`;
    }
    
    // Add the "rise" point
    path += ` L ${riseX},${riseY}`;
  }
  
  return path;
};


const AnimatedFinancialLine = forwardRef<AnimationHandle>((props, ref) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackerRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGPathElement>(null); // The single path for drawing and motion
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Expose the speedUp function to the parent component
  useImperativeHandle(ref, () => ({
    speedUp() {
      if (!timelineRef.current) return;
      
      if (timelineRef.current.timeScale() > 1) return;

      gsap.to(timelineRef.current, {
        timeScale: 5,
        duration: 0.2,
        onComplete: () => {
          gsap.to(timelineRef.current, {
            timeScale: 0.5,
            duration: 1,
            ease: 'power2.out',
          });
        }
      });
    }
  }));

  useLayoutEffect(() => {
    if (!svgRef.current || !trackerRef.current || !pathRef.current) {
      return;
    }

    const tracker = trackerRef.current;
    const path = pathRef.current;
    
    const ctx = gsap.context(() => {
      const svgElement = svgRef.current;
      if (!svgElement) return;

      const viewBox = svgElement.viewBox.baseVal;
      const viewBoxWidth = viewBox.width;
      const viewBoxHeight = viewBox.height;

      // Define the animation's start and end points to align with the padded hero content
      const startPoint = { 
        x: viewBoxWidth * 0.1,      // Start ~10% in from the left
        y: viewBoxHeight * 0.95     // Start ~95% down from the top
      };
      const endPoint = { 
        x: viewBoxWidth * 0.9,      // End ~90% in from the left
        y: viewBoxHeight * 0.1      // End ~10% down from the top
      };

      // Generate and set the dynamic path
      const dynamicPath = generateFinancialPath(startPoint, endPoint);
      path.setAttribute('d', dynamicPath);

      // Create a single timeline to sync both animations
      const tl = gsap.timeline();
      
      // Animation 1: Draw the SVG path itself
      tl.from(path, {
        drawSVG: 0, // Start with the line completely hidden
        duration: 10, // Total duration for the line to draw
        ease: 'none' // Use a linear ease for constant speed
      }, 0); // Start at the beginning of the timeline

      // Animation 2: Move the arrow along the same path
      tl.to(tracker, {
        motionPath: {
          path: path,
          align: path,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        duration: 10, // Match the duration of the drawing animation
        ease: 'none' // Use a linear ease for constant speed
      }, 0); // Start at the beginning of the timeline

      // Control the initial speed
      tl.timeScale(2);
      gsap.to(tl, {
        timeScale: 0.5,
        duration: 2,
        ease: 'power2.inOut',
      });

      timelineRef.current = tl;

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 163, 161, 0.2)" />
          <stop offset="100%" stopColor="rgba(0, 163, 161, 0.9)" />
        </linearGradient>
        
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4D1" />
          <stop offset="100%" stopColor="#00A3A1" />
        </linearGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* A single path for both drawing and motion */}
      <path
        ref={pathRef}
        d="" // Path is now set dynamically in useLayoutEffect
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* The arrow head tracker */}
      <g ref={trackerRef}>
        <polygon
          points="12,0 -8,-6 -2,0 -8,6"
          fill="url(#arrowGradient)"
          stroke="#004D4C"
          strokeWidth="0.5"
          filter="url(#glow)"
        />
      </g>
    </svg>
  );
});

AnimatedFinancialLine.displayName = 'AnimatedFinancialLine';

export default AnimatedFinancialLine;
