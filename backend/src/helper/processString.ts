export function processString(data: string | string[]): string {
  if (Array.isArray(data)) {
    return data.join(", ").toUpperCase();
  } else {
    return data.toUpperCase();
  }
}
