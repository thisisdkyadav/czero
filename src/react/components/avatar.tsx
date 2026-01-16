import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className = "", src, alt = "", fallback, size = "md", ...props }, ref) => {
  const classes = [
    "cz-avatar",
    `cz-avatar-${size}`,
    className,
  ].filter(Boolean).join(" ");

  // Generate initials from fallback or alt
  const initials = React.useMemo(() => {
    const text = fallback || alt || "";
    return text
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [fallback, alt]);

  return (
    <AvatarPrimitive.Root ref={ref} className={classes} {...props}>
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className="cz-avatar-image"
      />
      <AvatarPrimitive.Fallback className="cz-avatar-fallback" delayMs={600}>
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
});

Avatar.displayName = AvatarPrimitive.Root.displayName;
