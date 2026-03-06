"use client";

import {
  motion,
  HTMLMotionProps,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

export { AnimatePresence };

export const SlideTransition = ({
  children,
  className,
  direction = "right",
  ...props
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
} & HTMLMotionProps<"div">) => {
  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (direction: "left" | "right") => ({
      zIndex: 0,
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      position: "absolute" as const,
      top: 0,
      left: 0,
      width: "100%",
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
import { ReactNode } from "react";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  ...props
}: MotionWrapperProps) => {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInDown = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  ...props
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  ...props
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  ...props
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  ...props
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  ...props
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}) => {
  const variants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

export const CarouselTransition = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & HTMLMotionProps<"div">) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
export const HoverLift = ({
  children,
  className,
  y = -8,
  duration = 0.4,
  ...props
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
} & HTMLMotionProps<"div">) => {
  return (
    <motion.div
      whileHover={{ y }}
      transition={{ duration, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ViewIn = ({
  children,
  className,
  initial = { opacity: 0, y: 20 },
  view = { opacity: 1, y: 0 },
  delay = 0,
  duration = 0.5,
  ...props
}: {
  children: ReactNode;
  className?: string;
  initial?: any;
  view?: any;
  delay?: number;
  duration?: number;
} & HTMLMotionProps<"div">) => {
  return (
    <motion.div
      initial={initial}
      whileInView={view}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
