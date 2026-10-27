import type { CanvasItem } from '../types/page';
import { designUnits } from '../utils/designUnits';
import { resolveMediaUrl } from '../utils/media';
import { TextBlocks } from './TextBlocks';

export function ItemContent({ item }: { item: CanvasItem }) {
  switch (item.t) {
    case 'img':
      return item.src
        ? <img src={resolveMediaUrl(item.src)} alt="" loading="lazy" decoding="async" />
        : <div className="fill" style={{ background: item.bg }} />;

    case 'video':
      return item.src
        ? <video src={resolveMediaUrl(item.src)} autoPlay muted loop playsInline />
        : null;

    case 'embed':
      return (
        <iframe
          src={item.src}
          title={item.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      );

    case 'line':
      return (
        <div
          className="rule"
          style={{
            borderTopColor: item.bg,
            borderTopWidth: designUnits(item.lw ?? 1),
          }}
        />
      );

    case 'rect':
      return (
        <div
          className="fill"
          style={{
            background: item.bg,
            borderRadius: item.r ? designUnits(item.r) : undefined,
          }}
        />
      );

    case 'text':
      if (!item.b) return null;
      if (item.pb) {
        return (
          <>
            <div className="desktop-only"><TextBlocks blocks={item.b} /></div>
            <div className="phone-only"><TextBlocks blocks={item.pb} /></div>
          </>
        );
      }
      return <TextBlocks blocks={item.b} />;

    case 'icon':
      return null;
  }
}
