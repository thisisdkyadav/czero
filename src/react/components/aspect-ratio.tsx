import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  ratio?: number;
  children: React.ReactNode;
}

export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className = "", ratio = 16 / 9, children, ...props }, ref) => (
  <div className={`cz-aspect-ratio ${className}`}>
    <AspectRatioPrimitive.Root ref={ref} ratio={ratio} {...props}>
      {children}
    </AspectRatioPrimitive.Root>
  </div>
));

AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;
