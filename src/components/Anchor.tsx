import type { ReactNode } from 'react';
import { Link } from 'react-router';

/** Href used by the "back to top" arrow at the bottom of every page. */
const TOP_HREF = '#top';

type AnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function isInternalPath(href: string): boolean {
  // Guard against protocol-relative URLs like "//example.com".
  return href.startsWith('/') && !href.startsWith('//');
}

function scrollToTop(event: { preventDefault: () => void }): void {
  event.preventDefault();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}

export function Anchor({ href, children, className }: AnchorProps) {
  if (href === TOP_HREF) {
    return (
      <a href={TOP_HREF} className={className} onClick={scrollToTop}>
        {children}
      </a>
    );
  }

  if (isInternalPath(href)) {
    return <Link to={href} className={className}>{children}</Link>;
  }

  const isExternalUrl = href.startsWith('http') || href.startsWith('//');
  return (
    <a
      href={href}
      className={className}
      {...(isExternalUrl && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  );
}
