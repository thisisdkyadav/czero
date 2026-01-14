import * as React from "react";

export interface DropdownMenuProps {
  children: React.ReactNode;
}

export interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownMenu components must be used within a DropdownMenu");
  }
  return context;
};

const DropdownMenuRoot: React.FC<DropdownMenuProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        const content = document.querySelector(".cz-dropdown-content");
        if (content && !content.contains(e.target as Node)) {
          setOpen(false);
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="cz-dropdown">{children}</div>
    </DropdownContext.Provider>
  );
};
DropdownMenuRoot.displayName = "DropdownMenu";

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdownContext();
    
    const combinedRef = (node: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <button
        ref={combinedRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(e) => {
          onClick?.(e);
          setOpen(!open);
        }}
        className="cz-dropdown-trigger"
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenu.Trigger";

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className = "", align = "start", children, ...props }, ref) => {
    const { open, setOpen } = useDropdownContext();

    if (!open) return null;

    const classes = [
      "cz-dropdown-content",
      `cz-dropdown-align-${align}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} role="menu" className={classes} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && (child.type as any).displayName === "DropdownMenu.Item") {
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                (child.props as any).onClick?.(e);
                setOpen(false);
              },
            });
          }
          return child;
        })}
      </div>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenu.Content";

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      className={`cz-dropdown-item ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);
DropdownMenuItem.displayName = "DropdownMenu.Item";

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} role="separator" className={`cz-dropdown-separator ${className}`} {...props} />
  )
);
DropdownMenuSeparator.displayName = "DropdownMenu.Separator";

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`cz-dropdown-label ${className}`} {...props} />
  )
);
DropdownMenuLabel.displayName = "DropdownMenu.Label";

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  Label: DropdownMenuLabel,
});
