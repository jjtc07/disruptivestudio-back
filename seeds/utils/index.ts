export function getRandomIndex<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length)
}

export function getRandomElement<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)]
}
