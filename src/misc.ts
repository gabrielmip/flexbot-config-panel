export function splitTrim (text: string): Array<string> {
  return text.split('\n')
    .map((token) => token.trim());
}