"use client";

import { useEffect, useRef } from "react";

// ============================================================
// Continuous Neon Cursor Cluster
//
// One fixed, pointer-events-none layer mounted once in app/layout.js.
// 30 miniature pointers with unique colors use a golden-angle phyllotaxis
// layout: a fully filled disc with even ~10px gaps, including the centre.
//
// Two layers of motion:
//   • GROUP: one rAF controller wanders endlessly, dashes away from the
//     mouse, rotates and scales the whole formation (endless movement);
//   • SLOTS: each pointer also has its own local offset/velocity. Normally
//     these are exactly the home offsets, so the disc is perfect. When the
//     mouse approaches, every pointer gets its own 360-degree impulse and
//     flies independently across the viewport; afterwards a damped spring
//     returns each one to its assigned slot and the circle reforms exactly.
//
// No React re-renders during motion. Lenis / page scrolling is untouched.
// ============================================================

const TAU = Math.PI * 2;
const CURSOR_COUNT = 30;
const CLUSTER_RADIUS = 84;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Group-level escape (moves the whole cloud away from the mouse).
const ESCAPE_TRIGGER_RADIUS = 360;
const ESCAPE_POWER = 11000;
const ESCAPE_BURST_SPEED = 900;
const ESCAPE_TARGET_SPEED = 820;
const ESCAPE_MAX_SPEED = 1500;
const REGROUP_START_MIN = 1200;
const REGROUP_START_MAX = 1700;
const REGROUP_EASE = 1100;
const RETURN_WINDOW = 8000;

// Per-pointer 360-degree scatter and regroup tuning.
const CURSOR_HIT_RADIUS = 90; // mouse this close to any pointer re-triggers
const SCATTER_BURST_SPEED = 1050; // outward impulse on a fresh approach
const SCATTER_ACCEL = 14000; // acceleration along each pointer's direction
const SCATTER_MAX_SPEED = 1700;
const SCATTER_HOLD_MS = 450; // free, independent flight after the mouse leaves
const REGROUP_DURATION = 2200; // spring-back window
const SPRING_K = 7.5;
const SPRING_DAMPING = 2 * Math.sqrt(SPRING_K) * 0.92;

// 30 distinct, evenly-dispersed neon hues (golden-angle distribution).
const NEON_CURSORS = Array.from({ length: CURSOR_COUNT }, (_, index) => {
  const hue = Math.round((index * 137.508 + 188) % 360);
  const lightness = 58 + (index % 3) * 4;
  return {
    id: `neon-${index}`,
    color: `hsl(${hue} 100% ${lightness}%)`,
    glow: `hsla(${hue}, 100%, 60%, 0.58)`,
    size: 11 + (index % 4) * 1.5,
  };
});

// Fermat / Vogel spiral: sqrt radius spreads points evenly over the AREA
// (including the centre); the golden angle avoids rings, rows or spokes.
const CLUSTER_LAYOUT = NEON_CURSORS.map((cursor, index) => {
  const angle = index * GOLDEN_ANGLE + 0.6;
  const radius = CLUSTER_RADIUS * Math.sqrt((index + 0.35) / CURSOR_COUNT);
  return {
    ...cursor,
    offsetX: Math.cos(angle) * radius,
    offsetY: Math.sin(angle) * radius,
  };
});

const MAX_POINTER_SIZE = Math.max(...NEON_CURSORS.map((cursor) => cursor.size));

export default function MultiCursorField() {
  const containerRef = useRef(null);
  const groupRef = useRef(null);
  const slotRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const groupNode = groupRef.current;
    const slots = slotRefs.current;
    if (!container || !groupNode) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = Math.max(1, window.innerWidth);
    let height = Math.max(1, window.innerHeight);
    let groupScale = 1;
    let edgePad = 1;

    let frameId = null;
    let resizeFrame = 0;
    let disposed = false;
    let lastTime = 0;

    const mouse = { x: -9999, y: -9999, active: false };

    const group = {
      x: width / 2,
      y: height / 2,
      vx: (Math.random() - 0.5) * 24,
      vy: (Math.random() - 0.5) * 24,
      baseSpeed: 52 + Math.random() * 14,
      baseAngle: Math.random() * TAU,
      phase: Math.random() * TAU,
      phaseTwo: Math.random() * TAU,
      phaseRate: 0.17 + Math.random() * 0.12,
      turnTimer: 1.2 + Math.random() * 2.4,
      tangent: Math.random() > 0.5 ? 1 : -1,
      escapeLevel: 0,
      threatened: false,
      regroupAt: 0,
      returnUntil: 0,
      fleeX: Math.cos(Math.random() * TAU),
      fleeY: Math.sin(Math.random() * TAU),
      spread: 1,
      tilt: 0,
    };

    // Per-pointer state: home slot + live offset/velocity/scatter direction.
    const pointers = CLUSTER_LAYOUT.map((cursor, index) => ({
      index,
      homeX: cursor.offsetX,
      homeY: cursor.offsetY,
      x: cursor.offsetX,
      y: cursor.offsetY,
      vx: 0,
      vy: 0,
      dirX: 0,
      dirY: 0,
      momentum: 0.78 + (index % 7) * 0.07,
    }));

    let scatterActive = false;
    let scatterAt = 0;

    const canAnimate = () =>
      window.innerWidth >= 768 && !motionQuery.matches;

    const refreshMetrics = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      groupScale = width < 1024 ? 0.84 : 1;
      edgePad =
        (CLUSTER_RADIUS * 1.3 + MAX_POINTER_SIZE / 2 + 18) * groupScale;
    };

    const clampToViewport = () => {
      const minX = edgePad;
      const maxX = Math.max(minX, width - edgePad);
      const minY = edgePad;
      const maxY = Math.max(minY, height - edgePad);
      group.x = Math.min(maxX, Math.max(minX, group.x));
      group.y = Math.min(maxY, Math.max(minY, group.y));
    };

    const draw = () => {
      groupNode.style.transform = `translate3d(${group.x.toFixed(
        2
      )}px, ${group.y.toFixed(2)}px, 0) rotate(${group.tilt.toFixed(
        2
      )}deg) scale(${(groupScale * group.spread).toFixed(3)})`;
    };

    refreshMetrics();
    group.x = width * (0.32 + Math.random() * 0.36);
    group.y = height * (0.32 + Math.random() * 0.36);
    clampToViewport();
    draw();

    // A single self-scheduling loop. `frameId` is the only source of truth
    // for whether a frame is pending, so the controller can never end up
    // with a stale "running" flag that silently prevents a restart.
    const schedule = () => {
      if (disposed || document.hidden || !canAnimate() || frameId !== null) return;
      frameId = window.requestAnimationFrame(frame);
    };

    const frame = (now) => {
      frameId = null;
      const dt = lastTime
        ? Math.min(0.045, Math.max(0.001, (now - lastTime) / 1000))
        : 1 / 60;
      lastTime = now;
      const time = now * 0.001;

      // --- Continuous, non-repeating wander -------------------------
      group.turnTimer -= dt;
      if (group.turnTimer <= 0) {
        group.baseAngle += (Math.random() - 0.5) * 1.6;
        group.turnTimer = 2 + Math.random() * 3.4;
      }

      const wanderAngle =
        group.baseAngle +
        Math.sin(time * group.phaseRate + group.phase) * 0.78 +
        Math.sin(time * group.phaseRate * 0.53 + group.phaseTwo) * 0.42 +
        Math.sin(time * 0.21 + group.phase * 1.3) * 0.18;

      // Transform of the group, used for per-pointer absolute positions.
      const scale = groupScale * group.spread;
      const theta = (group.tilt * Math.PI) / 180;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      const toScreenX = (px, py) => group.x + scale * (px * cosT - py * sinT);
      const toScreenY = (px, py) => group.y + scale * (px * sinT + py * cosT);

      // --- Detect the real mouse / trigger the explosion ------------
      let threat = 0;
      if (mouse.active) {
        let dx = group.x - mouse.x;
        let dy = group.y - mouse.y;
        let distance = Math.hypot(dx, dy);
        const radius = ESCAPE_TRIGGER_RADIUS * groupScale;

        if (distance < radius) {
          threat = 1 - distance / radius;
        } else {
          // Also react when the mouse reaches any individual scattered
          // pointer, even if the group centre is far away.
          for (const pointer of pointers) {
            const px = toScreenX(pointer.x, pointer.y);
            const py = toScreenY(pointer.x, pointer.y);
            const pointerDistance = Math.hypot(px - mouse.x, py - mouse.y);
            if (pointerDistance < CURSOR_HIT_RADIUS) {
              threat = Math.max(
                threat,
                0.4 + 0.6 * (1 - pointerDistance / CURSOR_HIT_RADIUS)
              );
              dx = px - mouse.x;
              dy = py - mouse.y;
              distance = pointerDistance || 1;
              break;
            }
          }
        }

        if (threat > 0) {
          if (distance < 0.001) {
            dx = Math.cos(group.baseAngle);
            dy = Math.sin(group.baseAngle);
            distance = 1;
          }
          group.fleeX = dx / distance;
          group.fleeY = dy / distance;
          group.regroupAt =
            now +
            REGROUP_START_MIN +
            Math.random() * (REGROUP_START_MAX - REGROUP_START_MIN);
          group.returnUntil = now + RETURN_WINDOW;
          group.escapeLevel = 1;
          scatterAt = now;

          // Fresh approach: one burst per pointer, each in its own
          // direction, evenly spread over all 360 degrees with a little
          // jitter. Blend in an away-from-mouse component so the cloud
          // also retreats instead of only expanding in place.
          if (!group.threatened) {
            const spin = group.baseAngle + Math.random() * TAU;
            for (const pointer of pointers) {
              const angle =
                spin +
                (pointer.index / CURSOR_COUNT) * TAU +
                (Math.random() - 0.5) * 0.5;
              let dirX = Math.cos(angle);
              let dirY = Math.sin(angle);

              const px = toScreenX(pointer.x, pointer.y);
              const py = toScreenY(pointer.x, pointer.y);
              let awayX = px - mouse.x;
              let awayY = py - mouse.y;
              const awayLength = Math.hypot(awayX, awayY) || 1;
              awayX /= awayLength;
              awayY /= awayLength;

              dirX = dirX * 0.72 + awayX * 0.28;
              dirY = dirY * 0.72 + awayY * 0.28;
              const length = Math.hypot(dirX, dirY) || 1;
              pointer.dirX = dirX / length;
              pointer.dirY = dirY / length;

              const burst =
                SCATTER_BURST_SPEED *
                pointer.momentum *
                (0.65 + 0.35 * threat);
              pointer.vx += pointer.dirX * burst;
              pointer.vy += pointer.dirY * burst;
            }
            scatterActive = true;
            group.threatened = true;

            // The group centre dashes away too, using the existing
            // velocity-based (never teleporting) escape.
            const groupBurst = ESCAPE_BURST_SPEED * (0.35 + 0.65 * threat);
            group.vx += group.fleeX * groupBurst;
            group.vy += group.fleeY * groupBurst;
          }
        }
      }
      if (threat <= 0) group.threatened = false;

      // --- Group physics (unchanged endless movement) --------------
      if (threat <= 0 && group.escapeLevel > 0 && now >= group.regroupAt) {
        group.escapeLevel = Math.max(
          0,
          group.escapeLevel - (dt * 1000) / REGROUP_EASE
        );
      }
      const retreat = group.escapeLevel;

      const cruise =
        group.baseSpeed *
        (0.84 + 0.16 * Math.sin(time * 0.41 + group.phaseTwo));

      let targetVx =
        Math.cos(wanderAngle) * cruise + group.fleeX * retreat * ESCAPE_TARGET_SPEED;
      let targetVy =
        Math.sin(wanderAngle) * cruise + group.fleeY * retreat * ESCAPE_TARGET_SPEED;

      if (threat <= 0 && now < group.returnUntil) {
        const progress = 1 - (group.returnUntil - now) / RETURN_WINDOW;
        const homing = 0.85 * (1 - retreat) * (1 - progress);
        targetVx += (width * 0.5 - group.x) * homing;
        targetVy += (height * 0.5 - group.y) * homing;
      }

      const steerRate = 2.6 - retreat * 0.7;
      const steer = 1 - Math.exp(-steerRate * dt);
      group.vx += (targetVx - group.vx) * steer;
      group.vy += (targetVy - group.vy) * steer;

      if (threat > 0) {
        const acceleration = ESCAPE_POWER * threat * threat * threat;
        group.vx +=
          (group.fleeX - group.fleeY * group.tangent * 0.1) *
          acceleration *
          dt;
        group.vy +=
          (group.fleeY + group.fleeX * group.tangent * 0.1) *
          acceleration *
          dt;
      }

      if (group.x < edgePad) group.vx += (edgePad - group.x) * 7 * dt;
      else if (group.x > width - edgePad)
        group.vx -= (group.x - (width - edgePad)) * 7 * dt;
      if (group.y < edgePad) group.vy += (edgePad - group.y) * 7 * dt;
      else if (group.y > height - edgePad)
        group.vy -= (group.y - (height - edgePad)) * 7 * dt;

      const maxSpeed = group.baseSpeed * 1.3 + retreat * ESCAPE_MAX_SPEED;
      const speed = Math.hypot(group.vx, group.vy);
      if (speed > maxSpeed) {
        group.vx *= maxSpeed / speed;
        group.vy *= maxSpeed / speed;
      }

      group.x += group.vx * dt;
      group.y += group.vy * dt;
      clampToViewport();

      const targetSpread = 1 + retreat * 0.3;
      group.spread +=
        (targetSpread - group.spread) * (1 - Math.exp(-6 * dt));

      const targetTilt = Math.max(-8, Math.min(8, group.vx / 2.6));
      group.tilt += (targetTilt - group.tilt) * (1 - Math.exp(-7 * dt));

      draw();

      // --- Per-pointer scatter / regroup ---------------------------
      let phase = "idle";
      if (threat > 0) {
        phase = "flee";
      } else if (scatterActive) {
        const since = now - scatterAt;
        if (since < SCATTER_HOLD_MS) phase = "hold";
        else if (since < SCATTER_HOLD_MS + REGROUP_DURATION) phase = "spring";
        else phase = "snap";
      }

      if (phase !== "idle") {
        const push = SCATTER_ACCEL * threat * threat;
        const damp = Math.exp(-1.1 * dt);
        const currentScale = groupScale * group.spread;
        const currentCos = Math.cos((group.tilt * Math.PI) / 180);
        const currentSin = Math.sin((group.tilt * Math.PI) / 180);

        for (const pointer of pointers) {
          if (phase === "flee") {
            pointer.vx += pointer.dirX * push * dt;
            pointer.vy += pointer.dirY * push * dt;
          } else if (phase === "hold") {
            pointer.vx *= damp;
            pointer.vy *= damp;
          } else if (phase === "spring") {
            pointer.vx +=
              ((pointer.homeX - pointer.x) * SPRING_K -
                pointer.vx * SPRING_DAMPING) *
              dt;
            pointer.vy +=
              ((pointer.homeY - pointer.y) * SPRING_K -
                pointer.vy * SPRING_DAMPING) *
              dt;
          } else {
            // snap: land exactly on the assigned slot, killing all drift.
            pointer.x = pointer.homeX;
            pointer.y = pointer.homeY;
            pointer.vx = 0;
            pointer.vy = 0;
          }

          const pointerSpeed = Math.hypot(pointer.vx, pointer.vy);
          if (pointerSpeed > SCATTER_MAX_SPEED) {
            pointer.vx *= SCATTER_MAX_SPEED / pointerSpeed;
            pointer.vy *= SCATTER_MAX_SPEED / pointerSpeed;
          }

          pointer.x += pointer.vx * dt;
          pointer.y += pointer.vy * dt;

          // Keep scattered pointers inside the viewport (the fixed layer
          // clips overflow), converting the clamped screen point back into
          // the group's local coordinates.
          const screenX =
            group.x +
            currentScale *
              (pointer.x * currentCos - pointer.y * currentSin);
          const screenY =
            group.y +
            currentScale *
              (pointer.x * currentSin + pointer.y * currentCos);
          const clampedX = Math.min(width - 10, Math.max(10, screenX));
          const clampedY = Math.min(height - 10, Math.max(10, screenY));
          if (clampedX !== screenX || clampedY !== screenY) {
            const inverse = 1 / currentScale;
            const rx = (clampedX - group.x) * inverse;
            const ry = (clampedY - group.y) * inverse;
            pointer.x = rx * currentCos + ry * currentSin;
            pointer.y = -rx * currentSin + ry * currentCos;
            pointer.vx *= 0.35;
            pointer.vy *= 0.35;
          }

          const node = slots[pointer.index];
          if (node) {
            node.style.transform = `translate3d(${pointer.x.toFixed(
              2
            )}px, ${pointer.y.toFixed(2)}px, 0)`;
          }
        }

        if (phase === "snap") scatterActive = false;
      }

      // Always queue the next frame from inside the current one. Because
      // this is the only place the loop is scheduled (besides start()), a
      // single frame can never spawn a duplicate loop.
      schedule();
    };

    const start = () => {
      lastTime = 0;
      container.style.opacity = "1";
      schedule();
    };

    const stop = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    // Resume paths (tab focus, back/forward-cache restore) can find a
    // pending frame id whose callback the browser dropped while suspended.
    // Clear it first so a fresh frame is guaranteed; schedule() still
    // prevents any duplicate loop.
    const resume = () => {
      if (disposed || document.hidden || !canAnimate()) return;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      start();
    };

    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const onPointerOut = (event) => {
      if (!event.relatedTarget) mouse.active = false;
    };

    const onWindowBlur = () => {
      mouse.active = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else {
        // A pending resize callback may have been dropped while hidden.
        resizeFrame = 0;
        resume();
      }
    };

    const onResize = () => {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        refreshMetrics();
        clampToViewport();
        draw();
        if (canAnimate()) start();
        else stop();
      });
    };

    const onMotionPreferenceChange = () => {
      if (canAnimate()) start();
      else stop();
    };

    // Some browsers suspend rAF on back/forward-cache restore or focus loss
    // without a visibilitychange event. These paths resume the same loop.
    const onPageShow = () => resume();
    const onFocus = () => resume();

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerout", onPointerOut);
      window.addEventListener("blur", onWindowBlur);
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("focus", onFocus);

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", onMotionPreferenceChange);
    } else {
      motionQuery.addListener(onMotionPreferenceChange);
    }

    start();

    return () => {
      disposed = true;
      stop();
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      if (hasFinePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerout", onPointerOut);
        window.removeEventListener("blur", onWindowBlur);
      }
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("focus", onFocus);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", onMotionPreferenceChange);
      } else {
        motionQuery.removeListener(onMotionPreferenceChange);
      }
      container.style.opacity = "0";
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="mc-cursor-field">
      <div ref={groupRef} className="mc-cursor-group">
        {CLUSTER_LAYOUT.map((cursor, index) => (
          <div
            key={cursor.id}
            ref={(node) => {
              slotRefs.current[index] = node;
            }}
            className="mc-cursor-group__slot"
            style={{
              transform: `translate3d(${cursor.offsetX.toFixed(
                2
              )}px, ${cursor.offsetY.toFixed(2)}px, 0)`,
            }}
          >
            <div
              className="mc-cursor"
              style={{
                "--mc-color": cursor.color,
                "--mc-glow": cursor.glow,
                "--mc-size": `${cursor.size}px`,
              }}
            >
              <span className="mc-cursor__halo" />
              <svg
                className="mc-cursor__arrow"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.6 2.3 4.6 19.1 9.2 14.7 12.5 21.3 15.8 19.8 12.5 13.4 19.1 12.9 Z"
                  fill="currentColor"
                  stroke="rgba(255,255,255,0.92)"
                  strokeWidth="1.15"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
