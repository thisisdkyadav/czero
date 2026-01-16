import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean;
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className = "", required, children, ...props }, ref) => {
  return (
    <LabelPrimitive.Root ref={ref} className={`cz-label ${className}`} {...props}>
      {children}
      {required && <span className="cz-label-required">*</span>}
    </LabelPrimitive.Root>
  );
});

Label.displayName = LabelPrimitive.Root.displayName;
