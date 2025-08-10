import { useLayoutEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface UseScrollSnapOptions {
  sections: string[]; // CSS selectors for sections to snap to
  duration?: number; // Animation duration for snap
  ease?: string; // Easing function
  offset?: number; // Offset from top when snapping
  threshold?: number; // Snap threshold (0-1)
  debug?: boolean; // Enable debug logging
  directional?: boolean; // Enable directional snapping
}

export const useScrollSnap = ({
  sections,
  duration = 1,
  ease = 'power2.inOut',
  offset = 0,
  threshold = 0.5,
  debug = false,
  directional = true
}: UseScrollSnapOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger[]>([]);
  const lastScrollY = useRef<number>(0);
  const scrollDirection = useRef<'up' | 'down'>('down');

  // Method to get current active section
  const getCurrentSection = useCallback((): number => {
    const scrollTop = window.pageYOffset + window.innerHeight / 2; // Use center of viewport
    let currentSection = 0;
    let minDistance = Infinity;

    sections.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const distance = Math.abs(scrollTop - elementTop);
        
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = index;
        }
      }
    });

    return currentSection;
  }, [sections]);

  useLayoutEffect(() => {
    if (sections.length === 0) return;

    // Clear any existing ScrollTriggers
    scrollTriggerRef.current.forEach(trigger => trigger.kill());
    scrollTriggerRef.current = [];

    // Create snap points for each section
    const snapPoints: number[] = [];
    const sectionElements: Element[] = [];
    const sectionData: Array<{ element: Element; selector: string; top: number }> = [];

    sections.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        sectionElements.push(element);
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        // Use actual scroll positions instead of ratios for better snap accuracy
        const snapPoint = elementTop - offset;
        
        snapPoints.push(snapPoint);
        sectionData.push({ element, selector, top: elementTop });
        
        if (debug) {
          console.log(`Snap point for ${selector}:`, {
            elementTop,
            snapPoint,
            offset,
            scrollHeight: document.body.scrollHeight
          });
        }
      }
    });

    if (snapPoints.length === 0) {
      if (debug) console.warn('No valid sections found for snapping');
      return;
    }

    // Create ScrollTrigger for snap functionality using window scroll
    const snapTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: (progress: number) => {
          // Convert progress to scroll position
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const scrollPosition = progress * maxScroll;
          
          // Detect scroll direction
          const currentScrollY = window.pageYOffset;
          if (currentScrollY !== lastScrollY.current) {
            scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
            lastScrollY.current = currentScrollY;
          }
          
          // Find current section index
          let currentSectionIndex = 0;
          let minDistance = Math.abs(scrollPosition - snapPoints[0]);
          
          snapPoints.forEach((point, index) => {
            const distance = Math.abs(scrollPosition - point);
            if (distance < minDistance) {
              minDistance = distance;
              currentSectionIndex = index;
            }
          });
          
          // Determine target section based on scroll direction
          let targetSectionIndex = currentSectionIndex;
          
          if (scrollDirection.current === 'down') {
            // Scrolling down - go to next section if we're past the midpoint
            const currentPoint = snapPoints[currentSectionIndex];
            if (scrollPosition > currentPoint + (window.innerHeight * 0.3)) {
              targetSectionIndex = Math.min(snapPoints.length - 1, currentSectionIndex + 1);
            }
          } else {
            // Scrolling up - go to previous section if we're before the midpoint
            const currentPoint = snapPoints[currentSectionIndex];
            if (scrollPosition < currentPoint - (window.innerHeight * 0.3)) {
              targetSectionIndex = Math.max(0, currentSectionIndex - 1);
            }
          }
          
          const targetPoint = snapPoints[targetSectionIndex];
          const targetProgress = Math.max(0, Math.min(1, targetPoint / maxScroll));
          
          if (debug) {
            console.log('Directional snap calculation:', {
              currentProgress: progress,
              scrollPosition,
              scrollDirection: scrollDirection.current,
              currentSectionIndex,
              targetSectionIndex,
              targetPoint,
              targetProgress
            });
          }
          
          return targetProgress;
        },
        duration: duration,
        delay: 0.1,
        ease: ease,
        inertia: true,
        directional: true
      },
      onUpdate: (self) => {
        // Add visual feedback during scroll
        const progress = self.progress;
        document.body.style.setProperty('--scroll-progress', progress.toString());
        
        if (debug) {
          console.log('Scroll progress:', progress);
        }
      },
      onSnapComplete: () => {
        if (debug) {
          const currentSection = getCurrentSection();
          console.log('Snap completed to section:', currentSection, sectionData[currentSection]?.selector);
        }
      }
    });

    scrollTriggerRef.current.push(snapTrigger);

    // Create individual triggers for each section for additional animations
    sectionElements.forEach((element) => {
      const sectionTrigger = ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          // Add active class or trigger animations when section enters
          element.classList.add('section-active');
        },
        onLeave: () => {
          element.classList.remove('section-active');
        },
        onEnterBack: () => {
          element.classList.add('section-active');
        },
        onLeaveBack: () => {
          element.classList.remove('section-active');
        }
      });

      scrollTriggerRef.current.push(sectionTrigger);
    });

    // Cleanup function
    return () => {
      scrollTriggerRef.current.forEach(trigger => trigger.kill());
      scrollTriggerRef.current = [];
    };
  }, [sections, duration, ease, offset, threshold, debug, directional, getCurrentSection]);

  // Method to programmatically snap to a specific section
  const snapToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections.length) {
      if (debug) console.warn('Invalid section index:', sectionIndex);
      return;
    }

    const element = document.querySelector(sections[sectionIndex]);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      
      if (debug) {
        console.log('Snapping to section:', sections[sectionIndex], 'at position:', elementTop - offset);
      }
      
      gsap.to(window, {
        scrollTo: elementTop - offset,
        duration: duration,
        ease: ease,
        onComplete: () => {
          if (debug) console.log('Manual snap completed to:', sections[sectionIndex]);
        }
      });
    }
  };

  // Method to snap to section by selector
  const snapToSectionBySelector = (selector: string) => {
    const sectionIndex = sections.indexOf(selector);
    if (sectionIndex !== -1) {
      snapToSection(sectionIndex);
    } else if (debug) {
      console.warn('Section not found:', selector);
    }
  };



  // Method to get section info for debugging
  const getSectionInfo = () => {
    return sections.map((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          index,
          selector,
          top: rect.top + window.pageYOffset,
          height: rect.height,
          snapPoint: snapPoints[index]
        };
      }
      return null;
    }).filter(Boolean);
  };

  return {
    containerRef,
    snapToSection,
    snapToSectionBySelector,
    getCurrentSection,
    getSectionInfo
  };
};

export default useScrollSnap;