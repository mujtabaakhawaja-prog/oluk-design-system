import { SHOP_FAMILY_OPTIONS } from "./shop-taxonomy";
import styles from "./catalogue-category-rail.module.css";

export function CatalogueCategoryRail() {
  return (
    <section className={styles.section} data-component="CatalogueCategoryCardFamily" data-copy-surface="commerce">
      <div className={`shell ${styles.grid}`}>
        {SHOP_FAMILY_OPTIONS.map((family, index) => (
          <a href={`/shop?family=${family.slug}`} key={family.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{family.label}</h2>
            <p>Explore this product family, then refine the range by goal, form, servings, and availability.</p>
            <b>Browse family <i aria-hidden="true">→</i></b>
          </a>
        ))}
      </div>
    </section>
  );
}

export function CatalogueStateSpecimens() {
  return <div className={styles.states} data-component="CatalogueStateSpecimens" data-copy-surface="commerce">
    <article data-state="loading"><span>LOADING</span><h3>Preparing the range.</h3><p>Product-card geometry remains stable while catalogue results are assembled.</p></article>
    <article data-state="populated"><span>POPULATED</span><h3>Complete product range.</h3><p>Canonical cards carry identity, media, metrics, price, and actions.</p></article>
    <article data-state="filtered"><span>FILTERED</span><h3>Focused results.</h3><p>The active filter summary remains visible and every filter can be cleared.</p></article>
    <article data-state="unavailable"><span>UNAVAILABLE</span><h3>Catalogue temporarily unavailable.</h3><p>The route preserves a designed customer-safe recovery state.</p></article>
  </div>;
}
