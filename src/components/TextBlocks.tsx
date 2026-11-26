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
    ...(span.r !== undefined && { display: 'inline-block', transform: `rotate(${span.r}deg)` }),
  } as CSSProperties;
}

function Span({ span }: { span: TextSpan }) {
  // Spacer rows are empty spans carrying an oversized `s`; honouring it would
  // inflate the line box past the block's own line-height and push the
  // paragraph out of its declared design height (seen on the phone menu panel,
  // whose six spacer rows leaked onto the page below). Fall back to the
  // inherited size so the spacer is exactly one line-height tall.
  const style = span.t ? toSpanStyle(span) : { ...toSpanStyle(span), fontSize: undefined };
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
