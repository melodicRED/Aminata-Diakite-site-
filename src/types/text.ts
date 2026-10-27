// JSON keys are intentionally short: all 18 pages are inlined into the bundle,
// so compact field names shave noticeable kilobytes. Each field is documented below.

export type TextSpan = {
  /** text content */
  t: string;
  /** font family */
  f?: 'sans' | 'serif';
  /** font weight */
  w?: number;
  /** font size, in design units */
  s: number;
  /** color (hex) */
  c?: string;
  /** italic */
  i?: boolean;
  /** letter-spacing, in design units */
  l?: number;
  /** link href */
  h?: string;
  /** underline */
  u?: boolean;
  /** color on hover */
  hc?: string;
};

export type TextBlock = {
  /** spans making up this paragraph */
  sp: TextSpan[];
  /** line-height, in design units */
  lh?: number;
  /** text-align (accepts raw CSS value or legacy "align-xxx") */
  a?: string;
  /** padding, in design units: 1–4 numbers like CSS shorthand */
  p?: number[];
};
