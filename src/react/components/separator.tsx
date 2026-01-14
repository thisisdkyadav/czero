import * as React from "react";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className = "", orientation = "horizontal", ...props }, ref) => {
    const classes = [
      "cz-separator",
      `cz-separator-${orientation}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={classes}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
