"use client";

import { useEffect, useRef } from "react";

// ============================================================
// Coordinated Eight-Cursor Group
//
// One fixed, pointer-events-none layer. Exactly eight miniature
// pointers are arranged in a compact ring around one shared group
// centre. A single requestAnimationFrame controller moves that centre;
// the children never scatter because their formation offsets are static.
//
// The controller uses the same steering model for the whole group:
//   • smooth wandering heading built from incommensurate sine waves
//     plus occasional course corrections;
//   • acceleration/deceleration instead of snapping;
//   • proximity-based repulsion from the real mouse, measured against
//     the group centre, with a short decaying escape budget so the
//     formation glides back to its cruising speed when the mouse leaves;
//   • soft edge steering so the group never leaves the viewport.
//
// Mounted once in app/layout.js. No React re-renders during motion.
// ============================================================

const TAU = Math.PI * 2;
const GROUP_RADIUS = 30;
const MAX_POINTER_SIZE = 18;

const GROUP_CURSORS = [
  { id: "group-01", color: "#38bdf8", glow: "rgba(56,189,248,0.62)", size: 17 },
  { id: "group-02", color: "#8b5cf6", glow: "rgba(139,92,246,0.62)", size: 14 },
  { id: "group-03", color: "#22d3ee", glow: "rgba(34,211,238,0.62)", size: 16 },
  { id: "group-04", color: "#f472b6", glow: "rgba(244,114,182,0.62)", size: 13 },
  { id: "group-05", color: "#e879f9", glow: "rgba(232,121,249,0.62)", size: 18 },
  { id: "group-06", color: "#34d399", glow: "rgba(52,211,153,0.62)", size: 15 },
  { id: "group-07", color: "#fb923c", glow: "rgba(251,146,60,0.62)", size: 16 },
  { id: "group-08", color: "#a855f7", glow: "rgba(168,85,247,0.62)", size: 14 },
];

// Deterministic slot layout. The slots are rendered once and only the
// parent group element is transformed during animation.
const GROUP_LAYOUT = GROUP_CURSORS.map((cursor, index) => {
  const angle = -Math.PI / 2 + index * (TAU / GROUP_CURSORS.length);
  const direction = index % 2 === 0 ? 1 : -1;

  return {
    ...cursor,
    offsetX: Math.cos(angle) * GROUP_RADIUS,
    offsetY: Math.sin(angle) * GROUP_RADIUS,
    floatX: direction * (1.3 + (index % 3) * 0.45),
    floatY: (index % 2 === 0 ? -1 : 1) * (1.9 + (index % 4) * 0.4),
    floatDuration: 4.2 + index * 0.34,
    floatDelay: index * 0.23,
  };
});

export default function MultiCursorField() {
  const containerRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const groupNode = groupRef.current;
    if (!container || !groupNode) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = Math.max(1, window.innerWidth);
    let height = Math.max(1, window.innerHeight);
    let groupScale = 1;
    let edgePad = 46;

    let frameId = null;
    let resizeFrame = 0;
    let running = false;
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
      escapeRadius: 190 + Math.random() * 55,
      escapePower: 2150 + Math.random() * 850,
      escapeEnergy: 0,
      tilt: 0,
    };

    const canAnimate = () =>
      window.innerWidth >= 768 && !motionQuery.matches;

    const refreshMetrics = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      groupScale = width < 1024 ? 0.84 : 1;
      edgePad =
        (GROUP_RADIUS + MAX_POINTER_SIZE / 2 + 20) * groupScale;
    };

    const draw = () => {
      groupNode.style.transform = `translate3d(${group.x.toFixed(
        2
      )}px, ${group.y.toFixed(2)}px, 0) rotate(${group.tilt.toFixed(
        2
      )}deg) scale(${groupScale.toFixed(3)})`;
    };

    const clampToViewport = () => {
      const minX = edgePad;
      const maxX = Math.max(minX, width - edgePad);
      const minY = edgePad;
      const maxY = Math.max(minY, height - edgePad);

      group.x = Math.min(maxX, Math.max(minX, group.x));
      group.y = Math.min(maxY, Math.max(minY, group.y));
    };

    refreshMetrics();

    // Start somewhere comfortably inside the viewport, not pinned to a
    // corner. If the real pointer is already known, the first escape
    // frame will move the group away immediately.
    group.x = width * (0.34 + Math.random() * 0.32);
    group.y = height * (0.34 + Math.random() * 0.32);
    clampToViewport();
    draw();

    const frame = (now) => {
      const dt = lastTime
        ? Math.min(0.045, Math.max(0.001, (now - lastTime) / 1000))
        : 1 / 60;
      lastTime = now;
      const time = now * 0.001;

      // Course corrections keep the sine-based heading from ever looking
      // like a fixed orbit.
      group.turnTimer -= dt;
      if (group.turnTimer <= 0) {
        group.baseAngle += (Math.random() - 0.5) * 1.7;
        group.turnTimer = 2.2 + Math.random() * 3.8;
      }

      const wanderAngle =
        group.baseAngle +
        Math.sin(time * group.phaseRate + group.phase) * 0.74 +
        Math.sin(time * group.phaseRate * 0.57 + group.phaseTwo) * 0.4 +
        Math.sin(time * 0.19 + group.phase * 1.4) * 0.16;

      const cruiseSpeed =
        group.baseSpeed *
        (0.82 + 0.18 * Math.sin(time * 0.43 + group.phaseTwo));

      const targetVx = Math.cos(wanderAngle) * cruiseSpeed;
      const targetVy = Math.sin(wanderAngle) * cruiseSpeed;

      const steer = 1 - Math.exp(-2.4 * dt);
      group.vx += (targetVx - group.vx) * steer;
      group.vy += (targetVy - group.vy) * steer;

      let proximity = 0;

      if (mouse.active) {
        let dx = group.x - mouse.x;
        let dy = group.y - mouse.y;
        let distance = Math.hypot(dx, dy);

        if (distance < group.escapeRadius) {
          proximity = 1 - distance / group.escapeRadius;

          if (distance < 0.001) {
            const angle = group.phase;
            dx = Math.cos(angle);
            dy = Math.sin(angle);
            distance = 1;
          }

          const normalX = dx / distance;
          const normalY = dy / distance;

          // Quadratic force growth: the closer the real pointer, the
          // harder the whole formation accelerates away. A small
          // tangential component curves the escape instead of mirroring
          // the mouse path exactly.
          const acceleration =
            group.escapePower * proximity * proximity;
          group.vx +=
            (normalX - normalY * group.tangent * 0.22) *
            acceleration *
            dt;
          group.vy +=
            (normalY + normalX * group.tangent * 0.22) *
            acceleration *
            dt;

          // Emergency separation if the pointer lands inside the group
          // between frames. It shifts the centre, never a child, so the
          // formation always stays intact.
          const safeGap =
            (GROUP_RADIUS + MAX_POINTER_SIZE / 2 + 36) * groupScale;
          if (distance < safeGap) {
            const push = safeGap - distance;
            group.x += normalX * push;
            group.y += normalY * push;
          }
        }
      }

      // Soft edges: steer the formation inward before it can stick.
      if (group.x < edgePad) {
        group.vx += (edgePad - group.x) * 7 * dt;
      } else if (group.x > width - edgePad) {
        group.vx -= (group.x - (width - edgePad)) * 7 * dt;
      }

      if (group.y < edgePad) {
        group.vy += (edgePad - group.y) * 7 * dt;
      } else if (group.y > height - edgePad) {
        group.vy -= (group.y - (height - edgePad)) * 7 * dt;
      }

      // The escape budget decays after the pointer leaves, so the return
      // to normal wandering is a smooth coast rather than a hard stop.
      group.escapeEnergy = Math.max(
        proximity,
        group.escapeEnergy * Math.exp(-1.8 * dt)
      );

      const maxSpeed =
        group.baseSpeed * 1.35 + group.escapeEnergy * 430;
      const speed = Math.hypot(group.vx, group.vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        group.vx *= scale;
        group.vy *= scale;
      }

      group.x += group.vx * dt;
      group.y += group.vy * dt;

      clampToViewport();

      // Lean gently into the direction of travel. This rotates the whole
      // formation around its centre, so no child ever drifts away.
      const targetTilt = Math.max(-7, Math.min(7, group.vx / 2.4));
      group.tilt += (targetTilt - group.tilt) * (1 - Math.exp(-7 * dt));

      draw();

      frameId = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || document.hidden || !canAnimate()) return;
      running = true;
      lastTime = 0;
      container.style.opacity = "1";
      frameId = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
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
      else start();
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

    // Mouse escape is fine-pointer only. Touch continues to scroll and
    // tap normally while the group keeps its ambient wander.
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerout", onPointerOut);
      window.addEventListener("blur", onWindowBlur);
    }

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", onMotionPreferenceChange);
    } else {
      motionQuery.addListener(onMotionPreferenceChange);
    }

    start();

    return () => {
      stop();
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      if (hasFinePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerout", onPointerOut);
        window.removeEventListener("blur", onWindowBlur);
      }
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", onMotionPreferenceChange);
      } else {
        motionQuery.removeListener(onMotionPreferenceChange);
      }

      container.style.opacity = "0";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="mc-cursor-field"
    >
      <div ref={groupRef} className="mc-cursor-group">
        {GROUP_LAYOUT.map((cursor) => (
          <div
            key={cursor.id}
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
              <span
                className="mc-cursor__float"
                style={{
                  "--float-x": `${cursor.floatX}px`,
                  "--float-y": `${cursor.floatY}px`,
                  "--float-duration": `${cursor.floatDuration}s`,
                  "--float-delay": `${cursor.floatDelay}s`,
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
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
