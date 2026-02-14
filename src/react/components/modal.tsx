import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
export type ModalCloseButtonVariant = "icon" | "button";
export interface ModalTabItem {
  id: string;
  name?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const SIZE_WIDTH_MAP: Record<ModalSize, string> = {
  sm: "28rem",
  md: "36rem",
  lg: "48rem",
  xl: "64rem",
  full: "min(96vw, 96rem)",
};

function toCssDimension(value?: number | string): string | undefined {
  if (value === undefined || value === null) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path
      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export interface ModalProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, "children" | "title"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isOpen?: boolean;
  onClose?: () => void;
  modal?: boolean;

  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  tabs?: ModalTabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  hideTitle?: boolean;

  size?: ModalSize;
  width?: number | string;
  minHeight?: number | string;
  fullHeight?: boolean;

  showCloseButton?: boolean;
  closeButtonVariant?: ModalCloseButtonVariant;
  closeButtonText?: string;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;

  portalContainer?: HTMLElement;
  overlayClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export const Modal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalProps
>(
  (
    {
      open,
      defaultOpen,
      onOpenChange,
      isOpen,
      onClose,
      modal = true,
      trigger,
      title,
      description,
      children,
      footer,
      tabs,
      activeTab,
      onTabChange,
      hideTitle = false,
      size = "md",
      width,
      minHeight,
      fullHeight = false,
      showCloseButton = true,
      closeButtonVariant = "icon",
      closeButtonText = "Close",
      closeOnOverlay = true,
      closeOnEsc = true,
      portalContainer,
      overlayClassName = "",
      headerClassName = "",
      bodyClassName = "",
      footerClassName = "",
      className = "",
      style,
      onInteractOutside,
      onEscapeKeyDown,
      ...props
    },
    ref
  ) => {
    const resolvedOpen = isOpen ?? open;
    const isControlled = resolvedOpen !== undefined;
    const resolvedDefaultOpen =
      defaultOpen ?? (!isControlled && !trigger ? true : undefined);

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        onOpenChange?.(nextOpen);
        if (!nextOpen) {
          onClose?.();
        }
      },
      [onOpenChange, onClose]
    );

    const hasOpenHandler = Boolean(onOpenChange || onClose);
    const resolvedWidth = toCssDimension(width) ?? SIZE_WIDTH_MAP[size];
    const resolvedMinHeight = toCssDimension(minHeight);

    const overlayStyles: React.CSSProperties = {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      backgroundColor: "var(--cz-modal-overlay-bg, var(--color-bg-modal-overlay, rgba(15, 23, 42, 0.55)))",
      backdropFilter: "blur(2px)",
    };

    const contentStyles: React.CSSProperties = {
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 61,
      backgroundColor: "var(--cz-modal-content-bg, var(--color-bg-primary, hsl(var(--cz-color-bg))))",
      borderRadius: "var(--cz-modal-content-border-radius, var(--radius-modal, var(--cz-radius-lg)))",
      border: "1px solid var(--cz-modal-content-border-color, hsl(var(--cz-color-border)))",
      boxShadow: "var(--cz-modal-content-shadow, var(--shadow-modal, var(--cz-shadow-lg)))",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      width: resolvedWidth,
      maxWidth: "calc(100% - 2rem)",
      maxHeight: "calc(100vh - 2rem)",
      minHeight: resolvedMinHeight,
      ...(fullHeight ? { height: "calc(100vh - 2rem)" } : null),
      ...style,
    };

    const headerStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--cz-spacing-md, 0.75rem)",
      padding: "var(--cz-modal-header-padding, var(--cz-spacing-lg, 1rem) var(--cz-spacing-lg, 1rem) var(--cz-spacing-md, 0.75rem))",
      borderBottom: "1px solid hsl(var(--cz-color-border))",
      flexShrink: 0,
    };

    const headerTextStyles: React.CSSProperties = {
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    };

    const titleStyles: React.CSSProperties = {
      margin: 0,
      fontSize: "var(--cz-font-size-xl)",
      fontWeight: "var(--cz-font-weight-semibold)",
      color: "var(--color-primary, hsl(var(--cz-color-primary)))",
      lineHeight: "var(--cz-font-lineHeight-tight)",
    };

    const descriptionStyles: React.CSSProperties = {
      margin: 0,
      fontSize: "var(--cz-font-size-sm)",
      color: "hsl(var(--cz-color-mutedFg))",
    };

    const bodyStyles: React.CSSProperties = {
      padding: "var(--cz-modal-body-padding, var(--cz-spacing-md, 0.75rem) var(--cz-spacing-lg, 1rem) var(--cz-spacing-lg, 1rem))",
      overflowY: "auto",
      flex: 1,
    };

    const footerStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "var(--cz-modal-footer-gap, var(--cz-spacing-md, 0.75rem))",
      padding: "var(--cz-modal-footer-padding, var(--cz-spacing-md, 0.75rem) var(--cz-spacing-lg, 1rem))",
      borderTop: "1px solid hsl(var(--cz-color-border))",
      flexShrink: 0,
    };

    const hasTabs = Boolean(tabs && tabs.length > 0);
    const shouldRenderTitle = Boolean(title) && !(hasTabs && hideTitle);
    const shouldRenderDescription =
      Boolean(description) && !(hasTabs && hideTitle);

    const tabsLayoutStyles: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "var(--cz-spacing-sm, 0.5rem)",
      width: "100%",
      minWidth: 0,
    };

    const tabsTopRowStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--cz-spacing-md, 0.75rem)",
    };

    const tabsRowStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: "var(--cz-spacing-md, 0.75rem)",
      minWidth: 0,
    };

    const tabsNavStyles: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      gap: 0,
      overflowX: "auto",
      overflowY: "hidden",
      minWidth: 0,
      flex: 1,
      scrollbarWidth: "thin",
      paddingBottom: "0.25rem",
      marginBottom: "-0.25rem",
    };

    const getTabButtonStyles = (
      isActive: boolean,
      isDisabled?: boolean
    ): React.CSSProperties => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.375rem",
      padding: "0.5rem 0.75rem",
      fontSize: "var(--cz-modal-tab-font-size, 13px)",
      fontWeight: isActive
        ? "var(--cz-font-weight-semibold)"
        : "var(--cz-modal-tab-font-weight, var(--cz-font-weight-medium))",
      color: isActive
        ? "var(--cz-modal-tab-active-color, var(--color-primary, hsl(var(--cz-color-primary))))"
        : "var(--cz-modal-tab-color, var(--color-text-muted, hsl(var(--cz-color-mutedFg))))",
      backgroundColor: "transparent",
      border: 0,
      borderBottom: isActive
        ? "2px solid var(--cz-modal-tab-active-border-color, var(--color-primary, hsl(var(--cz-color-primary))))"
        : "2px solid transparent",
      marginBottom: "-1px",
      whiteSpace: "nowrap",
      outline: "none",
      boxShadow: "none",
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.5 : 1,
      transition: "all var(--cz-transition-fast)",
    });

    const contentAriaDescribedBy = shouldRenderDescription
      ? props["aria-describedby"]
      : undefined;
    const contentAriaLabelledBy = shouldRenderTitle
      ? props["aria-labelledby"]
      : undefined;
    const contentAriaLabel =
      props["aria-label"] ??
      (typeof title === "string" && !shouldRenderTitle ? title : undefined);

    const normalizeFooter = () => {
      if (footer === undefined || footer === null) return footer;

      const directChildren = React.Children.toArray(footer);
      if (directChildren.length !== 1) {
        return footer;
      }

      const firstChild = directChildren[0];
      if (!React.isValidElement(firstChild) || typeof firstChild.type !== "string") {
        return footer;
      }

      const childProps = (firstChild.props ?? {}) as {
        children?: React.ReactNode;
        style?: React.CSSProperties;
      };
      const nestedChildren = React.Children.toArray(childProps.children);

      if (nestedChildren.length <= 1) {
        return footer;
      }

      const existingStyle = childProps.style ?? {};

      return React.cloneElement(firstChild as React.ReactElement, {
        style: {
          display: existingStyle.display ?? "flex",
          alignItems: existingStyle.alignItems ?? "center",
          justifyContent: existingStyle.justifyContent ?? "flex-end",
          gap:
            existingStyle.gap ??
            "var(--cz-modal-footer-gap, var(--cz-spacing-md, 0.75rem))",
          ...existingStyle,
        },
      });
    };

    const normalizedFooter = normalizeFooter();

    const handleInteractOutside: React.ComponentPropsWithoutRef<
      typeof DialogPrimitive.Content
    >["onInteractOutside"] = (event) => {
      if (!closeOnOverlay) {
        event.preventDefault();
      }
      onInteractOutside?.(event);
    };

    const handleEscapeKeyDown: React.ComponentPropsWithoutRef<
      typeof DialogPrimitive.Content
    >["onEscapeKeyDown"] = (event) => {
      if (!closeOnEsc) {
        event.preventDefault();
      }
      onEscapeKeyDown?.(event);
    };

    const closeButton = showCloseButton ? (
      <DialogPrimitive.Close asChild>
        {closeButtonVariant === "button" ? (
          <button
            type="button"
            className="cz-modal-close-btn cz-btn cz-btn-primary cz-btn-sm"
          >
            {closeButtonText}
          </button>
        ) : (
          <button type="button" className="cz-modal-close-icon" aria-label="Close">
            <CloseIcon />
          </button>
        )}
      </DialogPrimitive.Close>
    ) : null;

    return (
      <DialogPrimitive.Root
        open={resolvedOpen}
        defaultOpen={resolvedDefaultOpen}
        onOpenChange={hasOpenHandler ? handleOpenChange : onOpenChange}
        modal={modal}
      >
        {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
        <DialogPrimitive.Portal container={portalContainer}>
          <DialogPrimitive.Overlay
            className={`cz-modal-overlay ${overlayClassName}`.trim()}
            style={overlayStyles}
          />
          <DialogPrimitive.Content
            ref={ref}
            className={`cz-modal-content cz-modal-size-${size} ${fullHeight ? "cz-modal-full-height" : ""} ${className}`.trim()}
            style={contentStyles}
            onInteractOutside={handleInteractOutside}
            onEscapeKeyDown={handleEscapeKeyDown}
            {...props}
            aria-describedby={contentAriaDescribedBy}
            aria-labelledby={contentAriaLabelledBy}
            aria-label={contentAriaLabel}
          >
            {(hasTabs ||
              shouldRenderTitle ||
              shouldRenderDescription ||
              closeButton) && (
              <div
                className={`cz-modal-header ${headerClassName}`.trim()}
                style={headerStyles}
              >
                {hasTabs ? (
                  <div className="cz-modal-tabs-layout" style={tabsLayoutStyles}>
                    {!hideTitle &&
                      (shouldRenderTitle ||
                        shouldRenderDescription ||
                        closeButton) && (
                        <div
                          className="cz-modal-tabs-top-row"
                          style={tabsTopRowStyles}
                        >
                          {(shouldRenderTitle || shouldRenderDescription) && (
                            <div
                              className="cz-modal-header-text"
                              style={headerTextStyles}
                            >
                              {shouldRenderTitle ? (
                                <DialogPrimitive.Title
                                  className="cz-modal-title"
                                  style={titleStyles}
                                >
                                  {title}
                                </DialogPrimitive.Title>
                              ) : null}
                              {shouldRenderDescription ? (
                                <DialogPrimitive.Description
                                  className="cz-modal-description"
                                  style={descriptionStyles}
                                >
                                  {description}
                                </DialogPrimitive.Description>
                              ) : null}
                            </div>
                          )}
                          {closeButton}
                        </div>
                      )}

                    <div className="cz-modal-tabs-row" style={tabsRowStyles}>
                      <div
                        className="cz-modal-tabs-nav"
                        style={tabsNavStyles}
                        role="tablist"
                        aria-label="Modal tabs"
                      >
                        {tabs?.map((tab) => {
                          const tabId = String(tab.id);
                          const isActive = activeTab === tabId;
                          const label = tab.label ?? tab.name ?? tabId;
                          const isDisabled = Boolean(tab.disabled);

                          return (
                            <button
                              key={tabId}
                              type="button"
                              className="cz-modal-tab-btn"
                              role="tab"
                              aria-selected={isActive}
                              tabIndex={isActive ? 0 : -1}
                              disabled={isDisabled}
                              onClick={() =>
                                !isDisabled && onTabChange?.(tabId)
                              }
                              style={getTabButtonStyles(isActive, isDisabled)}
                            >
                              {tab.icon ? (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {tab.icon}
                                </span>
                              ) : null}
                              <span>{label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {hideTitle ? closeButton : null}
                    </div>
                  </div>
                ) : (
                  <>
                    {(shouldRenderTitle || shouldRenderDescription) && (
                      <div className="cz-modal-header-text" style={headerTextStyles}>
                        {shouldRenderTitle ? (
                          <DialogPrimitive.Title className="cz-modal-title" style={titleStyles}>
                            {title}
                          </DialogPrimitive.Title>
                        ) : null}
                        {shouldRenderDescription ? (
                          <DialogPrimitive.Description
                            className="cz-modal-description"
                            style={descriptionStyles}
                          >
                            {description}
                          </DialogPrimitive.Description>
                        ) : null}
                      </div>
                    )}
                    {closeButton}
                  </>
                )}
              </div>
            )}

            <div className={`cz-modal-body ${bodyClassName}`.trim()} style={bodyStyles}>
              {children}
            </div>

            {footer !== undefined && footer !== null ? (
              <div
                className={`cz-modal-footer ${footerClassName}`.trim()}
                style={footerStyles}
              >
                {normalizedFooter}
              </div>
            ) : null}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

Modal.displayName = "Modal";
