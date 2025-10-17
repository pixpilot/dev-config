/**
 * Extracts entry point from an exports object entry
 */
export function extractEntryFromExportsObject(dotExport: unknown): string | null {
  if (typeof dotExport === 'string') {
    return dotExport;
  }
  if (typeof dotExport === 'object' && dotExport !== null) {
    const exportObj = dotExport as Record<string, unknown>;
    const entry = (exportObj['import'] ??
      exportObj['require'] ??
      exportObj['default']) as string | undefined;
    if (typeof entry === 'string' && entry.length > 0) {
      return entry;
    }
  }
  return null;
}
