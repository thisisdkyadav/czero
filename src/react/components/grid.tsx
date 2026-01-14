import * as React from "react";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className = "", cols = 3, gap = "md", children, ...props }, ref) => {
    const classes = [
      "cz-grid",
      `cz-grid-cols-${cols}`,
      `cz-grid-gap-${gap}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";
