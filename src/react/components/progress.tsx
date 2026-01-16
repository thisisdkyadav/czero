import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className = "", value = 0, max = 100, size = "md", variant = "default", ...props }, ref) => {
  const classes = [
    "cz-progress",
    `cz-progress-${size}`,
    className,
  ].filter(Boolean).join(" ");

  const barClasses = [
    "cz-progress-bar",
    `cz-progress-${variant}`,
  ].filter(Boolean).join(" ");

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={classes}
      value={value}
      max={max}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={barClasses}
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
