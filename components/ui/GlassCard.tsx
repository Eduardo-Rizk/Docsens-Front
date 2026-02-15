import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hoverEffect = true,
  ...props 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        hoverEffect && "hover:glass-hover hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
