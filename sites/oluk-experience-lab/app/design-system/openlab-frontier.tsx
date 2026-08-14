import Link from "next/link";
import { EvidenceStatusChip } from "./program-components";
import { YourStackBuilder } from "./your-stack-builder";
import styles from "./openlab-frontier.module.css";

export const openLabFrontierTools = ["evidence","compound-guide","stack-builder","dosing-calculator","cycle-planner","interaction-checker","research-papers","case-studies","glossary","lab-partner"] as const;
export type OpenLabFrontierTool = (typeof openLabFrontierTools)[number];

const compounds = [
  { name: "MK-2866", alias: "Ostarine", strength: "15 MG", family: "SARM SERIES", status: "verified-evidence" as const },
  { name: "RAD-140", alias: "Testolone", strength: "8 MG", family: "SARM SERIES", status: "source-reported" as const },
  { name: "MK-677", alias: "Ibutamoren", strength: "15 MG", family: "RESEARCH SERIES", status: "source-only" as const },
  { name: "MENT", alias: "Trestolone", strength: "20 MG", family: "PROHORMONE SERIES", status: "unavailable" as const },
];

const nav = [
  ["Evidence", "/open-lab/evidence"], ["Compound guide", "/open-lab/compound-guide"],
  ["Stack builder", "/open-lab/stack-builder"], ["Dose calculator", "/open-lab/dosing-calculator"],
  ["Cycle planner", "/open-lab/cycle-planner"], ["Interaction checker", "/open-lab/interaction-checker"],
  ["Research papers", "/open-lab/research-papers"], ["Case studies", "/open-lab/case-studies"],
  ["Glossary", "/open-lab/glossary"], ["Lab partner", "/open-lab/lab-partner"],
] as const;

function Header({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <header className={styles.hero}><div><span>{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div><div className={styles.heroMark} aria-hidden="true"><i/><i/><i/><b>OL</b></div></header>;
}

function ToolNav({ active }: { active: OpenLabFrontierTool }) {
  return <nav className={styles.toolNav} aria-label="OpenLab tools">{nav.map(([label,href])=><Link aria-current={href.endsWith(active)?"page":undefined} href={href} key={href}>{label}</Link>)}</nav>;
}

function Workspace({ active, eyebrow, title, copy, children }: { active: OpenLabFrontierTool; eyebrow: string; title: string; copy: string; children: React.ReactNode }) {
  return <div className={styles.page}><Header eyebrow={eyebrow} title={title} copy={copy}/><div className={styles.workspace}><aside><strong>OPENLAB INDEX</strong><ToolNav active={active}/><div className={styles.railNote}><span>QUICK LINK</span><b>Records archive</b><Link href="/open-lab/records">Browse all records →</Link></div></aside><div className={styles.workspaceMain}>{children}</div></div></div>;
}

function EvidencePage() {
  const bars=[72,88,64,93,79,96,84,90,76,98,91,86];
  return <div className={styles.page}><Header eyebrow="OPENLAB · EVIDENCE CHARTS" title="See the record landscape at a glance." copy="A visual index of product evidence, report recency and compound coverage—built to move from signal to source without losing context."/><ToolNav active="evidence"/><section className={styles.dashboard}><article className={styles.chartCard}><div className={styles.cardHead}><div><span>PURITY TREND</span><h2>Recorded result series</h2></div><b>12 records</b></div><div className={styles.barChart} aria-label="Twelve record trend bars">{bars.map((height,index)=><i key={index} style={{height:`${height}%`}}><span>{index+1}</span></i>)}</div><div data-card-footer><span>Earlier records</span><span>Latest records</span></div></article><aside className={styles.signalGrid}>{[["4","Evidence states"],["16","Compound profiles"],["12","Recent records"],["98%","Registry coverage"]].map(([value,label])=><article key={label}><strong>{value}</strong><span>{label}</span></article>)}</aside></section><section className={styles.compoundRows}><div className={styles.sectionHead}><span>COMPOUND SIGNALS</span><h2>Coverage, separated by product.</h2></div>{compounds.map((compound,index)=><article key={compound.name}><b>{String(index+1).padStart(2,"0")}</b><div><h3>{compound.name}</h3><p>{compound.alias} · {compound.family}</p></div><strong>{compound.strength}</strong><EvidenceStatusChip state={compound.status}/><Link href={`/open-lab/compound/${compound.name.toLowerCase()}`}>Explore →</Link></article>)}</section></div>;
}

function CompoundGuide() {
  return <div className={styles.page}><Header eyebrow="OPENLAB · COMPOUND GUIDE" title="Start with the compound. Understand the context." copy="A clear, navigable guide to compound families, product formats and the OpenLab records attached to each one."/><ToolNav active="compound-guide"/><section className={styles.guideIntro}><div><span>GUIDE 01</span><h2>Choose a family, then go deeper.</h2></div><p>Move between a plain-language overview, the matching product specification and its evidence record. The guide keeps commercial aliases and compound names visible together.</p></section><section className={styles.guideGrid}>{compounds.map((compound,index)=><article key={compound.name}><div className={styles.cardIndex}>{String(index+1).padStart(2,"0")}</div><span>{compound.family}</span><h2>{compound.name}</h2><p>{compound.alias}</p><dl><div><dt>Format</dt><dd>Capsules</dd></div><div><dt>Strength</dt><dd>{compound.strength}</dd></div></dl><EvidenceStatusChip state={compound.status}/><Link href="/open-lab/compare">Compare compound →</Link></article>)}</section><section className={styles.guideBand}><span>NOT SURE WHERE TO START?</span><h2>Compare by family, format and evidence path.</h2><Link href="/open-lab/compare">Open comparison tool →</Link></section></div>;
}

function StackBuilder() {
  return <YourStackBuilder host="standalone"/>;
}

function Calculator() {
  return <Workspace active="dosing-calculator" eyebrow="OPENLAB · DOSE CALCULATOR" title="Translate a product format into a clear schedule." copy="Turn strength, frequency and duration into an easy-to-read product schedule."><section className={styles.calcGrid}><article className={styles.formCard}><span>CALCULATION INPUT</span><h2>Plan the schedule</h2><label>Product<select defaultValue="mk"><option value="mk">MK-2866 · 15 MG</option><option>RAD-140 · 8 MG</option><option>MK-677 · 15 MG</option></select></label><label>Daily target<div className={styles.numberInput}><input defaultValue="15" inputMode="decimal"/><b>MG</b></div></label><label>Plan length<div className={styles.numberInput}><input defaultValue="8" inputMode="numeric"/><b>WEEKS</b></div></label><button type="button">Update schedule</button></article><article className={styles.resultCard}><span>8-WEEK VIEW</span><strong>56</strong><h2>scheduled days</h2><div className={styles.weekGrid}>{Array.from({length:8},(_,i)=><div key={i}><b>W{i+1}</b><span>{i<6?"15 MG daily":"Review"}</span></div>)}</div><div data-card-footer><span>Product total</span><b>840 MG</b></div></article></section></Workspace>;
}

function CyclePlanner() {
  return <Workspace active="cycle-planner" eyebrow="OPENLAB · CYCLE PLANNER" title="See the whole plan before day one." copy="Map the active phase, review points and restock window on one calm, readable timeline."><section className={styles.planner}><div className={styles.planHead}><div><span>ACTIVE PLAN</span><h2>MK-2866 · 8-week view</h2></div><button type="button">Edit plan</button></div><div className={styles.timeline} data-proof-allow-overflow>{Array.from({length:8},(_,i)=><article data-phase={i>5?"review":"active"} key={i}><span>WEEK {i+1}</span><b>{i<6?"Active":"Review"}</b><p>{i===3?"Mid-plan check-in":i===6?"Schedule review":"15 MG daily"}</p></article>)}</div><div className={styles.planSummary}><article><span>NEXT MILESTONE</span><h3>Mid-plan review</h3><p>Week 4 · Thursday</p></article><article><span>RESTOCK WINDOW</span><h3>Plan ahead</h3><p>Opens during week 6</p></article><article><span>PRODUCT PATH</span><h3>MK-2866</h3><Link href="/product/mk-2866">View product →</Link></article></div></section></Workspace>;
}

function InteractionChecker() {
  return <div className={styles.page}><Header eyebrow="OPENLAB · INTERACTION CHECKER" title="Compare two compounds before combining them." copy="Select a pair and review shared pathways, practical considerations and the sources attached to each product."/><ToolNav active="interaction-checker"/><section className={styles.checker}><div className={styles.pair}><label>First compound<select defaultValue="mk"><option value="mk">MK-2866 · Ostarine</option></select></label><span>+</span><label>Second compound<select defaultValue="gw"><option value="gw">GW-50156 · Cardarine</option></select></label><button type="button">Check combination</button></div><div className={styles.checkResult}><header><span>PAIR REVIEW</span><h2>Ostarine + Cardarine</h2><b>Common recomp pairing</b></header><div className={styles.checkColumns}><article><span>SHARED CONTEXT</span><h3>Keep both product roles distinct.</h3><p>One product anchors the composition while the second supports the selected goal. Review each specification separately.</p></article><article><span>PLAN VIEW</span><h3>Build the timeline before purchase.</h3><p>Use the cycle planner to see both products across the same eight-week horizon.</p></article><article><span>EVIDENCE VIEW</span><h3>Open both records.</h3><p>Compare each compound’s source path without blending the underlying record details.</p></article></div><div data-card-footer><Link href="/open-lab/cycle-planner">Open cycle planner →</Link><Link href="/open-lab/compare">Compare products →</Link></div></div></section></div>;
}

function ResearchPapers() {
  const papers=[["01","Selective androgen receptor modulators","A structured reading list on receptor selectivity, model design and compound classification."],["02","Metabolic pathway research","Studies covering energy expenditure, endurance models and metabolic signalling."],["03","Growth-hormone secretagogues","A collection centred on ghrelin signalling, sleep and endocrine research models."],["04","Analytical methods","Reference material on chromatography, mass spectrometry and quantitative analysis."]];
  return <div className={styles.page}><Header eyebrow="OPENLAB · RESEARCH PAPERS" title="A calmer way into the literature." copy="Browse papers by compound family, research theme and method—without losing the link back to the relevant product and OpenLab record."/><ToolNav active="research-papers"/><section className={styles.paperTools}><label>Search the library<input placeholder="Search compound, topic or method" type="search"/></label><div>{["All papers","SARMs","Metabolics","Methods"].map((x,i)=><button className={i===0?styles.selected:undefined} key={x} type="button">{x}</button>)}</div></section><section className={styles.paperGrid}>{papers.map(([index,title,copy])=><article key={index}><b>{index}</b><span>READING COLLECTION</span><h2>{title}</h2><p>{copy}</p><div data-card-footer><small>6 papers · 24 min overview</small><button type="button">Open collection →</button></div></article>)}</section></div>;
}

function CaseStudies() {
  return <Workspace active="case-studies" eyebrow="OPENLAB · CASE STUDIES" title="Follow the evidence journey from product to record." copy="Long-form product stories that connect specification, batch identity, analytical results and the customer decision."><section className={styles.featureCase}><div><span>FEATURED CASE · 01</span><h2>MK-2866: one product, one connected record.</h2><p>See how product identity, strength, servings, source documents and related laboratory context stay connected through every stage of the experience.</p><Link href="/open-lab/dossier/mk-2866">Read the case study →</Link></div><div className={styles.caseDiagram}><b>PRODUCT</b><i/><b>BATCH</b><i/><b>REPORT</b><i/><b>OPENLAB</b></div></section><section className={styles.caseGrid}>{["Reading a compound dossier","From source report to customer view","Designing a fail-closed lookup","Comparing evidence without flattening it"].map((title,index)=><article key={title}><span>CASE {String(index+2).padStart(2,"0")}</span><h3>{title}</h3><p>A concise walkthrough of the decisions, interfaces and evidence path.</p><button type="button">Read story →</button></article>)}</section></Workspace>;
}

function Glossary() {
  const terms=[["Analyte","The compound or substance being measured in an analytical procedure."],["Batch","A production reference used to connect a finished product to its record."],["Chromatogram","A plotted output showing detector response over the course of a separation."],["Dossier","The joined product, specification, source and record history for one compound."],["HPLC","High-performance liquid chromatography, a separation method used in analytical work."],["Purity","The proportion of the target material represented in a stated analytical result."]];
  return <Workspace active="glossary" eyebrow="OPENLAB · GLOSSARY" title="The language of product evidence, made readable." copy="Explore the terms used across records, reports, compound dossiers and analytical methods."><section className={styles.glossaryTools}><label>Find a term<input placeholder="Search the glossary" type="search"/></label><nav aria-label="Glossary alphabet">{"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter=><a href={`#glossary-${letter}`} key={letter}>{letter}</a>)}</nav></section><section className={styles.termList} id="glossary-A">{terms.map(([term,copy])=><article key={term}><b>{term[0]}</b><div><h2>{term}</h2><p>{copy}</p></div><Link href="/open-lab/methodology">See in methodology →</Link></article>)}</section></Workspace>;
}

function LabPartner() {
  return <div className={styles.page}><Header eyebrow="OPENLAB · LAB PARTNER" title="Bring independent analytical work into one connected experience." copy="For laboratories that want clearer report delivery, stronger product linkage and evidence customers can understand."/><ToolNav active="lab-partner"/><section className={styles.partnerIntro}><div><span>PARTNER WITH OPENLAB</span><h2>From completed analysis to a useful customer record.</h2><p>OpenLab connects the report, the product and the customer journey while keeping laboratory identity visible.</p><button type="button">Start a conversation</button></div><aside><b>01</b><span>REPORT INTAKE</span><b>02</b><span>RECORD MAPPING</span><b>03</b><span>CUSTOMER VIEW</span></aside></section><section className={styles.partnerGrid}>{[["Structured intake","Deliver reports and supporting files through one repeatable path."],["Visible provenance","Keep laboratory identity and source actions attached to the record."],["Product connection","Link analysis to the exact product, format and batch identity."],["Reusable delivery","Support archive, dossier, report viewer and product evidence surfaces."]].map(([title,copy],i)=><article key={title}><b>0{i+1}</b><h3>{title}</h3><p>{copy}</p></article>)}</section><section className={styles.partnerCta}><span>OPENLAB PARTNERS</span><h2>Build a better report journey.</h2><p>Make analytical work easier for customers to find, understand and revisit.</p><button type="button">Explore partnership</button></section></div>;
}

export function CoaViewer({ id }: { id: string }) {
  return <div className={styles.page}><Header eyebrow="OPENLAB · CERTIFICATE VIEWER" title="Certificate of analysis." copy="A full-height document experience with report identity, analytical overview and source actions kept in one place."/><section className={styles.documentShell}><aside><span>REPORT ID</span><h2>{id.toUpperCase()}</h2><dl><div><dt>Product</dt><dd>MK-2866</dd></div><div><dt>Batch</dt><dd>OL2201</dd></div><div><dt>Laboratory</dt><dd>Janoshik</dd></div><div><dt>Prepared</dt><dd>16 April 2023</dd></div></dl><button type="button">Download report</button><Link href="/open-lab/records">Back to records →</Link></aside><article className={styles.document}><header><div><span>OLYMPUS LABS UK</span><h2>Analytical report</h2></div><b>OPENLAB</b></header><section><span>SAMPLE IDENTITY</span><h3>MK-2866 · Ostarine</h3><p>Finished product record · 15 MG · 90 SERVINGS</p></section><section><span>RESULT OVERVIEW</span><div className={styles.reportMetrics}><div><b>&gt;99%</b><small>Raw material assay</small></div><div><b>16.02 MG</b><small>Capsule concentration</small></div><div><b>OL2201</b><small>Batch identity</small></div></div></section><section><span>ANALYTICAL SUMMARY</span><table><thead><tr><th>Analysis</th><th>Method</th><th>Reported result</th></tr></thead><tbody><tr><td>Raw material purity</td><td>HPLC-MS</td><td>&gt;99%</td></tr><tr><td>Capsule concentration</td><td>HPLC-DAD</td><td>16.02 MG</td></tr><tr><td>Compound identity</td><td>GC-MS</td><td>Positively identified</td></tr></tbody></table></section><div data-card-footer><span>Olympus Labs UK OpenLab</span><span>Report {id.toUpperCase()}</span></div></article></section></div>;
}

export function OpenLabFrontierPage({ tool }: { tool: OpenLabFrontierTool }) {
  if(tool==="evidence") return <EvidencePage/>;
  if(tool==="compound-guide") return <CompoundGuide/>;
  if(tool==="stack-builder") return <StackBuilder/>;
  if(tool==="dosing-calculator") return <Calculator/>;
  if(tool==="cycle-planner") return <CyclePlanner/>;
  if(tool==="interaction-checker") return <InteractionChecker/>;
  if(tool==="research-papers") return <ResearchPapers/>;
  if(tool==="case-studies") return <CaseStudies/>;
  if(tool==="glossary") return <Glossary/>;
  return <LabPartner/>;
}
