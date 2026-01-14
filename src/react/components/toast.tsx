import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger";
  title?: string;
  description?: string;
  onClose?: () => void;
}

export interface ToasterProps {
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
}

interface ToastItem {
  id: string;
  variant?: ToastProps["variant"];
  title?: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  const toast = React.useCallback((options: Omit<ToastItem, "id">) => {
    context.addToast(options);
  }, [context]);

  return { toast, toasts: context.toasts };
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
ToastProvider.displayName = "ToastProvider";

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className = "", variant = "default", title, description, onClose, children, ...props }, ref) => {
    const classes = [
      "cz-toast",
      `cz-toast-${variant}`,
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} role="alert" className={classes} {...props}>
        <div className="cz-toast-content">
          {title && <div className="cz-toast-title">{title}</div>}
          {description && <div className="cz-toast-description">{description}</div>}
          {children}
        </div>
        {onClose && (
          <button type="button" className="cz-toast-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = "Toast";

export const Toaster: React.FC<ToasterProps> = ({ position = "bottom-right" }) => {
  const context = React.useContext(ToastContext);
  
  if (!context) return null;

  const { toasts, removeToast } = context;

  const classes = [
    "cz-toaster",
    `cz-toaster-${position}`,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          description={toast.description}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
Toaster.displayName = "Toaster";
