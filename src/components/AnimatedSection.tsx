"use client";

import { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?:
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "fadeIn"
    | "zoomIn";
  delay?: number;
  threshold?: number;
  duration?: number;
}

const animationClasses = {
  fadeInUp: "animate-fade-in-up",
  fadeInDown: "animate-fade-in-down",
  fadeInLeft: "animate-fade-in-left",
  fadeInRight: "animate-fade-in-right",
  fadeIn: "animate-fade-in",
  zoomIn: "animate-zoom-in",
};

export const AnimatedSection = ({
  children,
  className,
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
}: Omit<AnimatedSectionProps, "duration">) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin: "-50px",
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-300",
        isIntersecting
          ? `opacity-100 ${animationClasses[animation]}`
          : "opacity-0 transform translate-y-8",
        className
      )}
      style={{
        animationDelay: isIntersecting ? `${delay}ms` : "0ms",
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
};
