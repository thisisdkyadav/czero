/**
 * CZero Component Default Tokens
 * Default values extracted from components.css
 * Users can override any of these in their czero.config.js
 */

import type { ComponentsConfig } from "./types/config";

export const componentDefaults: ComponentsConfig = {
  // ===== BUTTON =====
  button: {
    height: { sm: "2rem", md: "2.5rem", lg: "3rem" },
    paddingX: { sm: "0.75rem", md: "1rem", lg: "1.5rem" },
    gap: "0.5rem",
    fontSize: { sm: "$font-sm", md: "$font-md", lg: "$font-lg" },
    fontWeight: "$font-medium",
    borderRadius: "$radius-md",
    borderWidth: "1px",
    iconSize: { sm: "2rem", md: "2.5rem", lg: "3rem" },
    transition: "$transition-fast",
    states: {
      hover: { opacity: "0.9" },
      focus: { ringWidth: "2px", ringOffset: "2px", ringColor: "$color-ring" },
      disabled: { opacity: "0.5" },
    },
    variants: {
      primary: {
        bg: "$color-primary",
        color: "$color-primaryFg",
        borderColor: "transparent",
        hover: { opacity: "0.9" },
      },
      secondary: {
        bg: "$color-secondary",
        color: "$color-secondaryFg",
        borderColor: "transparent",
        hover: { opacity: "0.8" },
      },
      outline: {
        bg: "transparent",
        color: "$color-fg",
        borderColor: "$color-border",
        hover: { bg: "$color-muted" },
      },
      ghost: {
        bg: "transparent",
        color: "$color-fg",
        borderColor: "transparent",
        hover: { bg: "$color-muted" },
      },
      danger: {
        bg: "$color-danger",
        color: "$color-dangerFg",
        borderColor: "transparent",
        hover: { opacity: "0.9" },
      },
      link: {
        bg: "transparent",
        color: "$color-primary",
        borderColor: "transparent",
        textDecoration: "underline",
      },
    },
    animations: {
      loading: { duration: "0.75s", timing: "linear" },
    },
  },

  // ===== INPUT =====
  input: {
    height: { sm: "2rem", md: "2.5rem", lg: "3rem" },
    paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
    fontSize: { sm: "$font-sm", md: "$font-md", lg: "$font-lg" },
    borderRadius: "$radius-md",
    borderWidth: "1px",
    borderColor: "$color-border",
    bg: "$color-bg",
    color: "$color-fg",
    placeholderColor: "$color-mutedFg",
    iconSize: "1rem",
    iconColor: "$color-mutedFg",
    iconSpacing: "2.5rem",
    states: {
      focus: {
        borderColor: "$color-ring",
        shadow: "0 0 0 2px $color-ring / 0.2",
      },
      error: {
        borderColor: "$color-danger",
        focusShadow: "0 0 0 2px $color-danger / 0.2",
      },
      disabled: { opacity: "0.5", cursor: "not-allowed" },
    },
  },

  // ===== TEXTAREA =====
  textarea: {
    minHeight: "5rem",
    paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
    paddingY: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" },
    fontSize: { sm: "$font-sm", md: "$font-md", lg: "$font-lg" },
    borderRadius: "$radius-md",
    borderWidth: "1px",
    borderColor: "$color-border",
    bg: "$color-bg",
    color: "$color-fg",
    placeholderColor: "$color-mutedFg",
    states: {
      focus: {
        borderColor: "$color-ring",
        shadow: "0 0 0 2px $color-ring / 0.2",
      },
      disabled: { opacity: "0.5" },
    },
  },

  // ===== CARD =====
  card: {
    padding: "$spacing-lg",
    borderRadius: "$radius-lg",
    borderWidth: "1px",
    borderColor: "$color-border",
    bg: "$color-bg",
    shadow: "$shadow-sm",
    header: {
      paddingBottom: "$spacing-md",
      borderWidth: "1px",
      marginBottom: "$spacing-md",
    },
    title: {
      fontSize: "$font-lg",
      fontWeight: "$font-semibold",
      color: "$color-fg",
    },
    description: {
      fontSize: "$font-sm",
      color: "$color-mutedFg",
    },
    footer: {
      paddingTop: "$spacing-md",
      marginTop: "$spacing-md",
      borderWidth: "1px",
      gap: "0.5rem",
    },
  },

  // ===== BADGE =====
  badge: {
    paddingX: { sm: "0.375rem", md: "0.5rem" },
    paddingY: { sm: "0.125rem", md: "0.125rem" },
    fontSize: { sm: "0.7rem", md: "$font-xs" },
    fontWeight: "$font-medium",
    borderRadius: "$radius-full",
    variants: {
      default: { bg: "$color-secondary", color: "$color-secondaryFg" },
      primary: { bg: "$color-primary", color: "$color-primaryFg" },
      success: { bg: "$color-success", color: "$color-successFg" },
      danger: { bg: "$color-danger", color: "$color-dangerFg" },
      warning: { bg: "$color-warning", color: "$color-warningFg" },
      outline: { bg: "transparent", color: "$color-fg", borderColor: "$color-border" },
    },
  },

  // ===== STATUS BADGE =====
  statusBadge: {
    paddingX: "0.625rem",
    paddingY: "0.25rem",
    fontSize: "$font-xs",
    fontWeight: "$font-medium",
    lineHeight: "1rem",
    borderRadius: "$radius-full",
    dotSize: "0.5rem",
    dotGap: "0.375rem",

    successBg: "$color-success / 0.12",
    successText: "$color-success",
    successDot: "$color-success",
    dangerBg: "$color-danger / 0.12",
    dangerText: "$color-danger",
    dangerDot: "$color-danger",
    warningBg: "$color-warning / 0.12",
    warningText: "$color-warning",
    warningDot: "$color-warning",
    primaryBg: "$color-primary / 0.12",
    primaryText: "$color-primary",
    primaryDot: "$color-primary",
  },

  // ===== SWITCH =====
  switch: {
    width: { sm: "2rem", md: "2.75rem", lg: "3.5rem" },
    height: { sm: "1.125rem", md: "1.5rem", lg: "1.875rem" },
    thumbSize: { sm: "0.875rem", md: "1.25rem", lg: "1.625rem" },
    thumbOffset: "0.125rem",
    borderRadius: "$radius-full",
    bgUnchecked: "$color-muted",
    bgChecked: "$color-primary",
    thumbBg: "$color-bg",
    thumbShadow: "$shadow-sm",
    transition: "$transition-fast",
    states: {
      focus: { ringWidth: "2px", ringOffset: "2px", ringColor: "$color-ring" },
      disabled: { opacity: "0.5" },
    },
  },

  // ===== CHECKBOX =====
  checkbox: {
    size: { sm: "1rem", md: "1.25rem", lg: "1.5rem" },
    iconSize: { sm: "10px", md: "12px", lg: "14px" },
    borderRadius: "$radius-sm",
    borderWidth: "2px",
    borderColor: "$color-border",
    bg: "$color-bg",
    checkedBg: "$color-primary",
    checkedBorderColor: "$color-primary",
    indicatorColor: "$color-primaryFg",
    labelFontSize: "$font-sm",
    labelGap: "0.5rem",
    states: {
      hover: { borderColor: "$color-primary" },
      focus: { ringWidth: "2px", ringOffset: "2px", ringColor: "$color-ring" },
      disabled: { opacity: "0.5" },
    },
  },

  // ===== RADIO =====
  radio: {
    size: "1.25rem",
    indicatorSize: "0.625rem",
    borderWidth: "2px",
    borderColor: "$color-border",
    bg: "$color-bg",
    checkedBorderColor: "$color-primary",
    indicatorBg: "$color-primary",
    labelFontSize: "$font-sm",
    labelGap: "0.5rem",
    states: {
      hover: { borderColor: "$color-primary" },
      focus: { ringWidth: "2px", ringOffset: "2px", ringColor: "$color-ring" },
      disabled: { opacity: "0.5" },
    },
  },

  // ===== SELECT =====
  select: {
    height: { sm: "2rem", md: "2.5rem", lg: "3rem" },
    paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
    fontSize: { sm: "$font-sm", md: "$font-md", lg: "$font-lg" },
    borderRadius: "$radius-md",
    borderWidth: "1px",
    borderColor: "$color-border",
    bg: "$color-bg",
    color: "$color-fg",
    iconSize: "12px",
    states: {
      focus: { ringWidth: "2px", ringColor: "$color-ring" },
      disabled: { opacity: "0.5" },
    },
    content: {
      bg: "$color-bg",
      borderRadius: "$radius-md",
      shadow: "$shadow-md",
      padding: "0.25rem",
    },
    item: {
      paddingX: "0.5rem",
      paddingY: "0.375rem",
      borderRadius: "$radius-sm",
      hoverBg: "$color-muted",
    },
  },

  // ===== LABEL =====
  label: {
    fontSize: "$font-sm",
    fontWeight: "$font-medium",
    color: "$color-fg",
    requiredColor: "$color-danger",
  },

  // ===== ALERT =====
  alert: {
    paddingX: "$spacing-lg",
    paddingY: "$spacing-md",
    borderRadius: "$radius-md",
    borderWidth: "1px",
    titleFontSize: "$font-sm",
    titleFontWeight: "$font-semibold",
    contentFontSize: "$font-sm",
    variants: {
      info: { bg: "$color-primary / 0.1", borderColor: "$color-primary / 0.3", color: "$color-primary" },
      success: { bg: "$color-success / 0.1", borderColor: "$color-success / 0.3", color: "$color-success" },
      warning: { bg: "$color-warning / 0.1", borderColor: "$color-warning / 0.3", color: "$color-warning" },
      danger: { bg: "$color-danger / 0.1", borderColor: "$color-danger / 0.3", color: "$color-danger" },
    },
  },

  // ===== TOOLTIP =====
  tooltip: {
    paddingX: "0.75rem",
    paddingY: "0.375rem",
    fontSize: "$font-sm",
    borderRadius: "$radius-md",
    bg: "$color-fg",
    color: "$color-bg",
    shadow: "$shadow-md",
    offset: "0.5rem",
  },

  // ===== PROGRESS =====
  progress: {
    height: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" },
    borderRadius: "$radius-full",
    bg: "$color-muted",
    barColors: {
      default: "$color-primary",
      success: "$color-success",
      warning: "$color-warning",
      danger: "$color-danger",
    },
    transition: "$transition-normal",
  },

  // ===== SKELETON =====
  skeleton: {
    bg: "$color-muted",
    borderRadius: "$radius-sm",
    animationDuration: "1.5s",
  },

  // ===== SPINNER =====
  spinner: {
    size: { sm: "1rem", md: "1.5rem", lg: "2rem" },
    borderWidth: { sm: "2px", md: "2px", lg: "3px" },
    color: "$color-primary",
    trackColor: "$color-muted",
    animationDuration: "0.6s",
  },

  // ===== TABS =====
  tabs: {
    listBorderWidth: "1px",
    listBorderColor: "$color-border",
    listGap: "0.5rem",
    triggerPaddingX: "1rem",
    triggerPaddingY: "0.5rem",
    triggerPaddingXSm: "0.75rem",
    triggerPaddingYSm: "0.375rem",
    triggerPaddingXLg: "1.25rem",
    triggerPaddingYLg: "0.625rem",
    triggerFontSize: "$font-sm",
    triggerFontSizeSm: "$font-xs",
    triggerFontSizeLg: "$font-md",
    triggerFontWeight: "$font-medium",
    triggerColor: "$color-mutedFg",
    triggerActiveColor: "$color-primary",
    triggerActiveBorderColor: "$color-primary",
    triggerGap: "$spacing-sm",
    triggerRadius: "$radius-sm",
    triggerBorderWidth: "2px",
    triggerTransition: "$transition-fast",

    iconSize: "0.875rem",
    countPaddingX: "0.375rem",
    countMinWidth: "1.25rem",
    countHeight: "1.125rem",
    countFontSize: "$font-xs",
    countFontWeight: "$font-semibold",
    countRadius: "$radius-sm",
    countBg: "$color-muted",
    countColor: "$color-mutedFg",
    countActiveBg: "$color-primary / 0.15",
    countActiveColor: "$color-primary",

    pillsListGap: "$spacing-sm",
    pillsTriggerBg: "$color-bg",
    pillsTriggerColor: "$color-mutedFg",
    pillsTriggerBorderColor: "$color-border",
    pillsTriggerHoverBg: "$color-muted / 0.35",
    pillsTriggerHoverColor: "$color-primary",
    pillsTriggerActiveBg: "$color-primary",
    pillsTriggerActiveColor: "$color-primaryFg",
    pillsTriggerActiveBorderColor: "$color-primary",
    pillsTriggerRadius: "$radius-md",

    enclosedListBg: "$color-muted / 0.3",
    enclosedListPadding: "0.25rem",
    enclosedListRadius: "$radius-md",
    enclosedTriggerColor: "$color-mutedFg",
    enclosedTriggerActiveBg: "$color-bg",
    enclosedTriggerActiveColor: "$color-fg",
    enclosedTriggerRadius: "$radius-sm",
    enclosedTriggerActiveShadow: "$shadow-sm",

    contentPadding: "$spacing-lg",
    states: {
      hover: { color: "$color-fg" },
      focus: { ringWidth: "2px", ringColor: "$color-ring" },
    },
  },

  // ===== DIALOG =====
  dialog: {
    overlayBg: "rgba(0, 0, 0, 0.5)",
    contentBg: "$color-bg",
    contentBorderRadius: "$radius-lg",
    contentShadow: "$shadow-lg",
    contentMaxWidth: "32rem",
    contentPadding: "$spacing-lg",
    closeBtnSize: "2rem",
    titleFontSize: "$font-lg",
    titleFontWeight: "$font-semibold",
    descriptionFontSize: "$font-sm",
    descriptionColor: "$color-mutedFg",
  },

  // ===== MODAL =====
  modal: {
    overlayBg: "rgba(15, 23, 42, 0.55)",
    contentBg: "$color-bg",
    contentBorderRadius: "$radius-lg",
    contentBorderColor: "$color-border",
    contentShadow: "$shadow-lg",

    headerPadding: "1rem 1rem 0.75rem",
    bodyPadding: "0.75rem 1rem 1rem",
    footerPadding: "0.75rem 1rem",
    footerGap: "$spacing-md",

    closeIconSize: "2rem",
    closeIconPadding: "0.5rem",
    closeIconRadius: "$radius-md",
    closeIconBg: "transparent",
    closeIconColor: "$color-mutedFg",
    closeIconHoverBg: "$color-muted",
    closeIconHoverColor: "$color-primary",
    closeIconTransition: "$transition-fast",
    closeIconFocusRing: "none",

    tabFontSize: "13px",
    tabFontWeight: "$font-medium",
    tabColor: "$color-mutedFg",
    tabActiveColor: "$color-primary",
    tabActiveBorderColor: "$color-primary",
  },

  // ===== DROPDOWN MENU =====
  dropdownMenu: {
    contentBg: "$color-bg",
    contentBorderRadius: "$radius-md",
    contentShadow: "$shadow-lg",
    contentPadding: "0.25rem",
    contentMinWidth: "8rem",
    itemPaddingX: "0.5rem",
    itemPaddingY: "0.375rem",
    itemBorderRadius: "$radius-sm",
    itemFontSize: "$font-sm",
    itemHoverBg: "$color-muted",
    separatorColor: "$color-border",
    separatorMargin: "0.25rem",
  },

  // ===== ACCORDION =====
  accordion: {
    borderRadius: "$radius-md",
    borderWidth: "1px",
    borderColor: "$color-border",
    itemBorderWidth: "1px",
    triggerPadding: "1rem",
    triggerFontWeight: "$font-medium",
    triggerHoverBg: "$color-muted",
    contentPadding: "1rem",
    iconSize: "1rem",
    states: {
      focus: { ringWidth: "2px", ringColor: "$color-ring" },
    },
  },

  // ===== TABLE =====
  table: {
    borderRadius: "$radius-md",
    borderWidth: "1px",
    borderColor: "$color-border",
    headerBg: "$color-muted",
    headerFontWeight: "$font-medium",
    cellPaddingX: "0.75rem",
    cellPaddingY: "0.5rem",
    rowHoverBg: "$color-muted / 0.5",
    stripedBg: "$color-muted / 0.3",
  },

  // ===== DATA TABLE =====
  dataTable: {
    containerBg: "$color-bg",
    containerBorderRadius: "$radius-lg",
    containerBorderColor: "$color-border",
    containerShadow: "$shadow-sm",

    headerCellPadding: "0.75rem 1rem",
    headerFontSize: "$font-xs",
    headerFontWeight: "$font-medium",
    headerColor: "$color-mutedFg",
    headerTextTransform: "uppercase",
    headerLetterSpacing: "0.02em",

    bodyCellPadding: "0.875rem 1rem",
    bodyFontSize: "$font-sm",
    bodyColor: "$color-fg",
    rowBorderColor: "$color-border",
    rowHoverBg: "$color-muted / 0.5",
    stripedRowBg: "$color-muted / 0.3",
    selectedRowBg: "$color-primary / 0.12",

    sortIconOpacity: "0.3",
    sortActiveColor: "$color-primary",

    paginationPadding: "0.75rem 1rem",
    paginationGap: "0.5rem",
    paginationBorderColor: "$color-border",
    paginationTextColor: "$color-mutedFg",
    paginationTextStrongColor: "$color-fg",
    paginationButtonSize: "32px",
    paginationButtonRadius: "$radius-md",
    paginationButtonHoverBg: "$color-muted / 0.4",
    paginationButtonBorderColor: "transparent",
    paginationButtonColor: "$color-fg",
    paginationButtonDisabledColor: "$color-mutedFg",

    emptyStateColor: "$color-mutedFg",
    emptyStateTitleColor: "$color-fg",
    emptyStateIconBg: "$color-muted",
    emptyStateIconColor: "$color-mutedFg",

    loadingShimmerBase: "$color-muted",
    loadingShimmerHighlight: "$color-muted / 0.5",
  },

  // ===== AVATAR =====
  avatar: {
    size: { sm: "2rem", md: "2.5rem", lg: "3.5rem" },
    fontSize: { sm: "$font-xs", md: "$font-sm", lg: "$font-md" },
    borderRadius: "$radius-full",
    bg: "$color-muted",
    color: "$color-mutedFg",
  },

  // ===== SEPARATOR =====
  separator: {
    color: "$color-border",
    thickness: "1px",
  },

  // ===== BREADCRUMB =====
  breadcrumb: {
    fontSize: "$font-sm",
    color: "$color-mutedFg",
    activeColor: "$color-fg",
    separatorColor: "$color-mutedFg",
    gap: "0.5rem",
  },

  // ===== CODE =====
  code: {
    fontSize: "$font-sm",
    fontFamily: "ui-monospace, monospace",
    bg: "$color-muted",
    color: "$color-fg",
    paddingX: "0.25rem",
    paddingY: "0.125rem",
    borderRadius: "$radius-sm",
  },

  // ===== KBD =====
  kbd: {
    fontSize: "$font-xs",
    fontFamily: "ui-monospace, monospace",
    bg: "$color-muted",
    color: "$color-fg",
    borderColor: "$color-border",
    paddingX: "0.375rem",
    paddingY: "0.125rem",
    borderRadius: "$radius-sm",
    shadow: "0 1px 0 1px $color-border",
  },

  // ===== TAG =====
  tag: {
    paddingX: { sm: "0.5rem", md: "0.625rem" },
    paddingY: { sm: "0.125rem", md: "0.25rem" },
    fontSize: { sm: "$font-xs", md: "$font-sm" },
    fontWeight: "$font-medium",
    borderRadius: "$radius-md",
    gap: "0.25rem",
    variants: {
      default: { bg: "$color-secondary", color: "$color-secondaryFg" },
      primary: { bg: "$color-primary", color: "$color-primaryFg" },
      success: { bg: "$color-success", color: "$color-successFg" },
      danger: { bg: "$color-danger", color: "$color-dangerFg" },
      warning: { bg: "$color-warning", color: "$color-warningFg" },
      outline: { bg: "transparent", color: "$color-fg", borderColor: "$color-border" },
    },
  },

  // ===== TOAST =====
  toast: {
    padding: "1rem",
    borderRadius: "$radius-md",
    shadow: "$shadow-lg",
    minWidth: "300px",
    maxWidth: "420px",
    titleFontWeight: "$font-semibold",
    variants: {
      default: { bg: "$color-bg", color: "$color-fg", borderColor: "$color-border" },
      success: { bg: "$color-success / 0.1", color: "$color-success", borderColor: "$color-success / 0.3" },
      warning: { bg: "$color-warning / 0.1", color: "$color-warning", borderColor: "$color-warning / 0.3" },
      danger: { bg: "$color-danger / 0.1", color: "$color-danger", borderColor: "$color-danger / 0.3" },
    },
  },

  // ===== SCROLL AREA =====
  scrollArea: {
    scrollbarWidth: "10px",
    scrollbarBg: "transparent",
    thumbBg: "$color-border",
    thumbHoverBg: "$color-mutedFg",
    thumbBorderRadius: "$radius-full",
  },

  // ===== CONTAINER =====
  container: {
    maxWidth: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" },
    paddingX: "1rem",
  },

  // ===== STACK =====
  stack: {
    gap: { sm: "0.5rem", md: "1rem", lg: "1.5rem" },
  },

  // ===== GRID =====
  grid: {
    gap: { sm: "0.5rem", md: "1rem", lg: "1.5rem" },
  },
};
