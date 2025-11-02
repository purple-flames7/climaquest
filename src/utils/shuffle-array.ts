export const shuffleArray = <T>(array: T[]): T[] => {
  const arr: T[] = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
