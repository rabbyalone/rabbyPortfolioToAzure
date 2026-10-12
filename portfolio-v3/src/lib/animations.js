// Velora Design System — Motion & Animation Specifications (Section 06)

// 1. Standard In-View Reveal: Spring stiffness 200, damping 58, mass 1, y: +30px
export const standardReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 58,
      mass: 1,
      delay: delay
    }
  })
};

// 2. Looser Settle: Spring stiffness 200, damping 30, y: +30px (used on Work grid and large media)
export const looseMediaReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      mass: 1,
      delay: delay
    }
  })
};

// 3. Micro-Reveal: Cubic bezier [0.44, 0, 0.56, 1] over 0.4s, y: +8px (used inside rows)
export const microReveal = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.44, 0, 0.56, 1],
      delay: delay
    }
  })
};

// Viewport options matching Velora: appear once, no replay, margin
export const viewportConfig = {
  once: true,
  amount: 0.2
};
