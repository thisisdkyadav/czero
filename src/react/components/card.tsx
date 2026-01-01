import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", noPadding, ...props }, ref) => {
    const classes = [
      "cz-card",
      noPadding && "cz-card-no-padding",
      className,
    ].filter(Boolean).join(" ");

    return <div ref={ref} className={classes} {...props} />;
  }
);
CardRoot.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`cz-card-header ${className}`} {...props} />
));
CardHeader.displayName = "Card.Header";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h3 ref={ref} className={`cz-card-title ${className}`} {...props} />
));
CardTitle.displayName = "Card.Title";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p ref={ref} className={`cz-card-description ${className}`} {...props} />
));
CardDescription.displayName = "Card.Description";

const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`cz-card-body ${className}`} {...props} />
));
CardBody.displayName = "Card.Body";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`cz-card-footer ${className}`} {...props} />
));
CardFooter.displayName = "Card.Footer";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
