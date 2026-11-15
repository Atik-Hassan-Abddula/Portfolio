"use client";

import { motion, useReducedMotion } from "motion/react";

// Shared smooth ease-out curve (used by every entrance animation)
const EASE = [0.22, 1, 0.36, 1];

const DEFAULT_VIEWPORT = { once: true, margin: "0px 0px -80px 0px" };

function buildItemVariants(y, duration) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: EASE },
    },
  };
}

/**
 * Reveal — fades content up into view once it enters the viewport.
 *
 * trigger="scroll" (default): plays when the element scrolls into view.
 * trigger="load": plays immediately on mount (for above-the-fold content).
 *
 * When the user prefers reduced motion, content renders statically with
 * no transforms or opacity changes.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.6,
  trigger = "scroll",
  once = true,
  margin = "0px 0px -80px 0px",
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = buildItemVariants(y, duration);
  const baseProps = {
    className,
    variants,
    transition: { delay },
  };

  if (trigger === "load") {
    return (
      <motion.div
        {...baseProps}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      {...baseProps}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerGroup — parent container that plays its direct StaggerItem
 * children one after another. Variant state propagates to children
 * automatically, so items never need their own initial/animate props.
 *
 * trigger="scroll" (default) or "load" — same semantics as Reveal.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  trigger = "scroll",
  once = true,
  margin = "0px 0px -80px 0px",
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };

  if (trigger === "load") {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — child of a StaggerGroup. Fades up with the stagger
 * timing inherited from its parent container.
 */
export function StaggerItem({ children, className, y = 20, duration = 0.55 }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={buildItemVariants(y, duration)}>
      {children}
    </motion.div>
  );
}
