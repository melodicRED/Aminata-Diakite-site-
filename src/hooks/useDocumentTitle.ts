import { useEffect } from 'react';

const HOME_TITLE = 'Aminata Diakite';
const DOCUMENT_TITLE_PREFIX = 'Aminata Diakite Studio';

export function useDocumentTitle(pageTitle: string): void {
  useEffect(() => {
    document.title = pageTitle === HOME_TITLE
      ? DOCUMENT_TITLE_PREFIX
      : `${DOCUMENT_TITLE_PREFIX} — ${pageTitle}`;
  }, [pageTitle]);
}
