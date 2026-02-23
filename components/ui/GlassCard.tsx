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
        "bg-surface border border-border p-6 transition-all duration-300 relative overflow-hidden",
        hoverEffect && "hover:border-brand-accent/30 hover:-translate-y-0.5 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
