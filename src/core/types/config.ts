/**
 * CZero Configuration Types
 * TypeScript interfaces for the extended configuration system
 */

// ===== Size Variants =====
export interface SizeVariants<T> {
  sm?: T;
  md?: T;
  lg?: T;
}

// ===== State Configuration =====
export interface StateConfig {
  opacity?: string;
  transform?: string;
  shadow?: string;
  bg?: string;
  color?: string;
  borderColor?: string;
  scale?: string;
}

export interface FocusStateConfig extends StateConfig {
  ringWidth?: string;
  ringOffset?: string;
  ringColor?: string;
}

export interface StatesConfig {
  hover?: StateConfig;
  focus?: FocusStateConfig;
  active?: StateConfig;
  disabled?: StateConfig;
}

// ===== Variant Configuration =====
export interface VariantConfig {
  bg?: string;
  color?: string;
  border?: string;           // Full border shorthand: "2px solid #color"
  borderColor?: string;
  borderWidth?: string;
  shadow?: string;
  textDecoration?: string;
  hover?: StateConfig;
}

// ===== Animation Configuration =====
export interface AnimationConfig {
  duration?: string;
  timing?: string;
  keyframes?: Record<string, Record<string, string>>;
}

export interface AnimationsConfig {
  loading?: AnimationConfig;
  hover?: AnimationConfig;
  [key: string]: AnimationConfig | undefined;
}

// ===== Responsive Configuration =====
export interface ResponsiveConfig {
  sm?: Partial<ComponentTokensBase>;
  md?: Partial<ComponentTokensBase>;
  lg?: Partial<ComponentTokensBase>;
  xl?: Partial<ComponentTokensBase>;
}

// ===== Base Component Tokens =====
export interface ComponentTokensBase {
  customCSS?: string;
}

// ===== Button Tokens =====
export interface ButtonTokens extends ComponentTokensBase {
  // Sizing
  height?: SizeVariants<string>;
  paddingX?: SizeVariants<string>;
  paddingY?: SizeVariants<string>;  // For flexible height buttons
  gap?: string;

  // Typography
  fontSize?: SizeVariants<string> | string;
  fontWeight?: string;

  // Shape
  borderRadius?: string;
  borderWidth?: string;

  // Icon-only
  iconSize?: SizeVariants<string>;

  // Transitions
  transition?: string;

  // States
  states?: StatesConfig;

  // Variants
  variants?: Record<string, VariantConfig>;

  // Animations
  animations?: AnimationsConfig;

  // Responsive
  responsive?: ResponsiveConfig;
}

// ===== Input Tokens =====
export interface InputTokens extends ComponentTokensBase {
  height?: SizeVariants<string>;
  paddingX?: SizeVariants<string>;
  fontSize?: SizeVariants<string> | string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  bg?: string;
  color?: string;
  placeholderColor?: string;

  // Icons
  iconSize?: string;
  iconColor?: string;
  iconSpacing?: string;

  // States
  states?: {
    focus?: { borderColor?: string; shadow?: string };
    error?: { borderColor?: string; focusShadow?: string };
    disabled?: { opacity?: string; cursor?: string };
  };

  responsive?: ResponsiveConfig;
}

// ===== Textarea Tokens =====
export interface TextareaTokens extends ComponentTokensBase {
  minHeight?: string;
  paddingX?: SizeVariants<string>;
  paddingY?: SizeVariants<string>;
  fontSize?: SizeVariants<string> | string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  bg?: string;
  color?: string;
  placeholderColor?: string;
  states?: StatesConfig;
  responsive?: ResponsiveConfig;
}

// ===== Card Tokens =====
export interface CardTokens extends ComponentTokensBase {
  padding?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  bg?: string;
  shadow?: string;

  header?: {
    paddingBottom?: string;
    borderWidth?: string;
    marginBottom?: string;
  };
  title?: {
    fontSize?: string;
    fontWeight?: string;
    color?: string;
  };
  description?: {
    fontSize?: string;
    color?: string;
  };
  footer?: {
    paddingTop?: string;
    marginTop?: string;
    borderWidth?: string;
    gap?: string;
  };

  responsive?: ResponsiveConfig;
}

// ===== Badge Tokens =====
export interface BadgeTokens extends ComponentTokensBase {
  paddingX?: SizeVariants<string>;
  paddingY?: SizeVariants<string>;
  fontSize?: SizeVariants<string>;
  fontWeight?: string;
  borderRadius?: string;
  variants?: Record<string, VariantConfig>;
  responsive?: ResponsiveConfig;
}

// ===== Switch Tokens =====
export interface SwitchTokens extends ComponentTokensBase {
  width?: SizeVariants<string>;
  height?: SizeVariants<string>;
  thumbSize?: SizeVariants<string>;
  thumbOffset?: string;
  borderRadius?: string;
  bgUnchecked?: string;
  bgChecked?: string;
  thumbBg?: string;
  thumbShadow?: string;
  transition?: string;
  states?: StatesConfig;
  responsive?: ResponsiveConfig;
}

// ===== Checkbox Tokens =====
export interface CheckboxTokens extends ComponentTokensBase {
  size?: SizeVariants<string>;
  iconSize?: SizeVariants<string>;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  bg?: string;
  checkedBg?: string;
  checkedBorderColor?: string;
  indicatorColor?: string;
  labelFontSize?: string;
  labelGap?: string;
  states?: StatesConfig;
  responsive?: ResponsiveConfig;
}

// ===== Radio Tokens =====
export interface RadioTokens extends ComponentTokensBase {
  size?: string;
  indicatorSize?: string;
  borderWidth?: string;
  borderColor?: string;
  bg?: string;
  checkedBorderColor?: string;
  indicatorBg?: string;
  labelFontSize?: string;
  labelGap?: string;
  states?: StatesConfig;
  responsive?: ResponsiveConfig;
}

// ===== Select Tokens =====
export interface SelectTokens extends ComponentTokensBase {
  height?: SizeVariants<string>;
  paddingX?: SizeVariants<string>;
  fontSize?: SizeVariants<string> | string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  bg?: string;
  color?: string;
  iconSize?: string;
  states?: StatesConfig;
  content?: {
    bg?: string;
    borderRadius?: string;
    shadow?: string;
    padding?: string;
  };
  item?: {
    paddingX?: string;
    paddingY?: string;
    borderRadius?: string;
    hoverBg?: string;
  };
  responsive?: ResponsiveConfig;
}

// ===== Label Tokens =====
export interface LabelTokens extends ComponentTokensBase {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  requiredColor?: string;
}

// ===== Alert Tokens =====
export interface AlertTokens extends ComponentTokensBase {
  paddingX?: string;
  paddingY?: string;
  borderRadius?: string;
  borderWidth?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
  contentFontSize?: string;
  variants?: Record<string, VariantConfig>;
  responsive?: ResponsiveConfig;
}

// ===== Tooltip Tokens =====
export interface TooltipTokens extends ComponentTokensBase {
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
  borderRadius?: string;
  bg?: string;
  color?: string;
  shadow?: string;
  offset?: string;
}

// ===== Progress Tokens =====
export interface ProgressTokens extends ComponentTokensBase {
  height?: SizeVariants<string>;
  borderRadius?: string;
  bg?: string;
  barColors?: Record<string, string>;
  transition?: string;
}

// ===== Skeleton Tokens =====
export interface SkeletonTokens extends ComponentTokensBase {
  bg?: string;
  borderRadius?: string;
  animationDuration?: string;
}

// ===== Spinner Tokens =====
export interface SpinnerTokens extends ComponentTokensBase {
  size?: SizeVariants<string>;
  borderWidth?: SizeVariants<string>;
  color?: string;
  trackColor?: string;
  animationDuration?: string;
}

// ===== Tabs Tokens =====
export interface TabsTokens extends ComponentTokensBase {
  listBorderWidth?: string;
  listBorderColor?: string;
  triggerPaddingX?: string;
  triggerPaddingY?: string;
  triggerFontSize?: string;
  triggerFontWeight?: string;
  triggerColor?: string;
  triggerActiveColor?: string;
  triggerActiveBorderColor?: string;
  contentPadding?: string;
  states?: StatesConfig;
  responsive?: ResponsiveConfig;
}

// ===== Dialog Tokens =====
export interface DialogTokens extends ComponentTokensBase {
  overlayBg?: string;
  contentBg?: string;
  contentBorderRadius?: string;
  contentShadow?: string;
  contentMaxWidth?: string;
  contentPadding?: string;
  closeBtnSize?: string;
  titleFontSize?: string;
  titleFontWeight?: string;
  descriptionFontSize?: string;
  descriptionColor?: string;
  responsive?: ResponsiveConfig;
}

// ===== Dropdown Menu Tokens =====
export interface DropdownMenuTokens extends ComponentTokensBase {
  contentBg?: string;
  contentBorderRadius?: string;
  contentShadow?: string;
  contentPadding?: string;
  contentMinWidth?: string;
  itemPaddingX?: string;
  itemPaddingY?: string;
  itemBorderRadius?: string;
  itemFontSize?: string;
  itemHoverBg?: string;
  separatorColor?: string;
  separatorMargin?: string;
}

// ===== Accordion Tokens =====
export interface AccordionTokens extends ComponentTokensBase {
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  itemBorderWidth?: string;
  triggerPadding?: string;
  triggerFontWeight?: string;
  triggerHoverBg?: string;
  contentPadding?: string;
  iconSize?: string;
  states?: StatesConfig;
}

// ===== Table Tokens =====
export interface TableTokens extends ComponentTokensBase {
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  headerBg?: string;
  headerFontWeight?: string;
  cellPaddingX?: string;
  cellPaddingY?: string;
  rowHoverBg?: string;
  stripedBg?: string;
}

// ===== Avatar Tokens =====
export interface AvatarTokens extends ComponentTokensBase {
  size?: SizeVariants<string>;
  fontSize?: SizeVariants<string>;
  borderRadius?: string;
  bg?: string;
  color?: string;
}

// ===== Separator Tokens =====
export interface SeparatorTokens extends ComponentTokensBase {
  color?: string;
  thickness?: string;
}

// ===== Breadcrumb Tokens =====
export interface BreadcrumbTokens extends ComponentTokensBase {
  fontSize?: string;
  color?: string;
  activeColor?: string;
  separatorColor?: string;
  gap?: string;
}

// ===== Code Tokens =====
export interface CodeTokens extends ComponentTokensBase {
  fontSize?: string;
  fontFamily?: string;
  bg?: string;
  color?: string;
  paddingX?: string;
  paddingY?: string;
  borderRadius?: string;
}

// ===== Kbd Tokens =====
export interface KbdTokens extends ComponentTokensBase {
  fontSize?: string;
  fontFamily?: string;
  bg?: string;
  color?: string;
  borderColor?: string;
  paddingX?: string;
  paddingY?: string;
  borderRadius?: string;
  shadow?: string;
}

// ===== Tag Tokens =====
export interface TagTokens extends ComponentTokensBase {
  paddingX?: SizeVariants<string>;
  paddingY?: SizeVariants<string>;
  fontSize?: SizeVariants<string>;
  fontWeight?: string;
  borderRadius?: string;
  gap?: string;
  variants?: Record<string, VariantConfig>;
}

// ===== Toast Tokens =====
export interface ToastTokens extends ComponentTokensBase {
  padding?: string;
  borderRadius?: string;
  shadow?: string;
  minWidth?: string;
  maxWidth?: string;
  titleFontWeight?: string;
  variants?: Record<string, VariantConfig>;
}

// ===== Scroll Area Tokens =====
export interface ScrollAreaTokens extends ComponentTokensBase {
  scrollbarWidth?: string;
  scrollbarBg?: string;
  thumbBg?: string;
  thumbHoverBg?: string;
  thumbBorderRadius?: string;
}

// ===== Container Tokens =====
export interface ContainerTokens extends ComponentTokensBase {
  maxWidth?: SizeVariants<string> & { xl?: string; "2xl"?: string };
  paddingX?: string;
}

// ===== Stack/Grid Tokens =====
export interface StackTokens extends ComponentTokensBase {
  gap?: SizeVariants<string>;
}

export interface GridTokens extends ComponentTokensBase {
  gap?: SizeVariants<string>;
}

// ===== Components Config =====
export interface ComponentsConfig {
  button?: ButtonTokens;
  input?: InputTokens;
  textarea?: TextareaTokens;
  card?: CardTokens;
  badge?: BadgeTokens;
  switch?: SwitchTokens;
  checkbox?: CheckboxTokens;
  radio?: RadioTokens;
  select?: SelectTokens;
  label?: LabelTokens;
  alert?: AlertTokens;
  tooltip?: TooltipTokens;
  progress?: ProgressTokens;
  skeleton?: SkeletonTokens;
  spinner?: SpinnerTokens;
  tabs?: TabsTokens;
  dialog?: DialogTokens;
  dropdownMenu?: DropdownMenuTokens;
  accordion?: AccordionTokens;
  table?: TableTokens;
  avatar?: AvatarTokens;
  separator?: SeparatorTokens;
  breadcrumb?: BreadcrumbTokens;
  code?: CodeTokens;
  kbd?: KbdTokens;
  tag?: TagTokens;
  toast?: ToastTokens;
  scrollArea?: ScrollAreaTokens;
  container?: ContainerTokens;
  stack?: StackTokens;
  grid?: GridTokens;
}

// ===== Color Token =====
export interface ColorValue {
  light: string;
  dark: string;
}

export interface ColorTokens {
  bg?: ColorValue;
  fg?: ColorValue;
  primary?: ColorValue;
  primaryFg?: ColorValue;
  secondary?: ColorValue;
  secondaryFg?: ColorValue;
  muted?: ColorValue;
  mutedFg?: ColorValue;
  danger?: ColorValue;
  dangerFg?: ColorValue;
  success?: ColorValue;
  successFg?: ColorValue;
  warning?: ColorValue;
  warningFg?: ColorValue;
  border?: ColorValue;
  ring?: ColorValue;
  [key: string]: ColorValue | undefined;
}

// ===== Breakpoints =====
export interface BreakpointsConfig {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

// ===== Custom CSS Injection =====
export interface CustomCSSConfig {
  before?: string;
  after?: string;
}

// ===== Main Config Interface =====
export interface CZeroConfig {
  // Global tokens
  color?: ColorTokens;
  radius?: Record<string, string>;
  shadow?: Record<string, string>;
  spacing?: Record<string, string>;
  typography?: {
    fontFamily?: string;
    size?: Record<string, string>;
    weight?: Record<string, string>;
    lineHeight?: Record<string, string>;
  };
  transition?: Record<string, string>;
  breakpoints?: BreakpointsConfig;

  // Component tokens
  components?: ComponentsConfig;

  // CSS injection
  customCSS?: CustomCSSConfig;
}
