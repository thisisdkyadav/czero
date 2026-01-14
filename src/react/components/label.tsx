import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", required, children, ...props }, ref) => {
    return (
      <label ref={ref} className={`cz-label ${className}`} {...props}>
        {children}
        {required && <span className="cz-label-required">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
