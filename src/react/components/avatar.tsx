import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", src, alt = "", fallback, size = "md", ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const classes = [
      "cz-avatar",
      `cz-avatar-${size}`,
      className,
    ].filter(Boolean).join(" ");

    const showFallback = !src || imageError;

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
      <div ref={ref} className={classes} {...props}>
        {showFallback ? (
          <span className="cz-avatar-fallback">{initials}</span>
        ) : (
          <img
            src={src}
            alt={alt}
            className="cz-avatar-image"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
