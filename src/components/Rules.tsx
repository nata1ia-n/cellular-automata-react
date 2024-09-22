import React, { Dispatch, SetStateAction } from "react";
import { ruleFromPatterns } from "../utils/calculate";

interface RulesProps {
  patterns: Record<number, number>;
  setPatternNumber: Dispatch<SetStateAction<number>>;
  setRulePatterns: Dispatch<SetStateAction<Record<number, number> | null>>;
}

const Rules: React.FC<RulesProps> = ({
  patterns,
  setPatternNumber,
  setRulePatterns,
}) => {
  const getRuleNumber = async (newPattern: Record<number, number>) => {
    const ruleNumber = ruleFromPatterns(newPattern);
    setPatternNumber(ruleNumber);
  };

  const handleCellClick = (ruleNumber: string, bit: number) => {
    console.log(`Pattern number: ${ruleNumber} Bit: ${bit}`);
    const updatedBit = bit === 1 ? 0 : 1;
    console.log(`Updated Bit: ${updatedBit}`);

    const ruleNumberInt = parseInt(ruleNumber, 10);

    const updatedPatterns: Record<number, number> = {
      ...patterns,
      [ruleNumberInt]: updatedBit,
    };
    setRulePatterns(updatedPatterns);
    getRuleNumber(updatedPatterns);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-xl w-full">
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(patterns).map(([ruleNumber, output]) => {
          const binaryRule = (+ruleNumber).toString(2).padStart(3, "0");
          const ruleCells = binaryRule
            .split("")
            .map((bit, index) => (
              <div
                key={`ruleCell-${index}`}
                className={`w-5 h-5 mr-1 ${
                  bit === "1" ? "bg-black" : "bg-white "
                } border border-gray-300`}
              />
            ));
          const outputCell = (
            <div
              key={`outputCell-${ruleNumber}`}
              className={`w-5 h-5 mr-1 ${
                output === 1 ? "bg-black" : "bg-white"
              } border border-gray-300 cursor-pointer`}
              onClick={() => handleCellClick(ruleNumber, output)}
            />
          );
          return (
            <div
              key={`ruleRow-${ruleNumber}`}
              className="flex flex-col items-center"
            >
              <div className="flex">{ruleCells}</div>
              <div className="mt-2">{outputCell}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rules;
