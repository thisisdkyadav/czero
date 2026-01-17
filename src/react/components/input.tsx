import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = "", 
    label, 
    description,
    error, 
    size = "md", 
    id, 
    leftIcon,
    rightIcon,
    onClear,
    value,
    disabled,
    ...props 
  }, ref) => {
    const inputId = id || React.useId();
    const hasValue = value !== undefined && value !== "";

    const wrapperClasses = [
      "cz-input-wrapper",
      `cz-input-wrapper-${size}`,
      leftIcon && "cz-input-has-left-icon",
      (rightIcon || onClear) && "cz-input-has-right-icon",
      error && "cz-input-wrapper-error",
      disabled && "cz-disabled",
    ].filter(Boolean).join(" ");

    const inputClasses = [
      "cz-input",
      `cz-input-${size}`,
      error && "cz-input-error",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div className="cz-input-field">
        {label && (
          <label htmlFor={inputId} className="cz-label">
            {label}
          </label>
        )}
        <div className={wrapperClasses}>
          {leftIcon && (
            <span className="cz-input-icon cz-input-icon-left">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            value={value}
            disabled={disabled}
            {...props}
          />
          {onClear && hasValue && !disabled && (
            <button
              type="button"
              className="cz-input-clear"
              onClick={onClear}
              tabIndex={-1}
              aria-label="Clear input"
            >
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {rightIcon && !onClear && (
            <span className="cz-input-icon cz-input-icon-right">
              {rightIcon}
            </span>
          )}
        </div>
        {description && !error && (
          <span className="cz-input-description">{description}</span>
        )}
        {error && <span className="cz-error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
