import { useState } from "react";
import "./App.css";
import CellularAutomatonCanvas from "./components/CellularAutomatonCanvas";
import Generations from "./components/Generations";
import InitialGeneration from "./components/InitialGeneration";
import Patterns from "./components/Patterns";
import Rules from "./components/Rules";
import "./index.css";
import {
  calculateGenerations,
  initialGeneration,
  patterns,
} from "./utils/calculate";
import { apiRequestBodySchema } from "./utils/types";

function App() {
  const [generations, setGenerations] = useState<number[][]>([]);
  const [patternNumber, setPatternNumber] = useState<number>(90);
  const [generationsNumber, setGenerationsNumber] = useState<number>(50);

  const [loading, setLoading] = useState<boolean>(false);

  const [patternError, setPatternError] = useState<string>("");
  const [generationsError, setGenerationsError] = useState<string>("");

  const [randomize, setRandomize] = useState<boolean>(false);

  const [rulePatterns, setRulePatterns] = useState<Record<
    number,
    number
  > | null>(null);

  const disableButton = loading || !!patternError || !!generationsError;

  const handleInitialGenerationChoice = (randomize: boolean) => {
    setRandomize(randomize);
  };

  const validatePatternNumber = (value: number) => {
    const validationResult = apiRequestBodySchema
      .partial()
      .pick({ pattern_number: true })
      .safeParse({ pattern_number: value });
    if (!validationResult.success) {
      setPatternError(validationResult.error.errors[0].message);
    } else {
      setPatternError("");
    }
  };

  const validateGenerationsNumber = (value: number) => {
    const validationResult = apiRequestBodySchema
      .partial()
      .pick({ generations_number: true })
      .safeParse({ generations_number: value });
    if (!validationResult.success) {
      setGenerationsError(validationResult.error.errors[0].message);
    } else {
      setGenerationsError("");
    }
  };

  const getPattern = (pattern: number) => {
    const rules = patterns(pattern);
    setRulePatterns(rules);
  };

  const generateResults = () => {
    validatePatternNumber(patternNumber);
    validateGenerationsNumber(generationsNumber);

    if (!patternError && !generationsError) {
      setLoading(true);
      const initialGen = initialGeneration(generationsNumber, randomize);
      const pattern = patterns(patternNumber);
      const allGenerations = calculateGenerations(
        initialGen,
        pattern,
        generationsNumber
      );
      setGenerations(allGenerations);
      setLoading(false);
    }
    getPattern(patternNumber);
  };
  return (
    <div className="flex flex-row items-center justify-center min-h-screen w-screen overflow-auto">
      <div className="flex flex-col gap-3 items-center w-full justify-center mt-1">
        <h1 className="text-xl text-center text-blue-600">
          Elementary Cellular Automata
        </h1>
        <form className="w-full max-w-xl">
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 md:mb-0 text-center">
              <Patterns
                setPatternNumber={setPatternNumber}
                patternNumber={patternNumber}
                patternError={patternError}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 text-center">
              <Generations
                setGenerationsNumber={setGenerationsNumber}
                generationsNumber={generationsNumber}
                generationsError={generationsError}
              />
            </div>
          </div>
        </form>
        <div className="flex w-full items-center justify-center max-w-xl">
          <div className="flex flex-col w-1/2 items-center justify-center">
            <InitialGeneration
              handleInitialGenerationChoice={handleInitialGenerationChoice}
              randomize={randomize}
            />
          </div>
          <div className="flex w-1/2 justify-center">
            <button
              onClick={generateResults}
              className={` ${
                disableButton ? "bg-gray-300 " : "bg-blue-500 hover:bg-blue-700"
              }  text-white font-bold py-3 px-5 rounded-full`}
              disabled={disableButton}
            >
              {loading ? "Loading..." : "Generate"}
            </button>
          </div>
        </div>
        {generations.length > 0 && rulePatterns && (
          <>
            <Rules
              patterns={rulePatterns}
              setPatternNumber={setPatternNumber}
              setRulePatterns={setRulePatterns}
            />
            <CellularAutomatonCanvas generations={generations} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
