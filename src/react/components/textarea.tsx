import * as React from "react";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label?: string;
  description?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  autoResize?: boolean;
  maxRows?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className = "", 
    label, 
    description,
    error, 
    size = "md", 
    id, 
    autoResize = false,
    maxRows,
    disabled,
    onInput,
    style,
    ...props 
  }, ref) => {
    const textareaId = id || React.useId();
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = useCombinedRef(ref, internalRef);

    const handleAutoResize = React.useCallback((textarea: HTMLTextAreaElement) => {
      if (!autoResize) return;
      
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      
      // Calculate max height based on maxRows
      let newHeight = textarea.scrollHeight;
      if (maxRows) {
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
        const paddingTop = parseInt(getComputedStyle(textarea).paddingTop) || 0;
        const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom) || 0;
        const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;
        newHeight = Math.min(newHeight, maxHeight);
      }
      
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, maxRows]);

    const handleInput = React.useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
      handleAutoResize(e.currentTarget);
      onInput?.(e);
    }, [handleAutoResize, onInput]);

    // Initial resize on mount
    React.useEffect(() => {
      if (internalRef.current && autoResize) {
        handleAutoResize(internalRef.current);
      }
    }, [autoResize, handleAutoResize]);

    const textareaClasses = [
      "cz-textarea",
      `cz-textarea-${size}`,
      error && "cz-textarea-error",
      autoResize && "cz-textarea-auto-resize",
      className,
    ].filter(Boolean).join(" ");

    const textareaStyle: React.CSSProperties = {
      ...style,
      ...(autoResize ? { overflow: "hidden", resize: "none" } : {}),
    };

    return (
      <div className="cz-textarea-field">
        {label && (
          <label htmlFor={textareaId} className="cz-label">
            {label}
          </label>
        )}
        <textarea
          ref={combinedRef}
          id={textareaId}
          className={textareaClasses}
          disabled={disabled}
          onInput={handleInput}
          style={textareaStyle}
          {...props}
        />
        {description && !error && (
          <span className="cz-textarea-description">{description}</span>
        )}
        {error && <span className="cz-error">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// Helper hook to combine refs
function useCombinedRef<T>(
  ...refs: (React.ForwardedRef<T> | React.RefObject<T>)[]
): React.RefCallback<T> {
  return React.useCallback((element: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && "current" in ref) {
        (ref as React.MutableRefObject<T | null>).current = element;
      }
    });
  }, refs);
}
