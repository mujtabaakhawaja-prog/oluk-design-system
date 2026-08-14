import React, { useMemo, useState } from "react";
import data from "./product-data.json";

type Recommendation = (typeof data.recommendations)[number];

function StatusIcon({ type }: { type: "stock" | "evidence" }) {
  return type === "stock" ? (
    <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3h10v4l3 5-3 9H7l-3-9 3-5V3Z"/><path d="M8 13h8"/></svg>
  );
}

function MetricRail({ product }: { product: Recommendation }) {
  const values = [["Strength", product.strength], ["Servings", product.servings], ["Purity", product.purity]];
  return <div className="metrics">{values.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>;
}

function RecommendationCard({ product, selected, added, onSelect, onAdd }: {
  product: Recommendation; selected: boolean; added: boolean; onSelect: () => void; onAdd: () => void;
}) {
  return (
    <article className="card" data-selected={selected || undefined}>
      <button className="selectCard" onClick={onSelect} aria-pressed={selected} aria-label={`Select ${product.name}`}>
        <div className="chamber"><img alt={`${product.name} ${product.alias} bottle`} src={product.image}/></div>
        <div className="identity">
          <div><span>{product.series}</span><h3>{product.name}</h3><p>{product.alias}</p></div>
          <b className="selection">{selected ? "Selected" : "Select"}</b>
        </div>
      </button>
      <div className="content">
        <div className="statusRow"><span><StatusIcon type="stock"/>{product.inventory}</span><span><StatusIcon type="evidence"/>{product.evidence}</span></div>
        <MetricRail product={product}/>
        <p className="rationale">{product.rationale}</p>
        <div className="commerce"><strong>{product.price}</strong><div><a href={`#${product.id}`}>View product</a><button onClick={onAdd}>{added ? "Added ✓" : "Add to stack"}</button></div></div>
      </div>
    </article>
  );
}

export default function App() {
  const [selected, setSelected] = useState("rad-140");
  const [added, setAdded] = useState<string[]>([]);
  const count = useMemo(() => added.length, [added]);

  return (
    <main>
      <style>{styles}</style>
      <section className="anchor">
        <div><span>YOUR CURRENT PRODUCT</span><strong>{data.anchorProduct.name}</strong><p>{data.anchorProduct.alias} · {data.anchorProduct.strength} · {data.anchorProduct.servings}</p></div>
        <div><small>Stack selections</small><b>{count}</b></div>
      </section>
      <section className="intro"><span>YOUR STACK</span><h1>{data.heading}</h1><p>{data.introduction}</p></section>
      <section className="rail" aria-label="Product recommendations">
        {data.recommendations.map((product) => (
          <RecommendationCard
            key={product.id}
            product={product}
            selected={selected === product.id}
            added={added.includes(product.id)}
            onSelect={() => setSelected(product.id)}
            onAdd={() => setAdded((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])}
          />
        ))}
      </section>
      <section className="continue"><div><span>READY TO CONTINUE?</span><h2>Keep the product decision clear.</h2><p>Review your selections or return to the MK-2866 details before moving on.</p></div><button>Review stack · {count}</button></section>
    </main>
  );
}

const styles = `
  :root{font-family:Inter,system-ui,sans-serif;color:#111827;background:#f7f9fd;font-synthesis:none}*{box-sizing:border-box}body{margin:0;background:linear-gradient(135deg,#fbfdff 0%,#eef4ff 100%)}button,a{font:inherit}button{cursor:pointer}main{max-width:1440px;margin:auto;min-height:100vh;padding:52px clamp(24px,5vw,72px) 80px}.anchor,.continue{background:#fff;border:1px solid #cbdcf5;border-radius:22px;box-shadow:0 18px 46px rgba(42,72,125,.09);display:flex;align-items:center;justify-content:space-between;padding:22px 26px}.anchor span,.intro>span,.continue span{color:#0057ff;font-size:12px;font-weight:850;letter-spacing:.13em}.anchor strong{display:block;font:800 28px 'Plus Jakarta Sans',Inter,sans-serif;margin-top:6px}.anchor p,.intro p,.continue p{color:#5b6983;line-height:1.6;margin:4px 0 0}.anchor>div:last-child{text-align:center}.anchor small{color:#5b6983;display:block;font-size:12px;font-weight:700}.anchor b{color:#0057ff;font:800 34px 'Plus Jakarta Sans',Inter,sans-serif}.intro{max-width:820px;padding:74px 0 32px}.intro h1{font:800 clamp(44px,5vw,70px)/.98 'Plus Jakarta Sans',Inter,sans-serif;letter-spacing:-.055em;margin:14px 0 22px}.intro p{font-size:18px;max-width:700px}.rail{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{background:#fff;border:1px solid #bdd0f1;border-radius:26px;box-shadow:0 20px 54px rgba(42,72,125,.1);overflow:hidden;transition:transform .2s ease,box-shadow .2s ease}.card[data-selected]{box-shadow:0 28px 68px rgba(0,87,255,.18);transform:translateY(-8px)}.selectCard{background:transparent;border:0;color:inherit;padding:0;text-align:left;width:100%}.selectCard:focus-visible{outline:3px solid #0057ff;outline-offset:-4px}.chamber{background:linear-gradient(135deg,#fbfdff 0%,#e7effb 100%);border-bottom:1px solid #bdd0f1;display:grid;height:360px;place-items:center;overflow:hidden;padding:22px}.chamber img{filter:drop-shadow(0 28px 28px rgba(0,87,255,.18));height:320px;max-width:90%;object-fit:contain}.identity{align-items:flex-start;display:flex;gap:12px;justify-content:space-between;padding:22px 22px 18px}.identity span{color:#0057ff;font-size:11px;font-weight:850;letter-spacing:.12em}.identity h3{font:800 30px 'Plus Jakarta Sans',Inter,sans-serif;letter-spacing:-.035em;margin:7px 0 1px}.identity p{color:#5b6983;margin:0}.selection{background:#eef4ff;border-radius:999px;color:#0057ff;font-size:11px;padding:9px 12px;text-transform:uppercase}.content{border-top:2px solid transparent;padding:0 22px 24px}.statusRow{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}.statusRow span{align-items:center;border:1px solid #d4e0f2;border-radius:999px;color:#34425f;display:flex;font-size:11px;font-weight:800;gap:6px;min-height:34px;padding:5px 10px}.statusRow svg{fill:none;height:15px;stroke:#0057ff;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.7;width:15px}.metrics{border:1px solid #afc8f3;border-radius:14px;display:grid;grid-template-columns:repeat(3,1fr);overflow:hidden}.metrics div{padding:13px 7px;text-align:center}.metrics div+div{border-left:1px solid #afc8f3}.metrics strong{color:#0057ff;display:block;font:800 19px 'Plus Jakarta Sans',Inter,sans-serif;white-space:nowrap}.metrics span{font-size:10px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.rationale{color:#5b6983;font-size:14px;line-height:1.55;min-height:66px}.commerce{align-items:center;display:flex;gap:12px;justify-content:space-between}.commerce>strong{color:#0057ff;font:800 30px 'Plus Jakarta Sans',Inter,sans-serif}.commerce>div{display:flex;gap:8px}.commerce a,.commerce button,.continue button{align-items:center;border-radius:11px;display:flex;font-size:12px;font-weight:850;justify-content:center;min-height:46px;padding:0 14px}.commerce a{border:1px solid #afc8f3;color:#111827;text-decoration:none}.commerce button,.continue button{background:#0057ff;border:1px solid #0057ff;color:#fff}.continue{margin-top:44px}.continue h2{font:800 30px 'Plus Jakarta Sans',Inter,sans-serif;margin:7px 0 0}.continue button{font-size:14px;min-height:50px;padding-inline:22px}
  @media(max-width:760px){main{padding:20px 16px 46px}.anchor{padding:16px 18px}.anchor strong{font-size:22px}.anchor p{font-size:12px}.intro{padding:48px 4px 24px}.intro h1{font-size:42px}.intro p{font-size:16px}.rail{display:flex;gap:14px;margin-inline:-16px;overflow-x:auto;padding:10px 16px 26px;scroll-padding-left:16px;scroll-snap-type:x mandatory}.card{flex:0 0 calc(100vw - 44px);scroll-snap-align:start}.card[data-selected]{transform:translateY(-4px)}.chamber{height:288px}.chamber img{height:260px}.identity{padding:18px}.content{padding:0 18px 20px}.metrics strong{font-size:18px}.commerce{align-items:stretch;flex-direction:column}.commerce>div{display:grid;grid-template-columns:1fr 1.2fr}.commerce a,.commerce button{min-height:48px}.continue{align-items:stretch;flex-direction:column;gap:18px;margin-top:24px}.continue h2{font-size:26px}.continue button{width:100%}}
`;
