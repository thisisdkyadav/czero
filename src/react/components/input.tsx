import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, size = "md", id, ...props }, ref) => {
    const inputId = id || React.useId();

    const inputClasses = [
      "cz-input",
      `cz-input-${size}`,
      error && "cz-input-error",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div className="cz-flex cz-flex-col cz-gap-1.5">
        {label && (
          <label htmlFor={inputId} className="cz-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...props}
        />
        {error && <span className="cz-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
