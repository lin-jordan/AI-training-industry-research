"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/foundations", label: "Foundations" },
  { href: "/companies", label: "Companies" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/glossary", label: "Glossary" },
  { href: "/news", label: "News" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="AI Training Atlas home">
          <span className="brand__mark" aria-hidden="true">AT</span>
          <span className="brand__text">AI Training Atlas</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="search-link" href="/search" aria-current={pathname === "/search" ? "page" : undefined}>
          <span aria-hidden="true">⌕</span> Search
        </Link>

        <details className="mobile-nav" key={pathname}>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" aria-current={pathname === "/search" ? "page" : undefined}>Search</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
