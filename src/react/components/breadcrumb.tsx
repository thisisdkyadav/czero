import * as React from "react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
}

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

export interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const BreadcrumbRoot = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className = "", ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={`cz-breadcrumb ${className}`} {...props} />
  )
);
BreadcrumbRoot.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className = "", ...props }, ref) => (
    <ol ref={ref} className={`cz-breadcrumb-list ${className}`} {...props} />
  )
);
BreadcrumbList.displayName = "Breadcrumb.List";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className = "", ...props }, ref) => (
    <li ref={ref} className={`cz-breadcrumb-item ${className}`} {...props} />
  )
);
BreadcrumbItem.displayName = "Breadcrumb.Item";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className = "", ...props }, ref) => (
    <a ref={ref} className={`cz-breadcrumb-link ${className}`} {...props} />
  )
);
BreadcrumbLink.displayName = "Breadcrumb.Link";

const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className = "", children, ...props }, ref) => (
    <span ref={ref} role="presentation" aria-hidden="true" className={`cz-breadcrumb-separator ${className}`} {...props}>
      {children || (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </span>
  )
);
BreadcrumbSeparator.displayName = "Breadcrumb.Separator";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className = "", ...props }, ref) => (
    <span ref={ref} role="link" aria-current="page" aria-disabled="true" className={`cz-breadcrumb-page ${className}`} {...props} />
  )
);
BreadcrumbPage.displayName = "Breadcrumb.Page";

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
  Page: BreadcrumbPage,
});
