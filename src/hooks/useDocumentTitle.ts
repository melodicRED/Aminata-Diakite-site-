import { useEffect } from 'react';
import { useLocation } from 'react-router';

const DOCUMENT_TITLE_PREFIX = 'Aminata Diakite Studio';

export function useDocumentTitle(pageTitle: string): void {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = pathname === '/'
      ? DOCUMENT_TITLE_PREFIX
      : `${DOCUMENT_TITLE_PREFIX} — ${pageTitle}`;
  }, [pathname, pageTitle]);
}
