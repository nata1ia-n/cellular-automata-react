import * as fc from "fast-check";
import {
  calculateGenerations,
  initialGeneration,
  nextGeneration,
  patterns,
  ruleFromPatterns,
} from "./calculate";

const initialGenerationOdd = [0, 0, 0, 1, 0, 0, 0];
const initialGenerationEven = [0, 0, 0, 0, 1, 0, 0, 0];
const pattern30 = {
  0: 0,
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 0,
  6: 0,
  7: 0,
};

describe("initial generation", () => {
  it("shuld calculate the odd generation", () => {
    const generationNumber = 7;
    const expected = initialGenerationOdd;
    expect(initialGeneration(generationNumber)).toEqual(expected);
  });
  it("shuld calculate the even generation", () => {
    const generationNumber = 8;
    const expected = initialGenerationEven;
    expect(initialGeneration(generationNumber)).toEqual(expected);
  });
  it("should generate an initial generation of the correct size", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (size) => {
        const result = initialGeneration(size);
        return (
          result.length === size &&
          result.filter((v) => v === 0 || v === 1).length === size
        );
      })
    );
  });
});

describe("rules and patterns", () => {
  it("should return the correct pattern from rule", () => {
    const ruleNumber = 30;
    const expected = pattern30;
    expect(patterns(ruleNumber)).toEqual(expected);
  });

  it("should return the correct rule from pattern", () => {
    const expected = 30;
    expect(ruleFromPatterns(pattern30)).toEqual(expected);
  });
  it("should correctly convert a pattern to a rule and back", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 255 }), (ruleNumber) => {
        const pattern = patterns(ruleNumber);
        return ruleFromPatterns(pattern) === ruleNumber;
      })
    );
  });
});

describe("generationa", () => {
  it("should calculate the next generation", () => {
    const currentGeneration = initialGenerationOdd;
    const expected = [0, 0, 1, 1, 1, 0, 0];
    expect(nextGeneration(currentGeneration, pattern30)).toEqual(expected);
  });

  it("should calculate all generations", () => {
    const initialPattern = initialGenerationOdd;
    const generationsNumber = 2;
    const expected = [
      [0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 1, 0],
    ];
    expect(
      calculateGenerations(initialPattern, pattern30, generationsNumber)
    ).toEqual(expected);
  });

  it("should generate consistent results with multiple generations", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: 1 }), {
          minLength: 1,
          maxLength: 20,
        }),
        fc.integer({ min: 1, max: 10 }),
        (initialPattern, generationsNumber) => {
          const result = calculateGenerations(
            initialPattern,
            pattern30,
            generationsNumber
          );
          return (
            result.length === generationsNumber + 1 &&
            result.every((gen) => gen.length === initialPattern.length)
          );
        }
      )
    );
  });

  it("should calculate the next generation correctly for diverse patterns", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 0, max: 1 }), {
          minLength: 1,
          maxLength: 20,
        }),
        fc.integer({ min: 0, max: 255 }),
        (currentGeneration, ruleNumber) => {
          const pattern = patterns(ruleNumber);
          const nextGen = nextGeneration(currentGeneration, pattern);
          return nextGen.length === currentGeneration.length;
        }
      )
    );
  });
});
