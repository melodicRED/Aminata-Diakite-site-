import type { CSSProperties } from 'react';
import type { TextBlock, TextSpan } from '../types/text';
import { designUnits } from '../utils/designUnits';
import { Anchor } from './Anchor';

function toParagraphStyle(block: TextBlock): CSSProperties {
  return {
    lineHeight: block.lh ? designUnits(block.lh) : undefined,
    textAlign: (block.a?.replace('align-', '') as CSSProperties['textAlign']) || undefined,
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
    ...(span.hc && { ['--hover' as string]: span.hc }),
  } as CSSProperties;
}

function Span({ span }: { span: TextSpan }) {
  const style = toSpanStyle(span);
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
