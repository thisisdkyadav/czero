import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  /** @deprecated Use `side` instead */
  position?: "top" | "bottom" | "left" | "right";
  /** @deprecated Use `delayDuration` instead */
  delay?: number;
}

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(({
  content,
  children,
  side,
  position,
  align = "center",
  delayDuration,
  delay,
}, ref) => {
  // Support legacy props
  const resolvedSide = side ?? position ?? "top";
  const resolvedDelay = delayDuration ?? delay ?? 200;

  return (
    <TooltipPrimitive.Root delayDuration={resolvedDelay}>
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          side={resolvedSide}
          align={align}
          sideOffset={5}
          className={`cz-tooltip cz-tooltip-${resolvedSide}`}
        >
          {content}
          <TooltipPrimitive.Arrow className="cz-tooltip-arrow" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
});

Tooltip.displayName = "Tooltip";
