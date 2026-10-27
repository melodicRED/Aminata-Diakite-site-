import type { TextBlock } from './text';

export type CanvasItemKind = 'img' | 'video' | 'embed' | 'text' | 'line' | 'rect' | 'icon';

export type CanvasItem = {
  id: string;
  /** item kind */
  t: CanvasItemKind;
  /** desktop position / size, in design units */
  x: number;
  y: number;
  w: number;
  h: number;
  /** phone position [x,y,w,h]. null = hidden on phone. undefined = same as desktop. */
  p?: number[] | null;
  /** 1 = shown on phone only */
  po?: 1;
  /** media filename (for img/video) or iframe URL (for embed) */
  src?: string;
  /** background / fill color */
  bg?: string;
  /** iframe title */
  title?: string;
  /** wraps the item in a link */
  href?: string;
  /** only visible while the item with this id is hovered */
  hover?: string;
  /** line thickness, in design units (for t=line) */
  lw?: number;
  /** border radius, in design units (for t=rect) */
  r?: number;
  /** desktop text blocks */
  b?: TextBlock[];
  /** phone text blocks, when they differ from desktop */
  pb?: TextBlock[];
  /** 1 = this item is the phone menu button */
  menu?: 1;
  /** when the phone menu is open, slide this item down by this many design units */
  slide?: number;
};

export type Page = {
  title: string;
  /** page background color */
  bg: string;
  /** desktop canvas height, in design units */
  h: number;
  /** phone canvas height, in design units */
  ph: number;
  items: CanvasItem[];
};
