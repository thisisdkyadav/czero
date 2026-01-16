import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  maxHeight?: string | number;
  children: React.ReactNode;
}

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className = "", maxHeight, style, children, ...props }, ref) => {
  const combinedStyle: React.CSSProperties = {
    ...style,
    maxHeight,
  };

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={`cz-scroll-area ${className}`}
      style={combinedStyle}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="cz-scroll-area-viewport">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="cz-scroll-area-scrollbar cz-scroll-area-scrollbar-vertical"
      >
        <ScrollAreaPrimitive.Thumb className="cz-scroll-area-thumb" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar
        orientation="horizontal"
        className="cz-scroll-area-scrollbar cz-scroll-area-scrollbar-horizontal"
      >
        <ScrollAreaPrimitive.Thumb className="cz-scroll-area-thumb" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="cz-scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
});

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
