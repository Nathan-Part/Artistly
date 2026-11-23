/**
 * Returns the URL only if it uses the http: or https: protocol.
 * Anything else (javascript:, data:, malformed values...) returns null,
 * so links built from API data can't run scripts when clicked.
 */
export function safeHttpUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    const { protocol } = new URL(url.trim());
    return protocol === "http:" || protocol === "https:" ? url.trim() : null;
  } catch {
    return null;
  }
}
