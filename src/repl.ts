export function cleanInput(input: string): string[] {
    const result = input.trim().toLowerCase().split(/\s+/);
    return result;
}