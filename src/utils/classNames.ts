type ClassValue = string | boolean | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter((v): v is string => typeof v === 'string' && v.length > 0).join(' ');
}
