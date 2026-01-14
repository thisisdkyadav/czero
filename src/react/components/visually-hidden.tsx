import * as React from "react";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className = "", ...props }, ref) => (
    <span ref={ref} className={`cz-visually-hidden ${className}`} {...props} />
  )
);

VisuallyHidden.displayName = "VisuallyHidden";
