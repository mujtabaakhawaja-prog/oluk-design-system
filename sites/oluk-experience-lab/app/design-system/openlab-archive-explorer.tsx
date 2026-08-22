"use client";

import { useMemo, useState } from "react";
import { EvidenceStatus } from "./product-status";
import styles from "./openlab-archive-explorer.module.css";

export type StagingArchiveRecord = Readonly<{ id: string; product: string; alias: string; batch: string; href: string }>;

export function OpenLabArchiveExplorer({ records }: Readonly<{ records: readonly StagingArchiveRecord[] }>) {
  const [query, setQuery] = useState("");
  const [unavailable, setUnavailable] = useState(false);
  const results = useMemo(() => records.filter((record) => `${record.product} ${record.alias} ${record.batch} ${record.id}`.toLowerCase().includes(query.toLowerCase())), [query, records]);
  return <div className={styles.explorer} data-component="OpenLabArchiveExplorer" data-copy-surface="technical" data-staging-fixture="true">
    <header><span>OPENLAB ARCHIVE</span><h2>Latest OpenLab records</h2><p>Search the configured staging registry by product, batch, or record reference.</p></header>
    <div className={styles.controls}><label htmlFor="archive-search">Search records<input id="archive-search" onChange={(event)=>{setQuery(event.target.value);setUnavailable(false);}} placeholder="Product, batch, or record" type="search" value={query}/></label><button aria-pressed={unavailable} onClick={()=>setUnavailable((value)=>!value)} type="button">{unavailable ? "Restore archive" : "Preview error state"}</button></div>
    {unavailable ? <div className={styles.state} role="status"><span>ARCHIVE UNAVAILABLE</span><h2>Records cannot be displayed right now.</h2><p>Try again without losing the current search context.</p></div> : results.length === 0 ? <div className={styles.state} role="status"><span>NO RESULTS</span><h2>No configured record matches “{query}”.</h2><p>Try a product name, batch, or record reference.</p></div> : <div className={styles.records}>{results.map((record)=><article key={record.id}><div><span>{record.id}</span><h2>{record.product}</h2><p>{record.alias} · Batch {record.batch}</p></div><EvidenceStatus state="verified"/><a href={record.href}>View record <b aria-hidden="true">→</b></a></article>)}</div>}
  </div>;
}
