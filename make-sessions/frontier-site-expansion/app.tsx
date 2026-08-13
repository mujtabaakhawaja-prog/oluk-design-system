/*
 * Static Make baseline. This is intentionally disposable reference code:
 * no routes, fetches, forms, callbacks, SDKs or runtime data ownership.
 */
import React from "react";

const product = { name: "MK-2866", alias: "Ostarine", dose: "15 MG", servings: "90 SERVINGS", purity: ">99%", price: "£43", image: "/assets/products/mk-2866/front.png" };

export default function App() {
  return <main style={{background:"#F7F8FC",color:"#141827",fontFamily:"Inter Variable, sans-serif",minHeight:"100vh",padding:"48px clamp(16px,5vw,72px)"}}>
    <header style={{maxWidth:1344,margin:"auto",display:"flex",justifyContent:"space-between",gap:20,borderBottom:"2px solid #0057FF",paddingBottom:24}}><strong style={{fontFamily:"Plus Jakarta Sans",fontSize:20}}>OLYMPUS LABS UK</strong><span style={{fontSize:12,fontWeight:800,letterSpacing:".08em"}}>OPENLAB · SHOP · ACCOUNT</span></header>
    <section style={{maxWidth:1120,margin:"64px auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:32,alignItems:"center"}}>
      <div style={{background:"linear-gradient(70deg,#F8FBFF 5%,#E4ECFA 100%)",border:"1px solid #B4CAF0",borderRadius:24,minHeight:480,display:"grid",placeItems:"center",padding:28}}><img alt="MK-2866 finished product" src={product.image} style={{maxHeight:360,maxWidth:"80%",objectFit:"contain"}}/></div>
      <div><span style={{color:"#0057FF",fontSize:12,fontWeight:800,letterSpacing:".12em"}}>PRODUCT DECISION</span><h1 style={{fontFamily:"Plus Jakarta Sans",fontSize:"clamp(44px,7vw,76px)",letterSpacing:"-.06em",margin:"14px 0"}}>{product.name}</h1><p style={{fontFamily:"Plus Jakarta Sans",fontSize:24,fontWeight:800}}>{product.alias}</p><p style={{color:"#53617D",lineHeight:1.65}}>An information-led purchase composition that continues into product detail, evidence, related products and a compact mobile decision summary.</p><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,background:"#D4E0F2",border:"1px solid #D4E0F2",borderRadius:16,overflow:"hidden"}}>{[["STRENGTH",product.dose],["SERVINGS",product.servings],["PURITY",product.purity],["PRICE",product.price]].map(([label,value])=><div key={label} style={{background:"white",padding:16}}><small style={{color:"#64718A",fontWeight:800}}>{label}</small><strong style={{display:"block",marginTop:6}}>{value}</strong></div>)}</div><button style={{background:"#0057FF",border:0,borderRadius:12,color:"white",fontWeight:800,marginTop:22,minHeight:48,padding:"0 24px"}}>Add to bag</button></div>
    </section>
    <section style={{maxWidth:1120,margin:"auto",background:"white",border:"1px solid #CEDCF1",borderRadius:24,padding:28}}><span style={{color:"#0057FF",fontSize:12,fontWeight:800}}>OPENLAB SNAPSHOT</span><h2 style={{fontFamily:"Plus Jakarta Sans",fontSize:36,letterSpacing:"-.04em"}}>Third-Party Tested.</h2><p style={{color:"#53617D",lineHeight:1.65}}>Design the pathway as a calm, legible transition from product facts into record discovery. Preserve explicit states for verified, source-reported, source-only and unavailable.</p></section>
  </main>;
}
