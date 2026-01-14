import * as React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = "", variant = "text", width, height, style, ...props }, ref) => {
    const classes = [
      "cz-skeleton",
      `cz-skeleton-${variant}`,
      className,
    ].filter(Boolean).join(" ");

    const computedStyle: React.CSSProperties = {
      ...style,
      width: width,
      height: height,
    };

    return (
      <div
        ref={ref}
        className={classes}
        style={computedStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
