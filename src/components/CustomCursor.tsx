import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 45, stiffness: 120 });
  const trailY = useSpring(cursorY, { damping: 45, stiffness: 120 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"], .cursor-pointer');
      
      if (clickable) {
        setIsHovering(true);
        // Special case for project cards or labels
        if (clickable.classList.contains('group') || clickable.tagName === 'A') {
            setHoverText(clickable.getAttribute('data-cursor-text') || '');
        } else {
            setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Outer Ring */}
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : isClicking ? 0.7 : 1,
            opacity: isVisible ? 1 : 0,
            borderColor: isHovering ? 'rgba(242, 125, 38, 0.9)' : 'rgba(255, 255, 255, 0.15)',
            borderWidth: isHovering ? '1.5px' : '2px',
            backgroundColor: isHovering ? 'rgba(242, 125, 38, 0.05)' : 'transparent',
          }}
          transition={{
            scale: { type: 'spring', damping: 25, stiffness: 300, mass: 0.5 },
            opacity: { duration: 0.3 },
            borderColor: { duration: 0.4 },
            borderWidth: { duration: 0.4 },
            backgroundColor: { duration: 0.4 },
          }}
          className="absolute inset-0 rounded-full"
        />

        {/* Center Dot / Pointer */}
        <motion.div
          animate={{
            scale: isHovering ? 0.3 : 1,
            backgroundColor: isHovering ? '#F27D26' : '#fff',
            width: isHovering ? '12px' : '4px',
            height: isHovering ? '12px' : '4px',
            boxShadow: isHovering ? '0 0 20px rgba(242, 125, 38, 0.6)' : '0 0 0px transparent',
          }}
          transition={{ 
            type: 'spring', 
            damping: 20, 
            stiffness: 400,
            duration: 0.2 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />

        {/* Floating Text */}
        <AnimatePresence>
          {isHovering && hoverText && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-primary text-black text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-[0.2em] shadow-lg"
            >
              {hoverText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liquid Reveal Effect */}
        <AnimatePresence>
          {isHovering && (
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 0.2, scale: 1.2 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="absolute inset-0 bg-brand-primary rounded-full blur-md"
             />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Dot (Delayed follow) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-primary/20 rounded-full pointer-events-none z-[9998] hidden md:block blur-[1px]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? (isHovering ? 0 : 0.6) : 0,
          scale: isClicking ? 2 : 1,
        }}
      />
    </>
  );
}
