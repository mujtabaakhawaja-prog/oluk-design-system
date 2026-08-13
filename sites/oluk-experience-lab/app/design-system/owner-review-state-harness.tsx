"use client";

import {
  type KeyboardEvent,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { MetricRail, QualitativeChips } from "./candidate-components";
import { mk2866Specimen } from "./contracts";
import styles from "./owner-review-state-harness.module.css";

type Availability = "ready" | "unavailable" | "out-of-stock";
type ReviewTab = "product" | "evidence" | "commerce";
type RecordFilter = "all" | "identity" | "purity";

const tabs = [
  { id: "product", label: "Product" },
  { id: "evidence", label: "Evidence" },
  { id: "commerce", label: "Commerce" },
] as const satisfies ReadonlyArray<{ id: ReviewTab; label: string }>;

const recordFilters = [
  { id: "all", label: "All records" },
  { id: "identity", label: "Identity" },
  { id: "purity", label: "Purity" },
] as const satisfies ReadonlyArray<{ id: RecordFilter; label: string }>;

const reviewRecords = [
  {
    id: "OL-MK2866-0526",
    type: "purity",
    label: "Purity record",
    method: "Chromatography",
    state: "Report available",
    detail: "Local review fixture for the record-reveal interaction. No analytical result is asserted here.",
  },
  {
    id: "OL-MK2866-0226",
    type: "identity",
    label: "Identity record",
    method: "Spectrometry",
    state: "Report available",
    detail: "Local review fixture for the evidence path. Runtime record ownership remains outside this surface.",
  },
] as const;

const availabilityOptions = [
  { id: "ready", label: "In stock" },
  { id: "unavailable", label: "Unavailable" },
  { id: "out-of-stock", label: "Out of stock" },
] as const satisfies ReadonlyArray<{ id: Availability; label: string }>;

function availabilityLabel(availability: Availability) {
  if (availability === "unavailable") return "UNAVAILABLE";
  if (availability === "out-of-stock") return "OUT OF STOCK";
  return "IN STOCK";
}

export function OwnerReviewStateHarness() {
  const product = mk2866Specimen.value;
  const harnessId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeTab, setActiveTab] = useState<ReviewTab>("product");
  const [quantity, setQuantity] = useState(1);
  const [availability, setAvailability] = useState<Availability>("ready");
  const [added, setAdded] = useState(false);
  const [query, setQuery] = useState("");
  const [recordFilter, setRecordFilter] = useState<RecordFilter>("all");
  const [revealedRecordId, setRevealedRecordId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState(
    "Local harness ready. No network or runtime service is connected.",
  );

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return reviewRecords.filter((record) => {
      const matchesFilter = recordFilter === "all" || record.type === recordFilter;
      const haystack = `${record.id} ${record.label} ${record.method} ${record.state}`.toLocaleLowerCase();
      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [query, recordFilter]);

  function selectTab(nextTab: ReviewTab, message = true) {
    setActiveTab(nextTab);
    if (message) {
      const label = tabs.find((tab) => tab.id === nextTab)?.label ?? nextTab;
      setAnnouncement(`${label} review tab selected.`);
    }
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    selectTab(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  }

  function changeQuantity(delta: number) {
    const nextQuantity = Math.min(9, Math.max(1, quantity + delta));
    setQuantity(nextQuantity);
    setAdded(false);
    setAnnouncement(`Local quantity changed to ${nextQuantity}.`);
  }

  function changeAvailability(nextAvailability: Availability) {
    setAvailability(nextAvailability);
    setAdded(false);
    setAnnouncement(`Local inventory specimen changed to ${availabilityLabel(nextAvailability)}.`);
  }

  function addLocally() {
    if (availability !== "ready") return;
    setAdded(true);
    setAnnouncement(
      `${product.name} marked added locally at quantity ${quantity}. No cart or backend was contacted.`,
    );
  }

  function toggleRecord(recordId: string) {
    const willReveal = revealedRecordId !== recordId;
    setRevealedRecordId(willReveal ? recordId : null);
    setAnnouncement(`${recordId} details ${willReveal ? "revealed" : "collapsed"}.`);
  }

  function resetHarness() {
    setActiveTab("product");
    setQuantity(1);
    setAvailability("ready");
    setAdded(false);
    setQuery("");
    setRecordFilter("all");
    setRevealedRecordId(null);
    setAnnouncement("All local review states reset. No runtime service was contacted.");
  }

  const actionLabel =
    availability === "unavailable"
      ? "Unavailable"
      : availability === "out-of-stock"
        ? "Out of stock"
        : added
          ? "Added locally"
          : "Add locally";

  return (
    <div
      className={styles.harness}
      data-owner-only="true"
      data-runtime-authority="none"
      data-network-authority="none"
    >
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>OWNER-ONLY · LOCAL STATE HARNESS</span>
          <h3>Exercise interaction contracts before runtime translation.</h3>
          <p>
            Every control below mutates in-memory review state only. There are no network,
            backend, cart, inventory, payment, telemetry or publication callbacks.
          </p>
        </div>
        <button className={styles.reset} type="button" onClick={resetHarness}>
          Reset local states
        </button>
      </header>

      <div className={styles.liveStatus} role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      <div className={styles.workspace}>
        <article className={styles.productCard} aria-labelledby={`${harnessId}-product-name`}>
          <div className={styles.media}>
            <Image
              src={product.image}
              alt={`${product.name} ${product.alias} bottle`}
              width={220}
              height={280}
              sizes="(max-width: 620px) 70vw, 220px"
            />
          </div>
          <div className={styles.productBody}>
            <div className={styles.identityRow}>
              <div>
                <span className={styles.series}>{product.series}</span>
                <h4 id={`${harnessId}-product-name`}>{product.name}</h4>
                <p>{product.alias}</p>
              </div>
              <span className={styles.inventory} data-inventory={availability}>
                <i aria-hidden="true" /> {availabilityLabel(availability)}
              </span>
            </div>
            <span className={styles.evidence}>OPENLAB VERIFIED</span>
            <MetricRail product={product} />
            <QualitativeChips />
            <div className={styles.priceRow}>
              <strong>{product.price}</strong>
              <span>SKU {product.sku}</span>
            </div>
          </div>
        </article>

        <div className={styles.controlPlane}>
          <div className={styles.tabList} role="tablist" aria-label="Owner review harness sections">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                id={`${harnessId}-${tab.id}-tab`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${harnessId}-${tab.id}-panel`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <section
            className={styles.tabPanel}
            id={`${harnessId}-product-panel`}
            role="tabpanel"
            aria-labelledby={`${harnessId}-product-tab`}
            hidden={activeTab !== "product"}
          >
            <h4>Locked product truth</h4>
            <dl className={styles.truthGrid}>
              <div><dt>Series</dt><dd>{product.series}</dd></div>
              <div><dt>Product</dt><dd>{product.name}</dd></div>
              <div><dt>Alias</dt><dd>{product.alias}</dd></div>
              <div><dt>SKU</dt><dd>{product.sku}</dd></div>
              <div><dt>Strength</dt><dd>{product.strength}</dd></div>
              <div><dt>Servings</dt><dd>{product.servings}</dd></div>
              <div><dt>Purity</dt><dd>{product.purity}</dd></div>
              <div><dt>Price</dt><dd>{product.price}</dd></div>
            </dl>
            <p className={styles.guardrail}>Fixture source: locked MK-2866 review truth. Runtime publication remains blocked.</p>
          </section>

          <section
            className={styles.tabPanel}
            id={`${harnessId}-evidence-panel`}
            role="tabpanel"
            aria-labelledby={`${harnessId}-evidence-tab`}
            hidden={activeTab !== "evidence"}
          >
            <div className={styles.filterHeading}>
              <div>
                <h4>Local record discovery</h4>
                <p>Search, filter and reveal deterministic review records.</p>
              </div>
              <label className={styles.search}>
                <span>Search review records</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setRevealedRecordId(null);
                    setAnnouncement(`Record search updated to ${event.target.value || "empty"}.`);
                  }}
                  placeholder="Record ID or method"
                />
              </label>
            </div>

            <fieldset className={styles.filterGroup}>
              <legend>Filter records by evidence type</legend>
              <div>
                {recordFilters.map((filter) => (
                  <label key={filter.id}>
                    <input
                      type="radio"
                      name={`${harnessId}-record-filter`}
                      value={filter.id}
                      checked={recordFilter === filter.id}
                      onChange={() => {
                        setRecordFilter(filter.id);
                        setRevealedRecordId(null);
                        setAnnouncement(`${filter.label} filter selected.`);
                      }}
                    />
                    <span>{filter.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <p className={styles.resultCount} aria-live="polite">
              {filteredRecords.length} local {filteredRecords.length === 1 ? "record" : "records"}
            </p>
            <div className={styles.recordList}>
              {filteredRecords.length ? filteredRecords.map((record) => {
                const isRevealed = revealedRecordId === record.id;
                const detailId = `${harnessId}-${record.id}-details`;
                return (
                  <article key={record.id}>
                    <div>
                      <span>{record.label}</span>
                      <strong>{record.id}</strong>
                      <small>{record.method} · {record.state}</small>
                    </div>
                    <button
                      type="button"
                      aria-expanded={isRevealed}
                      aria-controls={detailId}
                      onClick={() => toggleRecord(record.id)}
                    >
                      {isRevealed ? "Hide record details" : "Reveal record details"}
                    </button>
                    <p id={detailId} hidden={!isRevealed}>{record.detail}</p>
                  </article>
                );
              }) : (
                <div className={styles.emptyState} role="status">
                  <strong>No local records match.</strong>
                  <span>Change the search or evidence filter to continue the review.</span>
                </div>
              )}
            </div>
          </section>

          <section
            className={styles.tabPanel}
            id={`${harnessId}-commerce-panel`}
            role="tabpanel"
            aria-labelledby={`${harnessId}-commerce-tab`}
            hidden={activeTab !== "commerce"}
          >
            <h4>Local commerce states</h4>
            <p className={styles.panelIntro}>Quantity, added and inventory states stop at this browser component.</p>

            <fieldset className={styles.availabilityGroup}>
              <legend>Choose a local inventory specimen</legend>
              <div>
                {availabilityOptions.map((option) => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={`${harnessId}-availability`}
                      value={option.id}
                      checked={availability === option.id}
                      onChange={() => changeAvailability(option.id)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.quantityRow}>
              <div>
                <span>Quantity</span>
                <div className={styles.stepper} aria-label={`${product.name} local quantity`}>
                  <button
                    type="button"
                    aria-label={`Decrease ${product.name} quantity`}
                    disabled={quantity === 1}
                    onClick={() => changeQuantity(-1)}
                  >
                    −
                  </button>
                  <output aria-live="polite" aria-label={`${product.name} quantity`}>{quantity}</output>
                  <button
                    type="button"
                    aria-label={`Increase ${product.name} quantity`}
                    disabled={quantity === 9}
                    onClick={() => changeQuantity(1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <strong>{product.price}</strong>
            </div>

            <button
              className={styles.addButton}
              type="button"
              disabled={availability !== "ready"}
              data-added={added ? "true" : "false"}
              onClick={addLocally}
            >
              {actionLabel}
            </button>
            <dl className={styles.stateReceipt}>
              <div><dt>Quantity</dt><dd>{quantity}</dd></div>
              <div><dt>Inventory</dt><dd>{availabilityLabel(availability)}</dd></div>
              <div><dt>Added</dt><dd>{added ? "YES · LOCAL ONLY" : "NO"}</dd></div>
              <div><dt>Runtime callback</dt><dd>NONE</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
