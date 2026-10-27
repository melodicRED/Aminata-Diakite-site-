const mediaUrlsByPath = import.meta.glob<string>('../assets/media/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function resolveMediaUrl(filename: string): string | undefined {
  return mediaUrlsByPath[`../assets/media/${filename}`];
}
