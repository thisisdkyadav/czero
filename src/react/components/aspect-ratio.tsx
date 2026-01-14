import * as React from "react";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
  children: React.ReactNode;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className = "", ratio = 16 / 9, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`cz-aspect-ratio ${className}`}
        style={{
          ...style,
          paddingBottom: `${(1 / ratio) * 100}%`,
        }}
        {...props}
      >
        <div className="cz-aspect-ratio-content">
          {children}
        </div>
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";
