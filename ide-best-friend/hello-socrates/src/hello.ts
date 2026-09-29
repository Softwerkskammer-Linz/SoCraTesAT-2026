export function hello(name?: string): string {
  if (!name || name.trim() === "") {
    return "Hello, SoCraTes!";
  }
  return `Hello, ${name.trim()}!`;
}
