import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  error?: boolean | string;
  size?: "sm" | "md" | "lg" | "small" | "medium" | "large";
  variant?: string;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  showPasswordToggle?: boolean;
}

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const normalizeSize = (
  size: InputProps["size"] | undefined
): "sm" | "md" | "lg" => {
  if (size === "small") return "sm";
  if (size === "large") return "lg";
  if (size === "medium" || size === undefined) return "md";
  return size;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      description,
      error,
      size = "md",
      variant = "default",
      id,
      icon,
      leftIcon,
      rightIcon,
      onClear,
      type = "text",
      showPasswordToggle = true,
      value,
      disabled,
      readOnly,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hasValue = value !== undefined && value !== "";
    const resolvedSize = normalizeSize(size);
    const resolvedLeftIcon = leftIcon ?? icon;
    const isPassword = type === "password";
    const canTogglePassword = isPassword && showPasswordToggle && !disabled && !readOnly;
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = canTogglePassword ? (showPassword ? "text" : "password") : type;

    const wrapperClasses = [
      "cz-input-wrapper",
      `cz-input-wrapper-${resolvedSize}`,
      `cz-input-wrapper-variant-${variant}`,
      resolvedLeftIcon && "cz-input-has-left-icon",
      (rightIcon || onClear || canTogglePassword) && "cz-input-has-right-icon",
      error && "cz-input-wrapper-error",
      readOnly && "cz-input-wrapper-readonly",
      disabled && "cz-disabled",
    ].filter(Boolean).join(" ");

    const inputClasses = [
      "cz-input",
      `cz-input-${resolvedSize}`,
      `cz-input-variant-${variant}`,
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
          {resolvedLeftIcon && (
            <span className="cz-input-icon cz-input-icon-left">
              {resolvedLeftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            type={inputType}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            {...props}
          />
          {canTogglePassword ? (
            <button
              type="button"
              className={cx(
                "cz-input-password-toggle",
                showPassword && "cz-input-password-toggle-active"
              )}
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3L21 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.58 10.58A2 2 0 0013.41 13.41"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7.5a12.3 12.3 0 01-2.87 4.31"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.61 6.61A13.53 13.53 0 001 12.5C2.73 16.89 7 20 12 20a10.93 10.93 0 005.39-1.39"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12.5C2.73 8.11 7 5 12 5s9.27 3.11 11 7.5C21.27 16.89 17 20 12 20S2.73 16.89 1 12.5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          ) : null}
          {onClear && hasValue && !disabled && !readOnly && (
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
          {rightIcon && !onClear && !canTogglePassword && (
            <span className="cz-input-icon cz-input-icon-right">
              {rightIcon}
            </span>
          )}
        </div>
        {description && !error && (
          <span className="cz-input-description">{description}</span>
        )}
        {typeof error === "string" && error.length > 0 ? (
          <span className="cz-error">{error}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
