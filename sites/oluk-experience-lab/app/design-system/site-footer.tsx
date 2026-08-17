/* eslint-disable @next/next/no-img-element -- the exact local footer logo is a governed candidate asset. */

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <div className="footer-lockup"><img alt="Olympus Labs UK" src="/assets/brand/option-b/footer-logo.svg" /></div>
          <p>Finished products, clear specifications and independently presented evidence.</p>
          <a href="/open-lab">Enter OpenLab <Arrow /></a>
        </div>
        <nav aria-label="Shop links" className="footer-links"><h3>Shop</h3><a href="/shop">Catalogue</a><a href="/product/mk-2866">MK-2866</a><a href="/reviews">Customer reviews</a></nav>
        <nav aria-label="OpenLab links" className="footer-links"><h3>OpenLab</h3><a href="/open-lab">Portal</a><a href="/lab-reports">Lab Records</a><a href="/open-lab/methodology">Methodology</a><a href="/open-lab/source-chain">Source chain</a></nav>
        <nav aria-label="Company links" className="footer-links"><h3>Company</h3><a href="/about">About</a><a href="/wholesale">Wholesale</a><a href="/account">Your account</a><a href="/about/evidence-os">EvidenceOS</a></nav>
        <nav aria-label="Help and legal links" className="footer-links"><h3>Help &amp; legal</h3><a href="/contact">Contact</a><a href="/delivery">Delivery</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>
      </div>
      <div className="shell footer-base"><span>© 2026 Olympus Labs UK</span><span>Quality, made visible.</span></div>
    </footer>
  );
}
