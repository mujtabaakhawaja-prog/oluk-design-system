/*
 * Static Figma Make baseline. It demonstrates the current visual/component
 * relationships only: no routes, fetches, forms, callbacks, SDKs or authority.
 */
import React, { useState } from "react";

const C = {
  canvas: "#F7F9FD",
  plane: "#FFFFFF",
  ice: "#EEF4FF",
  border: "#CBDCF5",
  borderStrong: "#AFC8F3",
  ink: "#111827",
  muted: "#5B6983",
  cobalt: "#0057FF",
  inverse: "#111625",
};

const products = [
  {id:"mk",name:"MK-2866",alias:"Ostarine",series:"SARM SERIES",strength:"15 MG",servings:"90 SERVINGS",purity:">99%",price:"£43",image:"/assets/products/mk-2866/front.png"},
  {id:"rad",name:"RAD-140",alias:"Testolone",series:"SARM SERIES",strength:"8 MG",servings:"60 SERVINGS",purity:">99%",price:"£46",image:"/assets/products/rad-140/front.png"},
] as const;

const plane: React.CSSProperties = {background:C.plane,border:`1px solid ${C.border}`,borderRadius:24,boxShadow:"0 20px 54px rgba(42,72,125,.10)"};
const eyebrow: React.CSSProperties = {color:C.cobalt,fontSize:12,fontWeight:800,letterSpacing:".12em",textTransform:"uppercase"};
const button: React.CSSProperties = {minHeight:48,borderRadius:12,border:`1px solid ${C.cobalt}`,padding:"0 22px",fontWeight:800,fontSize:15};

function MetricRail({product}:{product:typeof products[number]}) {
  return <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",border:`1px solid ${C.borderStrong}`,borderRadius:16,overflow:"hidden"}}>
    {[["STRENGTH",product.strength],["SERVINGS",product.servings],["PURITY",product.purity]].map(([label,value],index)=><div key={label} style={{padding:"16px 12px",textAlign:"center",borderLeft:index?`1px solid ${C.borderStrong}`:0}}><strong style={{display:"block",color:C.cobalt,fontFamily:"Plus Jakarta Sans",fontSize:24}}>{value}</strong><span style={{fontSize:11,fontWeight:800,letterSpacing:".1em"}}>{label}</span></div>)}
  </div>;
}

function MediaChamber({product,compact=false}:{product:typeof products[number];compact?:boolean}) {
  return <div style={{background:"linear-gradient(135deg,#FBFDFF 0%,#E7EFFB 100%)",border:`1px solid ${C.border}`,borderRadius:compact?18:24,minHeight:compact?260:520,display:"grid",placeItems:"center",overflow:"hidden",padding:20}}>
    <img src={product.image} alt={`${product.name} ${product.alias} bottle`} style={{width:"auto",height:compact?230:470,maxWidth:"88%",objectFit:"contain",filter:"drop-shadow(0 26px 28px rgba(0,87,255,.18))"}}/>
  </div>;
}

function ProductCommerceCard({product}:{product:typeof products[number]}) {
  return <article style={{...plane,overflow:"hidden",display:"grid",gridTemplateColumns:"minmax(220px,.85fr) minmax(280px,1.15fr)"}}>
    <MediaChamber product={product} compact/>
    <div style={{padding:24,display:"grid",gap:16,alignContent:"center"}}>
      <div><span style={eyebrow}>{product.series}</span><h3 style={{fontFamily:"Plus Jakarta Sans",fontSize:30,margin:"8px 0 2px"}}>{product.name}</h3><p style={{color:C.muted,margin:0}}>{product.alias}</p></div>
      <MetricRail product={product}/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}><strong style={{color:C.cobalt,fontFamily:"Plus Jakarta Sans",fontSize:30}}>{product.price}</strong><button style={{...button,background:C.cobalt,color:"white"}}>Add to bag</button></div>
    </div>
  </article>;
}

function Header() {
  const trust = ["🚚 FREE UK DELIVERY OVER £50","✈ FREE INT'L DELIVERY £200+","⚗ THIRD-PARTY LAB VERIFIED","✓ JANOSHIK VALIDATED","▣ ENCRYPTED CHECKOUT"];
  return <header style={{...plane,maxWidth:1344,margin:"0 auto",borderRadius:18,overflow:"hidden",boxShadow:"none"}}>
    <div style={{display:"flex",justifyContent:"space-between",gap:18,padding:"10px 24px",fontSize:10,color:C.muted,fontWeight:800,flexWrap:"wrap"}}>{trust.map(item=><span key={item}>{item}</span>)}</div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:28,padding:"20px 28px",borderTop:`1px solid ${C.border}`}}>
      <div style={{display:"flex",alignItems:"center",gap:16}}><img src="/assets/brand/option-b/header-logo.png" alt="Olympus Labs UK" style={{width:214,height:58,objectFit:"contain"}}/><b style={{color:C.cobalt}}>////</b></div>
      <nav style={{display:"flex",gap:28,fontWeight:800,fontSize:13}}><span>SHOP</span><span>OPEN LAB</span><span>LEARN</span><span>WHOLESALE</span><span>ABOUT</span></nav>
      <button style={{...button,background:C.cobalt,color:"white",borderRadius:24}}>Bag · 0</button>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",padding:"10px 28px",borderTop:`1px solid ${C.border}`,color:C.muted,fontSize:11,fontWeight:800}}><span>Sign in</span><span>GBP £ · USD $ · EUR € &nbsp;&nbsp; Light</span></div>
  </header>;
}

export default function App() {
  const [selected,setSelected] = useState(0);
  const product = products[selected];
  return <main style={{background:C.canvas,color:C.ink,fontFamily:"Inter Variable, Inter, sans-serif",minHeight:"100vh",padding:"28px clamp(16px,4vw,56px) 0"}}>
    <Header/>
    <section style={{...plane,maxWidth:1344,margin:"28px auto",padding:28,display:"grid",gridTemplateColumns:"minmax(360px,.9fr) minmax(520px,1.35fr)",gap:28,background:"linear-gradient(115deg,#FFFFFF 0%,#F1F6FF 100%)"}}>
      <div style={{display:"grid",alignContent:"space-between",gap:30}}>
        <div><span style={eyebrow}>FORMULATED. VERIFIED. BATCH TRACKED.</span><h1 style={{fontFamily:"Plus Jakarta Sans",fontSize:"clamp(48px,5.5vw,78px)",letterSpacing:"-.055em",lineHeight:.98,margin:"18px 0 22px"}}>Formulated to a higher standard.</h1><p style={{color:C.muted,fontSize:18,lineHeight:1.55,maxWidth:560}}>Third-party tested products, clearly stated specifications and direct access to available lab records—before you choose.</p><div style={{display:"flex",gap:12,marginTop:26}}><button style={{...button,background:C.cobalt,color:"white"}}>Shop the range</button><button style={{...button,background:"white",color:C.ink}}>View lab records</button></div></div>
        <div style={{...plane,padding:22,boxShadow:"none"}}><span style={eyebrow}>FEATURED PRODUCT</span><div style={{display:"flex",justifyContent:"space-between",alignItems:"end",gap:16,margin:"8px 0 16px"}}><div><h2 style={{fontFamily:"Plus Jakarta Sans",fontSize:30,margin:0}}>{product.name}</h2><span style={{color:C.muted}}>{product.alias}</span></div><strong style={{fontFamily:"Plus Jakarta Sans",fontSize:30}}>{product.price}</strong></div><MetricRail product={product}/><div style={{display:"flex",gap:8,marginTop:16}}>{products.map((item,index)=><button key={item.id} onClick={()=>setSelected(index)} style={{...button,minHeight:44,flex:1,background:selected===index?C.ice:"white",color:selected===index?C.cobalt:C.muted}}>{item.name}</button>)}</div></div>
      </div>
      <div style={{position:"relative",minHeight:720,display:"grid",placeItems:"center",overflow:"hidden",borderRadius:24}}>
        {[0,1,2,3,4].map((slot)=>{const offset=slot-2; const active=offset===0; return <img key={slot} src={products[(selected+slot)%products.length].image} alt="" style={{position:"absolute",height:active?620:Math.abs(offset)===1?470:350,opacity:active?1:Math.abs(offset)===1?.55:.2,transform:`translateX(${offset*170}px) translateY(${active?0:45}px)`,filter:active?"drop-shadow(0 32px 34px rgba(0,87,255,.22))":"grayscale(.25)",transition:"all .35s ease",zIndex:active?3:2-Math.abs(offset),objectFit:"contain"}}/>})}
      </div>
    </section>

    <section style={{maxWidth:1344,margin:"64px auto",display:"grid",gap:24}}>
      <div><span style={eyebrow}>CANONICAL GROWTH MODULE</span><h2 style={{fontFamily:"Plus Jakarta Sans",fontSize:44,letterSpacing:"-.04em",margin:"10px 0"}}>Build Your Stack from the same product system.</h2><p style={{color:C.muted,maxWidth:720,lineHeight:1.6}}>The card, chamber, quantified rail, status and action anatomy stay canonical wherever the module mounts.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:20}}>{products.map(item=><ProductCommerceCard key={item.id} product={item}/>)}</div>
    </section>

    <section style={{...plane,maxWidth:1344,margin:"64px auto",padding:28,display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:24}}>
      <div><span style={eyebrow}>PAYMENT TRUST</span><h2 style={{fontFamily:"Plus Jakarta Sans",fontSize:38,letterSpacing:"-.04em"}}>One order value, carried clearly into payment.</h2><p style={{color:C.muted,lineHeight:1.65}}>Your selected shop currency stays clear through payment. The protected payment step carries the same order value into its fixed USD equivalent.</p></div>
      <div style={{background:C.ice,border:`1px solid ${C.borderStrong}`,borderRadius:18,padding:24,display:"grid",gap:16,alignContent:"center"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:20}}><strong style={{fontFamily:"Plus Jakarta Sans",fontSize:36}}>$175.01 <small>USD</small></strong><b style={{color:C.cobalt}}>=</b><strong style={{fontFamily:"Plus Jakarta Sans",fontSize:36,color:C.cobalt}}>£128.97 <small>GBP</small></strong></div><p style={{margin:0,color:C.muted}}>You are paying the USD equivalent of the displayed GBP amount.</p></div>
    </section>

    <footer style={{background:C.inverse,color:"white",margin:"72px calc(clamp(16px,4vw,56px) * -1) 0",padding:"48px clamp(16px,4vw,56px)"}}><div style={{maxWidth:1344,margin:"auto",display:"flex",justifyContent:"space-between",alignItems:"center",gap:24}}><img src="/assets/brand/option-b/footer-logo.svg" alt="Olympus Labs UK" style={{width:260,height:80,objectFit:"contain"}}/><span style={{color:"#AFC1E1"}}>Quality, made visible.</span></div></footer>
  </main>;
}
