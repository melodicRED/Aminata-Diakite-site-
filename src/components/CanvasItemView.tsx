import type { CSSProperties } from 'react';
import type { CanvasItem } from '../types/page';
import { cn } from '../utils/classNames';
import { Anchor } from './Anchor';
import { ItemContent } from './ItemContent';

type PhoneRect = [x: number, y: number, w: number, h: number];

function phoneRectOf(item: CanvasItem): PhoneRect {
  if (item.p === undefined) return [item.x, item.y, item.w, item.h];
  if (item.p === null) return [item.x, item.y, item.w, item.h];
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

  const content = <ItemContent item={item} />;
  const body = item.href
    ? <Anchor href={item.href} className="fill">{content}</Anchor>
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
