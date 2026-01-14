import * as React from "react";

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
}

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value: string;
  label?: string;
}

interface RadioGroupContextValue {
  name: string;
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

const useRadioGroupContext = () => {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroup.Item must be used within a RadioGroup");
  }
  return context;
};

const RadioGroupRoot = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className = "", name, value: controlledValue, defaultValue = "", onValueChange, orientation = "vertical", children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    
    const handleValueChange = React.useCallback((newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    const classes = [
      "cz-radio-group",
      `cz-radio-group-${orientation}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <RadioGroupContext.Provider value={{ name, value, onValueChange: handleValueChange }}>
        <div ref={ref} role="radiogroup" className={classes} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroupRoot.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className = "", value, label, id, disabled, ...props }, ref) => {
    const context = useRadioGroupContext();
    const radioId = id || React.useId();
    const isChecked = context.value === value;

    const wrapperClasses = [
      "cz-radio-wrapper",
      disabled && "cz-disabled",
      className,
    ].filter(Boolean).join(" ");

    return (
      <label className={wrapperClasses}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={() => context.onValueChange(value)}
          className="cz-radio"
          {...props}
        />
        <span className="cz-radio-indicator" />
        {label && <span className="cz-radio-label">{label}</span>}
      </label>
    );
  }
);
RadioGroupItem.displayName = "RadioGroup.Item";

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
