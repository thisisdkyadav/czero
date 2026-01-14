import * as React from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, size = "md", id, ...props }, ref) => {
    const textareaId = id || React.useId();

    const textareaClasses = [
      "cz-textarea",
      `cz-textarea-${size}`,
      error && "cz-textarea-error",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div className="cz-flex cz-flex-col cz-gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="cz-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          {...props}
        />
        {error && <span className="cz-error">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
