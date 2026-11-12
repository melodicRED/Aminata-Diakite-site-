import type { CSSProperties } from 'react';
import type { TextBlock, TextSpan } from '../types/text';
import { designUnits } from '../utils/designUnits';
import { Anchor } from './Anchor';

const VALID_TEXT_ALIGN = new Set(['left', 'right', 'center', 'justify', 'start', 'end']);

function parseTextAlign(raw: string | undefined): CSSProperties['textAlign'] {
  if (!raw) return undefined;
  const value = raw.replace('align-', '');
  return VALID_TEXT_ALIGN.has(value) ? (value as CSSProperties['textAlign']) : undefined;
}

function toParagraphStyle(block: TextBlock): CSSProperties {
  return {
    lineHeight: block.lh ? designUnits(block.lh) : undefined,
    textAlign: parseTextAlign(block.a),
    padding: block.p?.map(designUnits).join(' '),
  };
}

function toSpanStyle(span: TextSpan): CSSProperties {
  return {
    fontFamily: `var(--${span.f ?? 'sans'})`,
    fontWeight: span.w,
    fontSize: designUnits(span.s),
    fontStyle: span.i ? 'italic' : undefined,
    letterSpacing: span.l ? designUnits(span.l) : undefined,
    color: span.c,
    textDecoration: span.u ? 'underline' : undefined,
    ...(span.hc && { '--hover': span.hc }),
  } as CSSProperties;
}

function Span({ span }: { span: TextSpan }) {
  const style = toSpanStyle(span);
  // Preserve the line-box height when a span is intentionally empty (spacer rows).
  const text = span.t || ' ';
  if (span.h) {
    return (
      <Anchor href={span.h} className="link">
        <span style={style}>{text}</span>
      </Anchor>
    );
  }
  return <span style={style}>{text}</span>;
}

export function TextBlocks({ blocks }: { blocks: TextBlock[] }) {
  return blocks.map((block, blockIndex) => (
    <p key={blockIndex} style={toParagraphStyle(block)}>
      {block.sp.map((span, spanIndex) => (
        <Span key={spanIndex} span={span} />
      ))}
    </p>
  ));
}
