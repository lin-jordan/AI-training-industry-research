import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell not-found">
      <p className="eyebrow">404 · Outside the map</p>
      <h1>This route has not been researched.</h1>
      <p>The page may have moved, or the profile may not yet be part of the atlas.</p>
      <div className="hero-actions"><Link className="button-link" href="/">Return home</Link><Link className="button-link button-link--secondary" href="/search">Search the atlas</Link></div>
    </div>
  );
}
