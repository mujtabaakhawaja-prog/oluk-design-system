/* eslint-disable @next/next/no-img-element -- the OpenLab wordmark is a local authored asset. */

import type { ReactNode } from "react";
import type { CoreCustomerRouteKey } from "./site-route-map";
import { getCustomerRoute, openLabNavigation } from "./site-route-map";

export function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function Chevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path
        d="m7 4 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export type ActionLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  secondary?: boolean;
}>;

export function ActionLink({ href, children, secondary = false }: ActionLinkProps) {
  return (
    <a className={secondary ? "button button-secondary" : "button"} href={href}>
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export type SectionHeadingProps = Readonly<{
  eyebrow: string;
  title: string;
  copy?: string;
  action?: ReactNode;
}>;

export function SectionHeading({ eyebrow, title, copy, action }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
      {action ? <div className="section-heading-action">{action}</div> : null}
    </div>
  );
}

export type PageHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  copy: string;
  actions?: ReactNode;
}>;

export function PageHero({ eyebrow, title, copy, actions }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        {actions ? <div className="button-row">{actions}</div> : null}
      </div>
    </section>
  );
}

export type BreadcrumbItem = Readonly<{
  label: string;
  href?: string;
}>;

export function Breadcrumbs({ items }: Readonly<{ items: ReadonlyArray<BreadcrumbItem> }>) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function OpenLabNav({ active }: Readonly<{ active: CoreCustomerRouteKey }>) {
  return (
    <nav aria-label="OpenLab navigation" className="openlab-nav">
      <div className="shell">
        <a aria-label="OpenLab overview" className="openlab-wordmark" href="/open-lab">
          <img alt="" aria-hidden="true" src="/assets/evidence/openlab-atom.svg" />
          OPENLAB
        </a>
        <div>
          {openLabNavigation.map((route) => (
            <a
              aria-current={route.key === active ? "page" : undefined}
              href={route.path}
              key={route.key}
            >
              {route.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function RouteLink({ route, children }: Readonly<{ route: CoreCustomerRouteKey; children?: ReactNode }>) {
  const definition = getCustomerRoute(route);
  return <a href={definition.path}>{children ?? definition.label}</a>;
}
