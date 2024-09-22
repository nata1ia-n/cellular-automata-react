export function initialGeneration(
  size: number,
  randomize: boolean = false
): number[] {
  if (randomize) {
    return Array.from({ length: size }, () => (Math.random() < 0.5 ? 0 : 1));
  } else {
    const g = new Array(size).fill(0);
    g[Math.floor(size / 2)] = 1;
    return g;
  }
}

export function patterns(patternNumber: number): Record<number, number> {
  const rulesBinaryString = patternNumber.toString(2).padStart(8, "0");
  const result: Record<number, number> = {};

  Array.from({ length: 8 }).forEach((_, i) => {
    result[i] = parseInt(rulesBinaryString[7 - i], 10);
  });

  return result;
}

export function ruleFromPatterns(patterns: Record<number, number>): number {
  const rulesBinaryString = Array.from({ length: 8 }, (_, i) => patterns[7 - i])
    .map(String)
    .join("");
  return parseInt(rulesBinaryString, 2);
}

export function nextGeneration(
  currentGeneration: number[],
  patterns: Record<number, number>
): number[] {
  const newGeneration: number[] = [];

  for (let i = 0; i < currentGeneration.length; i++) {
    const left = i > 0 ? currentGeneration[i - 1] : 0;
    const center = currentGeneration[i];
    const right =
      i < currentGeneration.length - 1 ? currentGeneration[i + 1] : 0;
    const pattern = (left << 2) | (center << 1) | right;
    newGeneration.push(patterns[pattern]);
  }

  return newGeneration;
}

export function calculateGenerations(
  initialPattern: number[],
  patterns: Record<number, number>,
  numGenerations: number
): number[][] {
  let currentGeneration = [...initialPattern];
  const result: number[][] = [currentGeneration];

  for (let i = 0; i < numGenerations; i++) {
    currentGeneration = nextGeneration(currentGeneration, patterns);
    result.push(currentGeneration);
  }

  return result;
}
