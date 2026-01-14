import * as React from "react";

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className = "", ...props }, ref) => (
    <code ref={ref} className={`cz-code ${className}`} {...props} />
  )
);

Code.displayName = "Code";
