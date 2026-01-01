import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "danger" | "warning" | "outline";
  size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const classes = [
      "cz-badge",
      `cz-badge-${variant}`,
      `cz-badge-${size}`,
      className,
    ].filter(Boolean).join(" ");

    return <span ref={ref} className={classes} {...props} />;
  }
);

Badge.displayName = "Badge";
