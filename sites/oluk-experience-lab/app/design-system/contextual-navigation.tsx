import { CheckoutStepIndicator } from "./program-components";
import { contextualNavigation } from "./navigation-registry";
import styles from "./site-header.module.css";

const checkoutStepByRoute = {
  bag: "information",
  checkout: "information",
  information: "information",
  delivery: "delivery",
  review: "review",
  payment: "payment",
  "payment-details": "payment",
  "payment-handoff": "payment",
  "order-pay": "payment",
  processing: "payment",
  pending: "payment",
  failure: "payment",
  retry: "payment",
  confirmation: "confirmation",
  tracking: "confirmation",
  "order-history": "confirmation",
  "order-details": "confirmation",
  receipt: "confirmation",
  return: "confirmation",
  refund: "confirmation",
  cancelled: "confirmation",
} as const;

function checkoutStep(route: string) {
  if (route in checkoutStepByRoute) return checkoutStepByRoute[route as keyof typeof checkoutStepByRoute];
  if (route.startsWith("checkout-")) {
    const key = route.slice("checkout-".length);
    if (key in checkoutStepByRoute) return checkoutStepByRoute[key as keyof typeof checkoutStepByRoute];
  }
  return null;
}

export function ContextualNavigation({ route }: Readonly<{ route: string }>) {
  const step = checkoutStep(route);
  if (step) {
    return <div className={styles.checkoutContext} data-component="CheckoutStepIndicator.Context"><div className="shell"><CheckoutStepIndicator current={step}/></div></div>;
  }

  const items = contextualNavigation(route);
  if (items.length === 0) return null;
  const product = route === "product" || route.startsWith("product-");
  const openLab = route.includes("openlab") || route === "records" || route === "record" || route === "dossier";
  return (
    <div className={styles.contextRail} data-component={product ? "ProductContextNav" : openLab ? "OpenLabContextNav" : "CommerceContextNav"} data-proof-allow-overflow="true">
      <nav aria-label={product ? "Product sections" : openLab ? "OpenLab sections" : "Shop categories"} className="shell">
        {product ? <span className={styles.contextIdentity}>Shop <b aria-hidden="true">/</b> Product</span> : null}
        {items.map((item, index) => <a href={item.href} key={item.href} data-primary={index === 0 || undefined}>{item.label}</a>)}
      </nav>
    </div>
  );
}
