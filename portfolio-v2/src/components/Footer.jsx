import React, { useEffect, useRef } from 'react';

/* ---------------- Soft & Realistic Botanical Wind Garden Engine ---------------- */
function WindFlowerGarden({
  windStrength = 55,
  density = 22,
  flowerScale = 110,
  ambientMotion = true,
  stemColor = '#69705A'
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let destroyed = false;
    let animFrame = 0;
    let width = 1104;
    let height = 320;
    let dpr = 1;
    let stems = [];
    let gusts = [];
    let atlasImg = null;
    let lastTime = 0;
    let elapsedTime = 0;

    // Pointer tracking with velocity & smooth interaction
    let mouseX = -9999;
    let mouseY = -9999;
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let lastMouseTime = 0;
    let mouseVx = 0;
    let isPointerInCanvas = false;
    let isVisible = true;
    let clickDir = 1;

    const windK = Math.max(0, Math.min(100, windStrength)) / 100;
    const scaleFactor = Math.max(65, Math.min(140, flowerScale)) / 100;

    // Deterministic pseudo-random generator
    const hash = (e) => {
      let t = Math.sin(e * 127.1 + 311.7) * 43758.5453;
      return t - Math.floor(t);
    };

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

    // Initialize Stem Meadow with authentic botanical diversity
    function initStems() {
      let baseCount = clamp(Math.round(density), 14, 30);
      let count = width < 540
        ? clamp(Math.round(baseCount * 0.55), 9, 14)
        : Math.max(14, Math.round(baseCount * (Math.min(width, 1440) / 1104) ** 0.7));
      let responsiveScale = clamp(Math.sqrt(width / 1104), 0.75, 1.15);
      let flowerTypes = [0, 4, 1, 2, 0, 3, 1, 5, 2, 0, 4, 1, 0, 2, 5, 3, 1, 0, 4, 2, 1, 0, 3, 4, 2, 0, 1, 5];

      stems = Array.from({ length: count }, (_, idx) => {
        let seed = idx + 7;
        let depth = idx % 3 === 0 ? 0.32 : idx % 3 === 1 ? 0.68 : 1.0;
        let flowerSize = (68 + hash(seed + 31) * 44 + depth * 20) * responsiveScale * scaleFactor;
        let stepW = width / count;
        let jitter = (hash(seed) - 0.5) * 0.44 + Math.sin(idx * 1.47) * 0.12;
        let targetX = clamp((idx + 0.5 + jitter) * stepW, flowerSize * 0.3, width - flowerSize * 0.3);
        let lean = (hash(seed + 4) - 0.5) * 60 * responsiveScale;
        let rootX = targetX - lean;
        let curve = (hash(seed + 15) - 0.5) * 36 * responsiveScale;
        let heightVariation = 0.45 + hash(seed + 12) * 0.38 + (depth < 0.5 ? 0.08 : 0);
        let stemHeight = clamp(height * heightVariation, height * 0.42, height - flowerSize * 0.62 - 12);

        // Soft, botanically calibrated spring stiffness and critical damping
        // Natural frequency between 3.0 and 4.2 rad/s (relaxing ~1.5 - 2.0s sway period)
        let naturalFreq = 3.0 + hash(seed + 6) * 1.2;
        let stiffness = naturalFreq * naturalFreq; // 9.0 to 17.6
        let damping = 2.0 * 0.78 * naturalFreq;     // Damping ratio zeta = 0.78 (soft, organic, zero jitter)

        return {
          x: rootX,
          height: stemHeight,
          size: flowerSize,
          lean: lean,
          curve: curve,
          aspect: 0.85 + hash(seed + 24) * 0.18,
          baseRotation: (hash(seed + 8) - 0.5) * 0.5,
          kind: flowerTypes[idx % flowerTypes.length],
          depth: depth,
          phase: hash(seed + 20) * Math.PI * 2,
          stiffness: stiffness,
          damping: damping,
          // Physics state
          targetForce: 0,
          sway: 0,
          velocity: 0,
          headAngle: 0,
          headVelocity: 0
        };
      }).sort((a, b) => a.depth - b.depth);
    }

    // Resize handler
    function onResize() {
      let rect = container.getBoundingClientRect();
      width = Math.max(1, container.clientWidth || rect.width);
      height = Math.max(1, container.clientHeight || rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      initStems();
    }

    // Evaluate cubic Bezier point P(t)
    function evalBezier(p0, p1, p2, p3, t) {
      let inv = 1 - t;
      let inv2 = inv * inv;
      let inv3 = inv2 * inv;
      let t2 = t * t;
      let t3 = t2 * t;
      return {
        x: inv3 * p0.x + 3 * inv2 * t * p1.x + 3 * inv * t2 * p2.x + t3 * p3.x,
        y: inv3 * p0.y + 3 * inv2 * t * p1.y + 3 * inv * t2 * p2.y + t3 * p3.y
      };
    }

    // Evaluate cubic Bezier tangent vector P'(t)
    function evalBezierTangent(p0, p1, p2, p3, t) {
      let inv = 1 - t;
      let inv2 = inv * inv;
      let t2 = t * t;
      return {
        x: 3 * inv2 * (p1.x - p0.x) + 6 * inv * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x),
        y: 3 * inv2 * (p1.y - p0.y) + 6 * inv * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y)
      };
    }

    // Calculate natural cantilever stem Bezier geometry (monotonically bowed arc, no S-curves)
    function getStemGeometry(stem) {
      let groundY = height + 14;
      let swayPx = stem.sway * (24 + stem.height * 0.15);
      // Conserve stem length: arching sideways causes a gentle downward dip
      let archDip = (swayPx * swayPx) / (2.6 * stem.height);
      let headX = stem.x + stem.lean + swayPx;
      let headY = height - stem.height + archDip;

      // P0: Firmly rooted at ground
      let p0 = { x: stem.x, y: groundY };
      // P1: Lower stem emerges near-vertical (only 8% sway, grounded root)
      let p1 = {
        x: stem.x + stem.lean * 0.12 + swayPx * 0.08 + stem.curve * 0.2,
        y: groundY - stem.height * 0.40
      };
      // P2: Upper stem guides smooth cantilever arch into the flower head
      let p2 = {
        x: headX - (headX - stem.x) * 0.16 + stem.curve * 0.35,
        y: headY + stem.height * 0.32
      };
      // P3: Tip at flower head
      let p3 = { x: headX, y: headY };

      return { p0, p1, p2, p3, headX, headY };
    }

    // Render delicate botanical leaves along the stem
    function drawLeaf(x, y, len, side, angle, alpha, variant) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(side, 1);

      let curveUp = variant === 0 ? 0.15 : variant === 1 ? 0.32 : 0.22;
      let tipCurve = variant === 1 ? 0.54 : 0.74;

      ctx.globalAlpha = alpha;
      ctx.fillStyle = stemColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(len * 0.25, -len * (tipCurve * 0.3 + curveUp), len * 0.7, -len * (tipCurve * 0.65 + curveUp), len, -len * tipCurve);
      ctx.bezierCurveTo(len * 0.78, -len * (tipCurve * 0.4 - curveUp * 0.2), len * 0.33, len * curveUp * 0.4, 0, 0);
      ctx.fill();

      // Soft leaf highlight vein
      ctx.globalAlpha = alpha * 0.35;
      ctx.strokeStyle = '#B8AD88';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(1, -1);
      ctx.quadraticCurveTo(len * 0.5, -len * tipCurve * 0.35, len * 0.92, -len * tipCurve * 0.88);
      ctx.stroke();

      ctx.restore();
    }

    // Render secondary flower bud
    function drawBud(stem, tParam, side, p0, p1, p2, p3, alpha, budIdx) {
      let pt = evalBezier(p0, p1, p2, p3, tParam);
      let tangent = evalBezierTangent(p0, p1, p2, p3, tParam);
      let stemAngle = Math.atan2(tangent.x, -tangent.y);
      let scale = clamp(Math.sqrt(width / 1104), 0.7, 1.1);
      let budLen = (24 + hash(stem.phase + budIdx + 6) * 16) * scale;
      let budX = pt.x + side * budLen * 0.85 + stem.sway * 4;
      let budY = pt.y - budLen * 0.65;

      ctx.save();
      ctx.globalAlpha = alpha * 0.72;
      ctx.strokeStyle = stemColor;
      ctx.lineWidth = 0.8 * scale;
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      ctx.bezierCurveTo(pt.x + side * 8, pt.y - budLen * 0.3, budX - side * 4, budY + budLen * 0.25, budX, budY);
      ctx.stroke();

      // Bud flower head
      let budRadius = (9 + hash(stem.phase + budIdx + 2) * 4) * scale;
      let budRot = stemAngle + side * 0.38 + stem.sway * 0.08 + stem.headAngle * 0.05;
      let budPalette = ['#C9C2A1', '#AA7D7B', '#9F98B2', '#C7B07B', '#C29271', '#8F5665'];

      ctx.translate(budX, budY);
      ctx.rotate(budRot);

      let grad = ctx.createLinearGradient(-budRadius * 0.3, -budRadius, budRadius * 0.3, 0);
      grad.addColorStop(0, stemColor);
      grad.addColorStop(0.35, budPalette[stem.kind]);
      grad.addColorStop(0.65, budPalette[stem.kind]);
      grad.addColorStop(1, stemColor);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 1);
      ctx.bezierCurveTo(-budRadius * 0.42, -budRadius * 0.23, -budRadius * 0.29, -budRadius * 0.74, 0, -budRadius);
      ctx.bezierCurveTo(budRadius * 0.28, -budRadius * 0.75, budRadius * 0.42, -budRadius * 0.22, 0, 1);
      ctx.fill();

      ctx.restore();
    }

    // Procedural Fallback Flower (if atlas image is loading)
    function drawProceduralFlower(stem) {
      let palette = ['#D9D5BA', '#B8727C', '#ACA0C2', '#D8C67E', '#D99780', '#713B4D'];
      ctx.fillStyle = palette[stem.kind];
      for (let i = 0; i < 7; i++) {
        ctx.save();
        ctx.rotate((i / 7) * Math.PI * 2);
        ctx.beginPath();
        ctx.ellipse(0, -stem.size * 0.18, stem.size * 0.15, stem.size * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = '#9A7950';
      ctx.beginPath();
      ctx.arc(0, 0, stem.size * 0.08, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw full stem line with smooth gradient and attached leaves
    function drawStem(stem) {
      const { p0, p1, p2, p3 } = getStemGeometry(stem);
      let alpha = 0.52 + stem.depth * 0.48;

      let grad = ctx.createLinearGradient(p0.x, p0.y, p3.x, p3.y);
      grad.addColorStop(0, '#1C2920');
      grad.addColorStop(0.3, stemColor);
      grad.addColorStop(1, stemColor);

      // Main Stem
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = grad;
      ctx.lineWidth = (1.1 + stem.depth * 0.8) * Math.max(0.75, Math.sqrt(width / 1104));
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y + 4);
      ctx.stroke();

      // Subtle light contour
      ctx.globalAlpha = alpha * 0.22;
      ctx.strokeStyle = '#B8AD88';
      ctx.lineWidth = 0.45;
      ctx.stroke();

      // Leaves along the stem (evaluated at exact curve points)
      let leafCount = 2 + (stem.depth > 0.5 && hash(stem.phase + 12) > 0.35 ? 1 : 0);
      for (let i = 0; i < leafCount; i++) {
        let tVal = 0.26 + i * 0.20 + hash(stem.phase + i) * 0.1;
        let pt = evalBezier(p0, p1, p2, p3, tVal);
        let tan = evalBezierTangent(p0, p1, p2, p3, tVal);
        let tangentAngle = Math.atan2(tan.x, -tan.y);
        let side = (i + Math.round(stem.phase)) % 2 ? 1 : -1;
        let leafLen = (18 + stem.height * 0.07) * (0.75 + hash(stem.phase + i + 4) * 0.5) * (0.75 + stem.depth * 0.25);
        let rot = tangentAngle + (hash(i + stem.phase) - 0.5) * 0.5;
        drawLeaf(pt.x, pt.y, leafLen, side, rot, alpha * 0.75, (stem.kind + i) % 3);
      }

      // Secondary buds on taller stems
      if (stem.depth > 0.5 && stem.height > height * 0.55 && hash(stem.phase + 16) > 0.45) {
        let count = stem.height > height * 0.72 && hash(stem.phase + 21) > 0.65 ? 2 : 1;
        for (let b = 0; b < count; b++) {
          let side = (Math.round(stem.phase) + b) % 2 ? 1 : -1;
          drawBud(stem, 0.46 + b * 0.18 + hash(stem.phase + b + 8) * 0.08, side, p0, p1, p2, p3, alpha, b);
        }
      }

      ctx.globalAlpha = 1;
    }

    // Draw flower blossom head with realistic rotation lag and botanical nodding
    function drawFlowerHead(stem) {
      const { headX, headY } = getStemGeometry(stem);

      ctx.save();
      ctx.globalAlpha = stem.depth < 0.5 ? 0.78 : stem.depth < 0.8 ? 0.92 : 1.0;
      ctx.translate(headX, headY);

      // Blossom rotation = natural base angle + head spring angle
      ctx.rotate(stem.baseRotation + stem.headAngle);
      ctx.scale(stem.aspect, 1);

      if (atlasImg && atlasImg.naturalWidth) {
        let frameW = atlasImg.naturalWidth / 3;
        let frameH = atlasImg.naturalHeight / 2;
        let row = Math.floor(stem.kind / 3);
        let col = stem.kind % 3;
        let drawH = (stem.size * frameH) / frameW;
        ctx.drawImage(
          atlasImg,
          col * frameW,
          row * frameH,
          frameW,
          frameH,
          -stem.size / 2,
          -drawH / 2,
          stem.size,
          drawH
        );
      } else {
        drawProceduralFlower(stem);
      }

      ctx.restore();
      ctx.globalAlpha = 1;
    }

    // Render full garden scene
    function renderGarden() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Draw all stems first (back to front), then all flower heads for perfect natural layering
      stems.forEach(drawStem);
      stems.forEach(drawFlowerHead);

      // Subtle atmospheric bottom shadow fade
      let fade = ctx.createLinearGradient(0, height * 0.78, 0, height);
      fade.addColorStop(0, 'rgba(0,0,0,0)');
      fade.addColorStop(1, 'rgba(18, 20, 17, 0.75)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, height * 0.78, width, height * 0.22);
    }

    // Physics Animation Loop: Soft, realistic botanical simulation
    function updatePhysics(now) {
      if (destroyed || !isVisible) return;
      let dt = lastTime ? Math.min((now - lastTime) / 1000, 0.04) : 1 / 60;
      lastTime = now;
      elapsedTime += dt;

      // Update traveling wind gusts
      gusts.forEach((g) => {
        g.age += dt;
        g.x += g.speed * dt;
        g.radius += dt * 25;
      });
      gusts = gusts.filter((g) => g.age < 3.2);

      // Update stems
      stems.forEach((stem) => {
        // 1. Natural multi-harmonic ambient breeze (continuous traveling waves across the field)
        let ambientBreeze = 0;
        if (ambientMotion) {
          // Wave 1: Rolling summer wind wave (travels left-to-right at ~280px/s)
          let wave1 = Math.sin(elapsedTime * 0.95 - stem.x * 0.0034 + stem.phase * 0.4) * 0.14;
          // Wave 2: Softer harmonic variation (prevents mechanical repetition)
          let wave2 = Math.sin(elapsedTime * 1.85 - stem.x * 0.006 + stem.phase * 1.6) * 0.06;
          // Wave 3: Delicate tip flutter
          let wave3 = Math.sin(elapsedTime * 3.4 + stem.phase * 2.2) * 0.02;

          let depthFactor = 0.7 + stem.depth * 0.45;
          ambientBreeze = (wave1 + wave2 + wave3) * depthFactor * windK;
        }

        // 2. Direct tactile pointer interaction with smooth Hermite (smoothstep) falloff
        let pointerForce = 0;
        if (isPointerInCanvas) {
          const { headX, headY } = getStemGeometry(stem);
          let dx = headX - mouseX;
          let dy = headY - mouseY;
          let dist = Math.hypot(dx, dy);
          let influenceRadius = 135;

          if (dist < influenceRadius) {
            let u = 1 - dist / influenceRadius;
            // Smoothstep C1 continuity (zero slope at edge = zero jerk!)
            let smoothWeight = u * u * (3 - 2 * u);
            let pushDirection = dx === 0 ? (stem.lean >= 0 ? 1 : -1) : Math.sign(dx);
            let directPush = pushDirection * smoothWeight * 0.42;

            // Velocity air draft (swiping hand sweeps air with it)
            let velocityDraft = clamp(mouseVx / 420, -0.6, 0.6) * smoothWeight * 0.55;
            pointerForce = directPush + velocityDraft;
          }
        }

        // 3. Traveling wind gusts (from clicks or swift pointer strokes)
        let gustForce = 0;
        for (let g of gusts) {
          let distNorm = (stem.x - g.x) / g.radius;
          let attenuation = Math.max(0, 1 - g.age / 3.2);
          gustForce += Math.exp(-distNorm * distNorm * 1.6) * g.power * attenuation * windK * 0.5;
        }

        let totalTarget = clamp(ambientBreeze + pointerForce + gustForce, -1.3, 1.3);

        // Low-pass filter target force for silky-soft acceleration (eliminates any sudden pops)
        stem.targetForce += (totalTarget - stem.targetForce) * Math.min(1, dt * 9.0);

        // 4. Critically damped harmonic spring physics (Euler integration)
        // Spring acceleration: Hooke's Law + viscous aerodynamic drag
        let springAccel = (stem.targetForce - stem.sway) * stem.stiffness - stem.velocity * stem.damping;
        stem.velocity += springAccel * dt;
        stem.sway += stem.velocity * dt;

        // 5. Decoupled flower blossom rotation with inertia & botanical nodding
        const { headX, p2 } = getStemGeometry(stem);
        let stemTipAngle = Math.atan2(headX - p2.x, p2.y - (height - stem.height));
        // Blossom nods against motion (air drag) when accelerating, settles softly
        let headTargetAngle = stemTipAngle * 0.45 - stem.velocity * 0.28;
        let headSpringAccel = (headTargetAngle - stem.headAngle) * 22.0 - stem.headVelocity * 7.2;
        stem.headVelocity += headSpringAccel * dt;
        stem.headAngle += stem.headVelocity * dt;
      });

      renderGarden();
      animFrame = requestAnimationFrame(updatePhysics);
    }

    // Spawn expanding, traveling breeze gust
    function spawnGust(x, power) {
      if (windK === 0) return;
      gusts.push({
        x: x,
        power: clamp(power, -1.6, 1.6),
        radius: Math.max(65, width * 0.12),
        age: 0,
        speed: Math.sign(power || 1) * (50 + width * 0.05)
      });
      if (gusts.length > 12) gusts.shift();
    }

    // Pointer move handler with velocity tracking
    function onPointerMove(e) {
      let rect = container.getBoundingClientRect();
      let curX = ((e.clientX - rect.left) * width) / Math.max(1, rect.width);
      let curY = ((e.clientY - rect.top) * height) / Math.max(1, rect.height);
      let now = performance.now();

      isPointerInCanvas = true;
      mouseX = curX;
      mouseY = curY;

      if (lastMouseTime > 0 && now - lastMouseTime < 160) {
        let dt = Math.max(0.014, (now - lastMouseTime) / 1000);
        mouseVx = (curX - lastMouseX) / dt;

        // If swift swipe, spawn a soft traveling breeze packet in swipe direction
        if (Math.abs(mouseVx) > 180) {
          spawnGust(curX, clamp(mouseVx / 480, -1.4, 1.4));
        }
      }

      lastMouseX = curX;
      lastMouseY = curY;
      lastMouseTime = now;
    }

    function onPointerDown(e) {
      onPointerMove(e);
      // Gentle manual breeze ripple on click/tap
      clickDir *= -1;
      spawnGust(mouseX, clickDir * 1.2);
    }

    function onPointerLeave() {
      isPointerInCanvas = false;
      mouseX = -9999;
      mouseY = -9999;
      mouseVx = 0;
      lastMouseTime = 0;
    }

    // Load authentic flower atlas image
    let img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!destroyed) {
        atlasImg = img;
      }
    };
    img.onerror = () => {
      // Fallback if local path not resolved
      if (!atlasImg) {
        img.src = 'https://framerusercontent.com/images/7X14TRSAmGQIQ10s0eNmOC6w9qY.png';
      }
    };
    // Primary local path served by Vite
    img.src = '/img/flower-atlas.png';

    onResize();
    animFrame = requestAnimationFrame(updatePhysics);

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animFrame);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
      atlasImg = null;
      stems = [];
      gusts = [];
    };
  }, [windStrength, density, flowerScale, ambientMotion, stemColor]);

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Interactive Wind Meadow. Move your cursor gently through the flowers or swipe to create a breeze."
      className="w-full h-full relative cursor-crosshair select-none outline-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

/* ---------------- Authentic Interactive Footer 2 Layout ---------------- */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="w-full text-[#F2EEE3] pt-16 sm:pt-20 overflow-hidden select-none transition-colors duration-500"
      style={{ backgroundColor: 'rgb(18, 20, 17)' }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top: Brand Column (Left) + 3 Navigation Columns (Right) */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 pb-12 sm:pb-16">
          
          {/* Brand Column */}
          <div className="max-w-sm space-y-4">
            <a href="#home" className="inline-flex items-center gap-3.5 group">
              {/* Botanical Signet with 6 Petals rotating around center */}
              <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                {[90, 150, 210, 270, 330, 390].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute w-3.5 h-6 rounded-full border border-[#F2EEE3]/90 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      transform: `rotate(${deg}deg)`,
                      transformOrigin: 'center center'
                    }}
                  />
                ))}
                <div className="relative z-10 w-2 h-2 rounded-full bg-[#F2EEE3]" />
              </div>

              {/* Cormorant Garamond Italic Wordmark */}
              <span
                className="text-4xl sm:text-5xl italic tracking-tight font-serif text-[#F2EEE3]"
                style={{ fontFamily: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif" }}
              >
                Rabby Hasan
              </span>
            </a>

            <p className="text-sm leading-relaxed text-[#B7B9AC] font-sans">
              Distributed systems, naturally. Thoughtful architectures and resilient platforms.
            </p>

            <p className="text-[11px] text-[#B7B9AC]/60 font-sans">
              &copy; {new Date().getFullYear()} Md Rabby Hasan. All rights reserved.
            </p>
          </div>

          {/* Navigation Columns (3 Columns: Explore, Follow, Information) */}
          <nav aria-label="Footer navigation" className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14">
            
            {/* Column 1: Explore */}
            <div className="space-y-3.5">
              <h3
                className="text-2xl font-serif text-[#F2EEE3]"
                style={{ fontFamily: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif" }}
              >
                Explore
              </h3>
              <ul className="space-y-2 text-sm text-[#B7B9AC]">
                <li>
                  <a href="#case-studies" className="hover:text-[#F2EEE3] transition-colors">
                    Selected work
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-[#F2EEE3] transition-colors">
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="#experience" className="hover:text-[#F2EEE3] transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#F2EEE3] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Follow */}
            <div className="space-y-3.5">
              <h3
                className="text-2xl font-serif text-[#F2EEE3]"
                style={{ fontFamily: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif" }}
              >
                Follow
              </h3>
              <ul className="space-y-2 text-sm text-[#B7B9AC]">
                <li>
                  <a
                    href="https://linkedin.com/in/md-rabby-hasan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F2EEE3] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/rabbyalone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F2EEE3] transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://blog.rabbyhasan.com.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F2EEE3] transition-colors"
                  >
                    Journal
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:rabby.hasan.eng@gmail.com"
                    className="hover:text-[#F2EEE3] transition-colors"
                  >
                    Email Direct
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Information */}
            <div className="space-y-3.5">
              <h3
                className="text-2xl font-serif text-[#F2EEE3]"
                style={{ fontFamily: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif" }}
              >
                Information
              </h3>
              <ul className="space-y-2 text-sm text-[#B7B9AC]">
                <li>
                  <a
                    href="./doc/rabby_hasan_9_years_full_stack_dot_net_dev.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F2EEE3] transition-colors"
                  >
                    Resume PDF
                  </a>
                </li>
                <li>
                  <span className="text-[#B7B9AC]/70">
                    Dhaka (UTC+6)
                  </span>
                </li>
                <li>
                  <button
                    onClick={scrollToTop}
                    className="hover:text-[#F2EEE3] transition-colors cursor-pointer text-left"
                  >
                    Back to top ↑
                  </button>
                </li>
              </ul>
            </div>

          </nav>

        </div>
      </div>

      {/* Bottom: The Authentic Interactive Flower Meadow Canvas (Tall height for graceful, soft sway) */}
      <div className="w-full h-64 sm:h-72 lg:h-80 relative">
        <WindFlowerGarden
          windStrength={60}
          density={22}
          flowerScale={112}
          ambientMotion={true}
          stemColor="#69705A"
        />
      </div>
    </footer>
  );
}
