import { useMemo, useState } from 'react';
import type { CanvasItem } from '../types/page';

export function useHoverTarget(items: CanvasItem[]) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const triggerIds = useMemo(
    () => new Set(items.flatMap((item) => (item.hover ? [item.hover] : []))),
    [items],
  );

  const isTrigger = (id: string) => triggerIds.has(id);
  const isRevealed = (hoverTargetId: string) => hoveredId === hoverTargetId;

  return { setHoveredId, isTrigger, isRevealed };
}
