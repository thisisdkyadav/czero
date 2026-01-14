import * as React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className = "", variant = "default", size = "md", removable = false, onRemove, children, ...props }, ref) => {
    const classes = [
      "cz-tag",
      `cz-tag-${variant}`,
      `cz-tag-${size}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <span ref={ref} className={classes} {...props}>
        <span className="cz-tag-content">{children}</span>
        {removable && (
          <button
            type="button"
            className="cz-tag-remove"
            onClick={onRemove}
            aria-label="Remove"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";
