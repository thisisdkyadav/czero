import * as React from "react";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className = "", ...props }, ref) => (
    <kbd ref={ref} className={`cz-kbd ${className}`} {...props} />
  )
);

Kbd.displayName = "Kbd";
