export function splitTrim (text: string): string[] {
  return text.split('\n')
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}
