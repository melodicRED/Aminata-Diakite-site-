import type { ReactNode } from 'react';
import { Link } from 'react-router';

type AnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function Anchor({ href, children, className }: AnchorProps) {
  if (href.startsWith('/')) {
    return <Link to={href} className={className}>{children}</Link>;
  }

  const isExternalUrl = href.startsWith('http');
  return (
    <a
      href={href}
      className={className}
      {...(isExternalUrl && { target: '_blank', rel: 'noreferrer' })}
    >
      {children}
    </a>
  );
}
