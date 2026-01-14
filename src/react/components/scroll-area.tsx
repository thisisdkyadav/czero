import * as React from "react";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string | number;
  children: React.ReactNode;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", maxHeight, style, children, ...props }, ref) => {
    const combinedStyle: React.CSSProperties = {
      ...style,
      maxHeight: maxHeight,
    };

    return (
      <div ref={ref} className={`cz-scroll-area ${className}`} style={combinedStyle} {...props}>
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";
