export function StringFormatService(str: string, args: string[]): string {
  if (!args) {
    return str;
  }
  return str?.replace(/{(\d+)}/g, (match, index) => args[index] || "");
}
