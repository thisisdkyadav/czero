import * as React from "react";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "info", title, children, ...props }, ref) => {
    const classes = [
      "cz-alert",
      `cz-alert-${variant}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} role="alert" className={classes} {...props}>
        {title && <div className="cz-alert-title">{title}</div>}
        <div className="cz-alert-content">{children}</div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
