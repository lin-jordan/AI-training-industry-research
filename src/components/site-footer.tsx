import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="eyebrow">AI Training Atlas</p>
          <p className="site-footer__statement">A sourced field guide to the systems, companies, and concepts shaping model development.</p>
        </div>
        <div className="site-footer__meta">
          <p>Research snapshot · 2026-07-12</p>
          <Link href="/foundations">Start with the lifecycle <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </footer>
  );
}
