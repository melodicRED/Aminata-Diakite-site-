/** Design unit → CSS length. 1 unit = 1px on the design canvas, scaled to viewport via --u. */
export const designUnits = (count: number) => `calc(${count} * var(--u))`;
