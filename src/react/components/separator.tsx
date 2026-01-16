import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className = "", orientation = "horizontal", decorative = true, ...props }, ref) => {
  const classes = [
    "cz-separator",
    `cz-separator-${orientation}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={classes}
      {...props}
    />
  );
});

Separator.displayName = SeparatorPrimitive.Root.displayName;
