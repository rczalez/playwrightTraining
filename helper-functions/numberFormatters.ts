export function removeDollarAndComma(value: string): string {
  return value.replace(/[$,]/g, '')
}