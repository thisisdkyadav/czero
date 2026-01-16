import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

// ===== Root =====
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  modal?: boolean;
}

const DialogRoot: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
  modal = true,
}) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange} modal={modal}>
    {children}
  </DialogPrimitive.Root>
);
DialogRoot.displayName = "Dialog";

// ===== Trigger =====
export interface DialogTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(({ asChild = true, ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} asChild={asChild} {...props} />
));
DialogTrigger.displayName = "Dialog.Trigger";

// ===== Overlay =====
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={`cz-dialog-overlay ${className}`}
    {...props}
  />
));
DialogOverlay.displayName = "Dialog.Overlay";

// ===== Close =====
const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={`cz-dialog-close ${className}`}
    {...props}
  />
));
DialogClose.displayName = "Dialog.Close";

// ===== Content =====
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className = "", children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`cz-dialog-content ${className}`}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="cz-dialog-close" aria-label="Close">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "Dialog.Content";

// ===== Header =====
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`cz-dialog-header ${className}`} {...props} />
  )
);
DialogHeader.displayName = "Dialog.Header";

// ===== Title =====
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`cz-dialog-title ${className}`}
    {...props}
  />
));
DialogTitle.displayName = "Dialog.Title";

// ===== Description =====
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={`cz-dialog-description ${className}`}
    {...props}
  />
));
DialogDescription.displayName = "Dialog.Description";

// ===== Footer =====
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`cz-dialog-footer ${className}`} {...props} />
  )
);
DialogFooter.displayName = "Dialog.Footer";

// ===== Export =====
export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
  Overlay: DialogOverlay,
});
