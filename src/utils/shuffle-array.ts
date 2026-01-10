/**
 * Returns a new array with elements shuffled randomly.
 * Implements the Fisher–Yates (Knuth) shuffle algorithm.
 *
 * @param array - Array to shuffle
 * @returns New array with shuffled elements
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  // Copy array to avoid mutating the original
  const arr: T[] = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j: number = Math.floor(Math.random() * (i + 1));

    // Swap elements i and j
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
