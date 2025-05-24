"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  className?: string;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative transition-bg min-h-screen bg-gray-50 dark:bg-[#0f0a1f]",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(90deg,#4c1d95 10%,#6b21a8 15%,#7c2d12 20%,#a855f7 25%,#581c87 30%)",
            "--aurora-light":
              "repeating-linear-gradient(90deg,#ddd6fe 10%,#c4b5fd 15%,#a78bfa 20%,#8b5cf6 25%,#e879f9 30%)",
            "--dark-gradient":
              "repeating-linear-gradient(90deg,#0f0a1f 0%,#0f0a1f 7%,transparent 10%,transparent 12%,#0f0a1f 16%)",
            "--light-gradient":
              "repeating-linear-gradient(90deg,#f8f9fa 0%,#f8f9fa 7%,transparent 10%,transparent 12%,#f8f9fa 16%)",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] 
            [background-image:var(--light-gradient),var(--aurora-light)] 
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%] [background-position:50%_50%,50%_50%] 
            opacity-70 blur-[10px] filter will-change-transform 
            after:absolute after:inset-0 
            after:[background-image:var(--light-gradient),var(--aurora-light)]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:[background-attachment:fixed] 
            after:mix-blend-difference after:content-[""] after:animate-aurora`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,transparent_80%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};

export default AuroraBackground;
