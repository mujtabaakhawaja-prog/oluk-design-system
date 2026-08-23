/* eslint-disable @next/next/no-img-element -- transparent product fixtures require authored crop and alpha handling. */

import type { CSSProperties } from "react";
import type { ProductMediaContext } from "./commerce-types";
import { classes } from "./component-utils";
import type { ProductMediaAsset } from "./product-fixtures";
import styles from "./product-media-chamber.module.css";

type MediaCustomProperties = CSSProperties & {
  "--oluk-media-object-position-desktop": string;
  "--oluk-media-object-position-tablet": string;
  "--oluk-media-object-position-mobile": string;
  "--oluk-media-scale-desktop": number;
  "--oluk-media-scale-tablet": number;
  "--oluk-media-scale-mobile": number;
  "--oluk-media-translate-y-desktop": string;
  "--oluk-media-translate-y-tablet": string;
  "--oluk-media-translate-y-mobile": string;
};

export type ProductMediaChamberProps = Readonly<{
  media: ProductMediaAsset | null;
  context?: ProductMediaContext;
  alt?: string;
  className?: string;
  decorative?: boolean;
  priority?: boolean;
  sizes?: string;
}>;

const defaultSizes: Readonly<Record<ProductMediaContext, string>> = {
  card: "(max-width: 760px) calc(100vw - 32px), (max-width: 1180px) 50vw, 448px",
  compact: "108px",
  featured: "(max-width: 760px) calc(100vw - 32px), (max-width: 1180px) 50vw, 448px",
  relation: "(max-width: 760px) calc(100vw - 32px), 46vw",
  hero: "(max-width: 960px) calc(100vw - 44px), 42vw",
  dossier: "(max-width: 540px) calc(100vw - 56px), 34vw",
};

export function ProductMediaChamber({
  media,
  context = "card",
  alt,
  className,
  decorative = false,
  priority = false,
  sizes,
}: ProductMediaChamberProps) {
  const crop = media?.crops[context];
  const desktop = crop?.desktop ?? { objectPosition: "50% 50%", scale: 1, translateY: "0" };
  const tablet = crop?.tablet ?? desktop;
  const mobile = crop?.mobile ?? desktop;
  const customProperties: MediaCustomProperties = {
    "--oluk-media-object-position-desktop": desktop.objectPosition,
    "--oluk-media-object-position-tablet": tablet.objectPosition,
    "--oluk-media-object-position-mobile": mobile.objectPosition,
    "--oluk-media-scale-desktop": desktop.scale,
    "--oluk-media-scale-tablet": tablet.scale,
    "--oluk-media-scale-mobile": mobile.scale,
    "--oluk-media-translate-y-desktop": desktop.translateY,
    "--oluk-media-translate-y-tablet": tablet.translateY,
    "--oluk-media-translate-y-mobile": mobile.translateY,
    background: "var(--oluk-media-gradient, linear-gradient(70deg, #f8fbff 5%, #e4ecfa 100%))",
  };

  return (
    <div
      className={classes(styles.chamber, "oluk-product-media-chamber", className)}
      data-authored-layers="outer-gradient luminous-halo identity-pane contact-shelf product"
      data-context={context}
      data-media-authority={media?.authority ?? "unpopulated-governed-chamber"}
      data-media-id={media?.id ?? "unpopulated"}
      data-oluk-node="component.product-media-chamber"
      style={customProperties}
    >
      <span aria-hidden="true" className={classes(styles.halo, "oluk-product-media-chamber__halo")} />
      <span
        aria-hidden="true"
        className={classes(styles.identityPane, "oluk-product-media-chamber__identity-pane")}
      />
      <span
        aria-hidden="true"
        className={classes(styles.contactShelf, "oluk-product-media-chamber__contact-shelf")}
      />
      {media ? (
        <img
          alt={decorative ? "" : (alt ?? media.alt)}
          className={classes(styles.image, "oluk-product-media-chamber__image")}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          height={media.height}
          loading={priority ? "eager" : "lazy"}
          sizes={sizes ?? defaultSizes[context]}
          src={media.src}
          width={media.width}
        />
      ) : <span aria-hidden="true" className={styles.unpopulated} />}
    </div>
  );
}
