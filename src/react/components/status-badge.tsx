import * as React from "react";
import { Badge } from "./badge";

type StatusTone = "primary" | "success" | "danger" | "warning";

const STATUS_TONE_MAP: Record<string, StatusTone> = {
  "checked in": "success",
  active: "success",
  present: "success",
  success: "success",

  "checked out": "danger",
  inactive: "danger",
  absent: "danger",
  danger: "danger",
  error: "danger",

  maintenance: "warning",
  pending: "warning",
  warning: "warning",
};

const TONE_STYLES: Record<StatusTone, { bg: string; text: string; dot: string }> = {
  success: {
    bg: "var(--cz-status-badge-success-bg, var(--color-success-bg-light, hsl(var(--cz-color-success) / 0.12)))",
    text: "var(--cz-status-badge-success-text, var(--color-success-dark, hsl(var(--cz-color-success))))",
    dot: "var(--cz-status-badge-success-dot, var(--color-success, hsl(var(--cz-color-success))))",
  },
  danger: {
    bg: "var(--cz-status-badge-danger-bg, var(--color-danger-bg-light, hsl(var(--cz-color-danger) / 0.12)))",
    text: "var(--cz-status-badge-danger-text, var(--color-danger-dark, hsl(var(--cz-color-danger))))",
    dot: "var(--cz-status-badge-danger-dot, var(--color-danger, hsl(var(--cz-color-danger))))",
  },
  warning: {
    bg: "var(--cz-status-badge-warning-bg, var(--color-warning-bg-light, hsl(var(--cz-color-warning) / 0.12)))",
    text: "var(--cz-status-badge-warning-text, var(--color-warning-dark, hsl(var(--cz-color-warning))))",
    dot: "var(--cz-status-badge-warning-dot, var(--color-warning, hsl(var(--cz-color-warning))))",
  },
  primary: {
    bg: "var(--cz-status-badge-primary-bg, var(--color-primary-bg, hsl(var(--cz-color-primary) / 0.12)))",
    text: "var(--cz-status-badge-primary-text, var(--color-primary-dark, hsl(var(--cz-color-primary))))",
    dot: "var(--cz-status-badge-primary-dot, var(--color-primary, hsl(var(--cz-color-primary))))",
  },
};

export interface StatusBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  status?: React.ReactNode;
  children?: React.ReactNode;
  tone?: StatusTone;
  showDot?: boolean;
}

function normalizeStatus(status: React.ReactNode): string {
  if (typeof status === "string") return status.trim().toLowerCase();
  return String(status ?? "").trim().toLowerCase();
}

export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      status,
      children,
      tone,
      showDot = true,
      className = "",
      style = {},
      ...props
    },
    ref
  ) => {
    const label = children ?? status;
    const normalizedStatus = normalizeStatus(status ?? label);
    const resolvedTone = tone ?? STATUS_TONE_MAP[normalizedStatus] ?? "primary";
    const colors = TONE_STYLES[resolvedTone];

    const baseStyles: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      padding:
        "var(--cz-status-badge-padding-y, 0.25rem) var(--cz-status-badge-padding-x, 0.625rem)",
      borderRadius: "var(--cz-status-badge-border-radius, 9999px)",
      fontSize: "var(--cz-status-badge-font-size, 0.75rem)",
      lineHeight: "var(--cz-status-badge-line-height, 1rem)",
      fontWeight:
        "var(--cz-status-badge-font-weight, var(--font-weight-medium, var(--cz-font-weight-medium)))",
      backgroundColor: colors.bg,
      color: colors.text,
      whiteSpace: "nowrap",
      ...style,
    };

    const dotStyles: React.CSSProperties = {
      width: "var(--cz-status-badge-dot-size, 0.5rem)",
      height: "var(--cz-status-badge-dot-size, 0.5rem)",
      borderRadius: "9999px",
      marginRight: "var(--cz-status-badge-dot-gap, 0.375rem)",
      backgroundColor: colors.dot,
      flexShrink: 0,
    };

    return (
      <Badge
        ref={ref}
        variant="default"
        size="md"
        className={className}
        style={baseStyles}
        {...props}
      >
        {showDot && <span aria-hidden="true" style={dotStyles} />}
        {label}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";
