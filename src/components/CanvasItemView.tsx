import type { CSSProperties } from 'react';
import type { CanvasItem } from '../types/page';
import { cn } from '../utils/classNames';
import { Anchor } from './Anchor';
import { ItemContent } from './ItemContent';

type PhoneRect = [x: number, y: number, w: number, h: number];

function phoneRectOf(item: CanvasItem): PhoneRect {
  // `item.p === null` means "hidden on phone" — the desktop rect is returned
  // only because CSS (.desktop-only) hides the element entirely.
  if (!item.p) return [item.x, item.y, item.w, item.h];
  const [x, y, w, h] = item.p;
  return [x, y, w, h];
}

type MenuButtonProps = {
  item: CanvasItem;
  isMenuOpen: boolean;
  onToggle: () => void;
};

export function MenuButton({ item, isMenuOpen, onToggle }: MenuButtonProps) {
  const [px, py, pw, ph] = phoneRectOf(item);
  return (
    <button
      type="button"
      className={cn('item', 'phone-only', 'menu-button', isMenuOpen && 'open')}
      style={{ '--px': px, '--py': py, '--pw': pw, '--ph': ph } as CSSProperties}
      aria-label="Menu"
      aria-expanded={isMenuOpen}
      onClick={onToggle}
    />
  );
}

type CanvasItemViewProps = {
  item: CanvasItem;
  isMenuOpen: boolean;
  isHoverTrigger: boolean;
  isRevealed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export function CanvasItemView({
  item,
  isMenuOpen,
  isHoverTrigger,
  isRevealed,
  onHoverStart,
  onHoverEnd,
}: CanvasItemViewProps) {
  const [px, py, pw, ph] = phoneRectOf(item);

  const className = cn(
    'item',
    `item-${item.t}`,
    item.p === null && 'desktop-only',
    item.po && 'phone-only',
    item.hover && 'reveal',
    item.hover && isRevealed && 'on',
    item.slide !== undefined && isMenuOpen && 'slid',
  );

  const style = {
    '--slide': item.slide,
    '--x': item.x, '--y': item.y, '--w': item.w, '--h': item.h,
    '--px': px, '--py': py, '--pw': pw, '--ph': ph,
  } as CSSProperties;

  // Avoid nesting <a> inside <a>: text items use per-span `h` for links;
  // wrapping the whole block with an Anchor would nest with those span links.
  const content = <ItemContent item={item} />;
  const canWrapInAnchor = item.href && item.t !== 'text';
  const body = canWrapInAnchor
    ? <Anchor href={item.href!} className="fill">{content}</Anchor>
    : content;

  return (
    <div
      className={className}
      style={style}
      {...(isHoverTrigger && {
        onMouseEnter: onHoverStart,
        onMouseLeave: onHoverEnd,
      })}
    >
      {body}
    </div>
  );
}
