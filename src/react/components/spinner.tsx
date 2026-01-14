import * as React from "react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary";
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className = "", size = "md", variant = "default", ...props }, ref) => {
    const classes = [
      "cz-spinner",
      `cz-spinner-${size}`,
      `cz-spinner-${variant}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} role="status" aria-label="Loading" className={classes} {...props}>
        <svg viewBox="0 0 24 24" fill="none" className="cz-spinner-svg">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="cz-spinner-track"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="60"
            strokeDashoffset="45"
            className="cz-spinner-indicator"
          />
        </svg>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
