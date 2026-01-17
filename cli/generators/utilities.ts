/**
 * CZero Utilities CSS Generator
 * Generates utility classes from config
 */

import type { CZeroConfig } from "../../src/core/types/config";

/**
 * Generate utility CSS classes
 * These are helper classes used by components and available to users
 */
export function generateUtilitiesCSS(): string {
  return `/**
 * CZero Utility Classes
 */

/* Display */
.cz-inline-flex { display: inline-flex; }
.cz-flex { display: flex; }
.cz-flex-col { flex-direction: column; }
.cz-items-center { align-items: center; }
.cz-justify-center { justify-content: center; }
.cz-flex-wrap { flex-wrap: wrap; }

/* Gap */
.cz-gap-1 { gap: 0.25rem; }
.cz-gap-1\\.5 { gap: 0.375rem; }
.cz-gap-2 { gap: 0.5rem; }

/* Width */
.cz-w-full { width: 100%; }

/* Whitespace */
.cz-whitespace-nowrap { white-space: nowrap; }

/* Opacity */
.cz-opacity-25 { opacity: 0.25; }
.cz-opacity-50 { opacity: 0.5; }
.cz-opacity-75 { opacity: 0.75; }

/* Animation */
@keyframes cz-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.cz-animate-spin { animation: cz-spin 1s linear infinite; }

/* Sizing */
.cz-h-4 { height: 1rem; }
.cz-w-4 { width: 1rem; }
.cz-h-8 { height: 2rem; }
.cz-h-10 { height: 2.5rem; }
.cz-h-12 { height: 3rem; }

/* Padding */
.cz-px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.cz-px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.cz-px-4 { padding-left: 1rem; padding-right: 1rem; }
.cz-px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.cz-py-0\\.5 { padding-top: 0.125rem; padding-bottom: 0.125rem; }
.cz-p-lg { padding: var(--cz-spacing-lg); }
.cz-pb-md { padding-bottom: var(--cz-spacing-md); }
.cz-pt-md { padding-top: var(--cz-spacing-md); }
.cz-px-1\\.5 { padding-left: 0.375rem; padding-right: 0.375rem; }

/* Margin */
.cz-mb-md { margin-bottom: var(--cz-spacing-md); }
.cz-mt-md { margin-top: var(--cz-spacing-md); }

/* Typography */
.cz-text-xs { font-size: var(--cz-font-size-xs); }
.cz-text-sm { font-size: var(--cz-font-size-sm); }
.cz-text-md { font-size: var(--cz-font-size-md); }
.cz-text-lg { font-size: var(--cz-font-size-lg); }
.cz-font-medium { font-weight: var(--cz-font-weight-medium); }
.cz-font-semibold { font-weight: var(--cz-font-weight-semibold); }
.cz-leading-tight { line-height: var(--cz-font-lineHeight-tight); }

/* Colors - Background */
.cz-bg-bg { background-color: hsl(var(--cz-color-bg)); }
.cz-bg-primary { background-color: hsl(var(--cz-color-primary)); }
.cz-bg-secondary { background-color: hsl(var(--cz-color-secondary)); }
.cz-bg-muted { background-color: hsl(var(--cz-color-muted)); }
.cz-bg-danger { background-color: hsl(var(--cz-color-danger)); }
.cz-bg-success { background-color: hsl(var(--cz-color-success)); }
.cz-bg-warning { background-color: hsl(var(--cz-color-warning)); }
.cz-bg-transparent { background-color: transparent; }

/* Colors - Text */
.cz-text-fg { color: hsl(var(--cz-color-fg)); }
.cz-text-primary-fg { color: hsl(var(--cz-color-primaryFg)); }
.cz-text-secondary-fg { color: hsl(var(--cz-color-secondaryFg)); }
.cz-text-muted-fg { color: hsl(var(--cz-color-mutedFg)); }
.cz-text-danger { color: hsl(var(--cz-color-danger)); }
.cz-text-danger-fg { color: hsl(var(--cz-color-dangerFg)); }
.cz-text-success-fg { color: hsl(var(--cz-color-successFg)); }
.cz-text-warning-fg { color: hsl(var(--cz-color-warningFg)); }

/* Border */
.cz-border { border-width: 1px; border-style: solid; }
.cz-border-b { border-bottom-width: 1px; border-bottom-style: solid; }
.cz-border-t { border-top-width: 1px; border-top-style: solid; }
.cz-border-border { border-color: hsl(var(--cz-color-border)); }
.cz-border-danger { border-color: hsl(var(--cz-color-danger)); }

/* Border Radius */
.cz-rounded-sm { border-radius: var(--cz-radius-sm); }
.cz-rounded-md { border-radius: var(--cz-radius-md); }
.cz-rounded-lg { border-radius: var(--cz-radius-lg); }
.cz-rounded-full { border-radius: var(--cz-radius-full); }

/* Shadow */
.cz-shadow-sm { box-shadow: var(--cz-shadow-sm); }

/* Transitions */
.cz-transition { transition: all var(--cz-transition-fast); }

/* States */
.cz-disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus */
.cz-focus-ring:focus,
.cz-focus-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--cz-color-bg)), 0 0 0 4px hsl(var(--cz-color-ring));
}

/* Hover states */
.cz-hover-opacity:hover { opacity: 0.9; }
.cz-hover-muted:hover { background-color: hsl(var(--cz-color-muted)); }

/* Label & Error */
.cz-label {
  font-size: var(--cz-font-size-sm);
  font-weight: var(--cz-font-weight-medium);
  color: hsl(var(--cz-color-fg));
}

.cz-label-required {
  color: hsl(var(--cz-color-danger));
  margin-left: 0.25rem;
}

.cz-error {
  font-size: var(--cz-font-size-sm);
  color: hsl(var(--cz-color-danger));
}
`;
}
