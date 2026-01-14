import * as React from "react";

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, size = "md", placeholder, options, id, ...props }, ref) => {
    const selectId = id || React.useId();

    const selectClasses = [
      "cz-select",
      `cz-select-${size}`,
      error && "cz-select-error",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div className="cz-flex cz-flex-col cz-gap-1.5">
        {label && (
          <label htmlFor={selectId} className="cz-label">
            {label}
          </label>
        )}
        <div className="cz-select-wrapper">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="cz-select-icon">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
        {error && <span className="cz-error">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
