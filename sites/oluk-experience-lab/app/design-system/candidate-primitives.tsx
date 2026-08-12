import type { ReactNode } from "react";

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function OlukCanvas({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={classes("oluk-canvas", className)}>{children}</div>;
}

export function OlukSection({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return <section className={classes("oluk-section", className)} id={id}>{children}</section>;
}

export function OlukSurface({ children, className }: { children: ReactNode; className?: string }) {
  return <article className={classes("oluk-surface", className)}>{children}</article>;
}

export function OlukCard({
  children,
  className,
  component,
  density,
  id,
  label,
  state,
}: {
  children: ReactNode;
  className?: string;
  component?: string;
  density: "compact" | "vertical" | "featured" | "horizontal" | "purchase";
  id?: string;
  label?: string;
  state?: string;
}) {
  return (
    <article
      aria-label={label}
      className={classes("oluk-card", `oluk-card--${density}`, className)}
      data-candidate-component={component}
      data-state={state}
      id={id}
    >
      {children}
    </article>
  );
}

export function OlukMediaChamber({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={classes("oluk-media-chamber", className)}>{children}</div>;
}

export function OlukPurchasePlane({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={classes("oluk-purchase-plane", className)}>{children}</div>;
}

export function OlukDivider({ className }: { className?: string }) {
  return <div aria-hidden="true" className={classes("oluk-divider", className)} />;
}

export function OlukCanvasSplit({
  children,
  className,
  component,
  id,
}: {
  children: ReactNode;
  className?: string;
  component?: string;
  id?: string;
}) {
  return (
    <article className={classes("oluk-canvas-split", className)} data-candidate-component={component} id={id}>
      {children}
    </article>
  );
}
