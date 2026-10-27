import type { CSSProperties } from 'react';
import { CanvasItemView, MenuButton } from './components/CanvasItemView';
import { useBodyBackground } from './hooks/useBodyBackground';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { useHoverTarget } from './hooks/useHoverTarget';
import { usePhoneMenu } from './hooks/usePhoneMenu';
import type { Page } from './types/page';

// Pages are laid out on a 1024px-wide design canvas (desktop) and a 325px-wide one (phone).
// CSS scales both to the viewport width — see styles.css.

export type { Page } from './types/page';

export default function Canvas({ page }: { page: Page }) {
  const { isOpen: isMenuOpen, toggle: toggleMenu } = usePhoneMenu();
  const hover = useHoverTarget(page.items);

  useDocumentTitle(page.title);
  useBodyBackground(page.bg);

  return (
    <main className="canvas" style={{ background: page.bg }}>
      <div
        className="stage"
        style={{ '--H': page.h, '--PH': page.ph } as CSSProperties}
      >
        {page.items.map((item) => {
          if (item.menu) {
            return (
              <MenuButton
                key={item.id}
                item={item}
                isMenuOpen={isMenuOpen}
                onToggle={toggleMenu}
              />
            );
          }

          return (
            <CanvasItemView
              key={item.id}
              item={item}
              isMenuOpen={isMenuOpen}
              isHoverTrigger={hover.isTrigger(item.id)}
              isRevealed={!!item.hover && hover.isRevealed(item.hover)}
              onHoverStart={() => hover.setHoveredId(item.id)}
              onHoverEnd={() => hover.setHoveredId(null)}
            />
          );
        })}
      </div>
    </main>
  );
}
