import * as React from "react";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  wrap?: boolean;
  children: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className = "", 
    direction = "column", 
    gap = "md", 
    align = "stretch",
    justify = "start",
    wrap = false,
    children, 
    ...props 
  }, ref) => {
    const classes = [
      "cz-stack",
      `cz-stack-${direction}`,
      `cz-stack-gap-${gap}`,
      `cz-stack-align-${align}`,
      `cz-stack-justify-${justify}`,
      wrap && "cz-stack-wrap",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";
