import type { ReactNode } from 'react';
import { Link } from 'react-router';

type AnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function isInternalPath(href: string): boolean {
  // Guard against protocol-relative URLs like "//example.com".
  return href.startsWith('/') && !href.startsWith('//');
}

export function Anchor({ href, children, className }: AnchorProps) {
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
