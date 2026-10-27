import { useEffect } from 'react';

export function useBodyBackground(color: string): void {
  useEffect(() => {
    const previous = document.body.style.background;
    document.body.style.background = color;
    return () => {
      document.body.style.background = previous;
    };
  }, [color]);
}
