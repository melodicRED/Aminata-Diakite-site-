import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export function usePhoneMenu() {
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggle = () => setOpen((open) => !open);
  return { isOpen, toggle };
}
