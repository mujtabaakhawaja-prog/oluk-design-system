/* eslint-disable @next/next/no-img-element -- exact Figma-exported brand and trust assets are served as immutable local files. */
"use client";

import { useEffect, useId, useRef, useState } from "react";

import { ContextualNavigation } from "./contextual-navigation";
import { ACCOUNT_NAVIGATION, NAVIGATION_TREE, type NavigationNode } from "./navigation-registry";
import { ProductCommerceCard } from "./product-commerce-card";
import { rad140Fixture } from "./product-fixtures";
import styles from "./site-header.module.css";
import { CurrencySelector, ThemeSelector } from "./staging-preferences";

const trustItems = [
  { icon: "/assets/icons/trust/delivery.svg", label: "Free UK delivery over £50" },
  { icon: "/assets/icons/trust/international.svg", label: "Free int'l delivery £200+" },
  { icon: "/assets/icons/trust/tested.svg", label: "Third-party tested" },
  { icon: "/assets/icons/trust/validated.svg", label: "Janoshik validated" },
  { icon: "/assets/icons/trust/encrypted.svg", label: "Encrypted checkout" },
] as const;

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.2 4.2"/></svg>;
}

function BagIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 8.5h12l-1 10H7l-1-10Z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg>;
}

function UserIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 19c.8-4 3-6 6.5-6s5.7 2 6.5 6"/></svg>;
}

function MegaMenu({ node, onNavigate }: Readonly<{ node: NavigationNode; onNavigate?: () => void }>) {
  if (!node.columns) return null;
  return (
    <div className={styles.megaPanel} data-panel={node.id} role="group">
      <div className={styles.megaColumns}>
        {node.columns.map((column) => (
          <div className={styles.megaColumn} key={column.heading}>
            <span>{column.heading}</span>
            {column.items.map((item) => <a href={item.href} key={item.id} onClick={onNavigate}><span><strong>{item.label}</strong>{item.detail ? <small>{item.detail}</small> : null}</span><b aria-hidden="true">→</b></a>)}
          </div>
        ))}
      </div>
      {node.featured?.kind === "product" ? (
        <div className={styles.megaFeaturedProduct}>
          <ProductCommerceCard className={styles.megaProductCard} product={rad140Fixture} variant="compact"/>
          <a href={node.featured.href} onClick={onNavigate}>{node.featured.action} <b aria-hidden="true">→</b></a>
        </div>
      ) : node.featured ? (
        <a className={styles.megaFeatured} href={node.featured.href} onClick={onNavigate}>
          <span>{node.featured.eyebrow}</span><strong>{node.featured.title}</strong><p>{node.featured.copy}</p><b>{node.featured.action} →</b>
        </a>
      ) : null}
    </div>
  );
}

export function SiteHeader({ route }: Readonly<{ route: string }>) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileTitleId = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setAccountOpen(false);
        setMobileOpen(false);
        setMobilePanel(null);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setAccountOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-mobile-navigation-open", mobileOpen);
    return () => document.documentElement.removeAttribute("data-mobile-navigation-open");
  }, [mobileOpen]);

  return (
    <header className={styles.header} data-component="OptionB-Premium-UtilityStack-V08" data-figma-node="1176:28930" ref={headerRef}>
      <div className={styles.trustRail}>
        <div className={`shell ${styles.trustInner}`}>
          {trustItems.map((item) => <span key={item.label}><img alt="" aria-hidden="true" decoding="async" height="16" src={item.icon} width="16"/>{item.label}</span>)}
        </div>
      </div>
      <div className={styles.navPlane}>
        <div className={`shell ${styles.navBar}`}>
          <a className={styles.logo} href="/" aria-label="Olympus Labs UK home"><span aria-hidden="true"/><img alt="Olympus Labs UK" decoding="async" height="448" src="/assets/brand/option-b/header-logo.png" width="1600"/></a>
          <nav aria-label="Primary navigation" className={`desktop-nav ${styles.desktopNav}`}>
            {NAVIGATION_TREE.map((node) => (
              <div className={styles.navItem} data-open={openMenu === node.id || undefined} key={node.id} onMouseEnter={() => node.columns && setOpenMenu(node.id)} onMouseLeave={() => node.columns && setOpenMenu(null)}>
                <a href={node.href}>{node.label.toUpperCase()}</a>
                {node.columns ? <button aria-expanded={openMenu === node.id} aria-label={`Open ${node.label} menu`} onClick={() => setOpenMenu((current) => current === node.id ? null : node.id)} type="button"><span aria-hidden="true">⌄</span></button> : null}
                <MegaMenu node={node}/>
              </div>
            ))}
          </nav>
          <div className={styles.actions}>
            <a className={styles.roundAction} href="/search" aria-label="Search"><SearchIcon/></a>
            <button aria-expanded={accountOpen} aria-label="Open account menu" className={styles.roundAction} onClick={() => setAccountOpen((value) => !value)} type="button"><UserIcon/></button>
            <a aria-label="Bag" className={styles.bagAction} href="/bag"><BagIcon/><span>Bag</span><b aria-label="0 items">0</b></a>
            {accountOpen ? <div className={styles.accountMenu}>{ACCOUNT_NAVIGATION.map((item) => <a href={item.href} key={item.id}>{item.label}<span aria-hidden="true">→</span></a>)}</div> : null}
          </div>
          <button aria-expanded={mobileOpen} aria-label="Open navigation" className={`mobile-menu ${styles.mobileTrigger}`} onClick={() => setMobileOpen(true)} type="button"><span/><span/><span/></button>
        </div>
      </div>
      <div className={styles.userRail}>
        <div className={`shell ${styles.userInner}`}>
          <a href="/account"><UserIcon/><span>Sign in</span></a>
          <div className={styles.preferenceControls}><span>Currency</span><CurrencySelector compact/><i aria-hidden="true"/><span>Appearance</span><ThemeSelector compact/></div>
        </div>
      </div>
      <ContextualNavigation route={route}/>
      {mobileOpen ? (
        <div aria-labelledby={mobileTitleId} aria-modal="true" className={styles.mobileSheet} role="dialog">
          <div className={styles.mobileHeader}><strong id={mobileTitleId}>{mobilePanel ? NAVIGATION_TREE.find((node) => node.id === mobilePanel)?.label : "Menu"}</strong><button onClick={() => mobilePanel ? setMobilePanel(null) : setMobileOpen(false)} type="button">{mobilePanel ? "← Back" : "✕ Close"}</button></div>
          {!mobilePanel ? (
            <nav aria-label="Mobile primary navigation" className={styles.mobileRoot}>
              {NAVIGATION_TREE.map((node) => node.columns ? <button key={node.id} onClick={() => setMobilePanel(node.id)} type="button"><span>{node.label.toUpperCase()}</span><b aria-hidden="true">›</b></button> : <a href={node.href} key={node.id}>{node.label.toUpperCase()}<b aria-hidden="true">→</b></a>)}
              <a href="/search">Search<b aria-hidden="true">→</b></a><a href="/bag">Bag · 0<b aria-hidden="true">→</b></a><a href="/account">Account<b aria-hidden="true">→</b></a>
              <div className={styles.mobilePreferences}><span>Currency</span><CurrencySelector/><span>Appearance preview</span><ThemeSelector/></div>
            </nav>
          ) : (
            <div className={styles.mobileSubpanel}>
              {NAVIGATION_TREE.find((node) => node.id === mobilePanel)?.columns?.map((column) => <div key={column.heading}><span>{column.heading}</span>{column.items.map((item) => <a href={item.href} key={item.id}>{item.label}<b aria-hidden="true">→</b></a>)}</div>)}
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
}
