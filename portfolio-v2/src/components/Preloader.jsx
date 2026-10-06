import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

// Curated project & architecture visuals (local assets with fallback CDN)
const PRELOADER_IMAGES = [
  '/img/portfolio/geologiq.jpg',
  '/img/portfolio/piql.jpg',
  '/img/portfolio/EY-768x432.webp',
  '/img/portfolio/insurance.jpg',
  '/img/portfolio/Accounting_big.jpg',
  '/img/portfolio/mobility.jpg',
  '/img/portfolio/oil-rig-thumb.jpg',
  '/img/portfolio/bcps.jpg',
  '/img/portfolio/barqo.png',
  '/img/portfolio/com.jpg'
];

// Fallback high-fashion editorial imagery (from Struxent demo)
const FALLBACK_IMAGES = [
  'https://framerusercontent.com/images/5HhgYnQqRboCjOpNSypkJnhzDs.png',
  'https://framerusercontent.com/images/WeD5lolWyHUzUgS4sOOOaiJNBEk.png',
  'https://framerusercontent.com/images/jgIEwFTJXr9iCXzdJbfZkQtw5DU.png',
  'https://framerusercontent.com/images/HmAiIf2tzWTeblpRN7KHuxKntsI.png',
  'https://framerusercontent.com/images/i53p3MAphyuRHu1NmPmRTyzI9l4.png',
  'https://framerusercontent.com/images/MsGDeAoyPUQDKjBiVlXvl0285hI.png',
  'https://framerusercontent.com/images/nvcF8mwKvLrJCz9Zoz86ajg4FiI.png',
  'https://framerusercontent.com/images/UA8zsFiNWPHIUW1KS1ysU5f1CQ.png',
  'https://framerusercontent.com/images/9bL46zKRl37Ul5roUwPIc9jW6vg.png',
  'https://framerusercontent.com/images/NgWMiKnaqFbVcXoszsn8tFfkvP0.png'
];

// Mathematical trajectory function for streaming card paths
function calculateCardPosition(progress, index, isCompact) {
  const r = isCompact
    ? progress * 1.65 + 0.15 - index * 0.045
    : progress * 2.0 + 0.34 - index * 0.105;

  const i = Math.max(0, Math.min(1, r)) * (Math.PI / 2);
  const a = 60 * Math.sin(i);
  const o = 95 * (1 - Math.cos(i));
  const s = Math.min(0, r) * (60 * Math.PI / 2);
  const c = Math.max(0, r - 1) * (95 * Math.PI / 2);

  return {
    x: -40 + a + s,
    y: 65 - o - c - 60 * Math.min(0, r)
  };
}

// Cubic Hermite Spline progression easing
function smoothHermite(val, start, end, p0, p1, m0, m1) {
  const span = end - start;
  const t = (val - start) / span;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * p0 +
    (t3 - 2 * t2 + t) * span * m0 +
    (-2 * t3 + 3 * t2) * p1 +
    (t3 - t2) * span * m1
  );
}

const TOTAL_STREAM_TIME = 1900;
const SEGMENT_1 = 800 / TOTAL_STREAM_TIME;
const SEGMENT_2 = 1400 / TOTAL_STREAM_TIME;

function interpolateCurve(val) {
  const clamped = Math.max(0, Math.min(1, val));
  const tangent1 = (0.24 * TOTAL_STREAM_TIME) / 1000;
  const tangent2 = (0.28 * TOTAL_STREAM_TIME) / 1000;

  if (clamped < SEGMENT_1) {
    return smoothHermite(clamped, 0, SEGMENT_1, 0, 0.32, (2 * 0.32) / SEGMENT_1 - tangent1, tangent1);
  } else if (clamped < SEGMENT_2) {
    return smoothHermite(clamped, SEGMENT_1, SEGMENT_2, 0.32, 0.44, tangent1, tangent2);
  }
  return smoothHermite(clamped, SEGMENT_2, 1, 0.44, 1, tangent2, (1.25 * TOTAL_STREAM_TIME) / 1000);
}

function smoothStep(start, end, val) {
  const clamped = Math.max(0, Math.min(1, (val - start) / (end - start)));
  return clamped * clamped * (3 - 2 * clamped);
}

// Streaming Image Card Component
function StreamingCard({ progress, index, image, leftTrack, cardRadius = 18, isCompact }) {
  const [imgSrc, setImgSrc] = useState(image);

  const posX = useTransform(progress, (p) => `${calculateCardPosition(p, index, isCompact).x}%`);
  const posY = useTransform(progress, (p) => `${calculateCardPosition(p, index, isCompact).y}%`);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: leftTrack ? posX : undefined,
        right: leftTrack ? undefined : posX,
        top: leftTrack ? posY : undefined,
        bottom: leftTrack ? undefined : posY,
        width: isCompact ? 'clamp(95px, 26vw, 150px)' : 'clamp(110px, 17vw, 230px)',
        aspectRatio: '1.12 / 1',
        borderRadius: cardRadius,
        overflow: 'hidden',
        zIndex: 100 - index,
        willChange: leftTrack ? 'left, top' : 'right, bottom'
      }}
      className="bg-[#12151e] shadow-[0_16px_36px_rgba(0,0,0,0.5)] border border-[#dfc898]/20"
    >
      <img
        src={imgSrc}
        alt=""
        onError={() => setImgSrc(FALLBACK_IMAGES[index % FALLBACK_IMAGES.length])}
        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 hover:scale-105"
      />
    </motion.div>
  );
}

export default function Preloader({ onComplete, theme = 'dark', tagline = 'Building something that works.' }) {
  // Sequence stages: 'tagline' -> 'images' -> 'curtain' -> 'done'
  const [stage, setStage] = useState('tagline');
  const [visibleWordsCount, setVisibleWordsCount] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const taglineText = tagline;
  const words = taglineText.split(/\s+/).filter(Boolean);

  // Framer Motion animated values
  const streamProgress = useMotionValue(0);
  const curvedStream = useTransform(streamProgress, interpolateCurve);

  // Logo reveal motion mapping
  const logoOpacity = useTransform(streamProgress, (p) => smoothStep(0.65, 0.82, p));
  const logoScale = useTransform(streamProgress, (p) => 1 + 0.22 * (1 - smoothStep(0.68, 0.95, p)));
  const [logoFadeOut, setLogoFadeOut] = useState(false);

  // Responsive screen check
  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll while preloader is visible
  useEffect(() => {
    if (!isDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDone]);

  // Master Orchestration Timeline
  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const timers = [];

    // Stage 1: Staggered Word Reveal (Snappy 180ms per word)
    words.forEach((_, idx) => {
      timers.push(
        setTimeout(() => {
          setVisibleWordsCount(idx + 1);
        }, 80 + idx * 200)
      );
    });

    const taglineEnd = 80 + words.length * 200 + 350; // ~1030ms for 3 words

    // Stage 2: Transition from Tagline to Images & Card Streaming
    timers.push(
      setTimeout(() => {
        setStage('images');

        // Animate stream progress from 0 to 1 over 1600ms
        animate(streamProgress, 1, {
          duration: 1.6,
          ease: 'linear'
        });
      }, taglineEnd)
    );

    // Fade logo before curtain split
    const logoFadeTime = taglineEnd + 1600 + 320;
    timers.push(
      setTimeout(() => {
        setLogoFadeOut(true);
      }, logoFadeTime)
    );

    // Stage 3: Theatrical Curtain Reveal (Horizontal Split)
    const curtainTime = logoFadeTime + 220;
    timers.push(
      setTimeout(() => {
        setStage('curtain');
      }, curtainTime)
    );

    // Stage 4: Finish & Unmount
    const finishTime = curtainTime + 850;
    timers.push(
      setTimeout(() => {
        setStage('done');
        setIsDone(true);
        onComplete?.();
      }, finishTime)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [words.length, onComplete, streamProgress]);

  if (isDone) return null;

  const isLight = theme === 'light';
  const bgColor = isLight ? '#f7f5f4' : '#07090e';
  const textColor = isLight ? '#171717' : '#dfc898';
  const subtextColor = isLight ? '#525252' : '#94a3b8';

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none select-none"
      style={{ background: stage === 'curtain' ? 'transparent' : bgColor }}
      aria-hidden="true"
    >
      {/* Ambient Radial Golden Aura (Dark mode) */}
      {!isLight && stage !== 'curtain' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#dfc898]/10 via-[#b89b5e]/05 to-transparent blur-[130px]" />
        </div>
      )}

      {/* Film Grain Subtle Noise Texture */}
      {stage !== 'curtain' && (
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay" />
      )}

      {/* ======================================================== */}
      {/* STAGE 1: TAGLINE WITH 4 CORNER FRAMING MARKS             */}
      {/* ======================================================== */}
      {stage === 'tagline' && (
        <>
          {/* Struxent-style 4 Framing Corner Marks */}
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: '12.5%',
              right: '12.5%',
              top: '32%',
              bottom: '32%'
            }}
          >
            {[
              { left: 0, top: 0 },
              { right: 0, top: 0 },
              { left: 0, bottom: 0 },
              { right: 0, bottom: 0 }
            ].map((pos, idx) => (
              <span
                key={idx}
                className="absolute w-1.5 h-1.5 rounded-[1px] opacity-60"
                style={{
                  ...pos,
                  backgroundColor: textColor
                }}
              />
            ))}
          </div>

          {/* Kinetic Typography Word-by-Word Reveal */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
            transition={{ duration: 0.35 }}
            className="absolute inset-[20%_8%] flex items-center justify-center text-center"
          >
            <div
              className="flex flex-wrap justify-center font-sans tracking-tight"
              style={{
                columnGap: '0.3em',
                rowGap: '0.15em',
                color: textColor,
                fontSize: 'clamp(28px, 4.8vw, 60px)',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.025em'
              }}
            >
              {words.slice(0, visibleWordsCount).map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="inline-block whitespace-nowrap"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* ======================================================== */}
      {/* STAGE 2: STREAMING CARDS & CENTER MONOGRAM FOCUS         */}
      {/* ======================================================== */}
      {stage === 'images' && (
        <>
          {/* Dual Flowing Tracks (Left & Right) with Vertical Gradient Mask */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)'
            }}
          >
            {/* Left Track (sweeps inward-upward) */}
            {PRELOADER_IMAGES.map((img, idx) => (
              <StreamingCard
                key={`left-${idx}`}
                progress={curvedStream}
                index={idx}
                image={img}
                leftTrack={true}
                cardRadius={18}
                isCompact={isCompact}
              />
            ))}

            {/* Right Track (sweeps inward-downward) */}
            {PRELOADER_IMAGES.map((img, idx) => (
              <StreamingCard
                key={`right-${idx}`}
                progress={curvedStream}
                index={idx}
                image={img}
                leftTrack={false}
                cardRadius={18}
                isCompact={isCompact}
              />
            ))}
          </div>

          {/* Center Brand Monogram & Focus Badge */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none',
              opacity: logoOpacity,
              scale: logoScale
            }}
          >
            <motion.div
              animate={{ opacity: logoFadeOut ? 0 : 1 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center gap-2 text-center px-6"
            >
              {/* Luxury Brand Header (Clean & Refined like Struxent) */}
              <div
                className="text-lg sm:text-2xl md:text-3xl font-mono tracking-[0.3em] uppercase font-bold"
                style={{ color: textColor }}
              >
                MD RABBY HASAN
              </div>
              <div
                className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase"
                style={{ color: subtextColor }}
              >
                SYSTEMS ARCHITECT · DISTRIBUTED CORE
              </div>
            </motion.div>
          </motion.div>
        </>
      )}

      {/* ======================================================== */}
      {/* STAGE 3: SIGNATURE THEATRICAL CURTAIN REVEAL SPLIT       */}
      {/* ======================================================== */}
      {stage === 'curtain' && (
        <>
          {/* Left Curtain Panel (slides away to the left) */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{ duration: 0.9, ease: [0.75, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: bgColor,
              clipPath: 'inset(0 50% 0 0)',
              willChange: 'transform'
            }}
            aria-hidden="true"
          />

          {/* Right Curtain Panel (slides away to the right) */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '50%' }}
            transition={{ duration: 0.9, ease: [0.75, 0, 0.2, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              background: bgColor,
              clipPath: 'inset(0 0 0 50%)',
              willChange: 'transform'
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
