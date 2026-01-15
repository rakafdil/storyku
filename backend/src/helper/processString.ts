export function processString(data: string | string[]): string {
  if (Array.isArray(data)) {
    return data.join(", ");
  } else {
    return data;
  }
}
