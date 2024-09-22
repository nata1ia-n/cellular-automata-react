import React from "react";

interface Props {
  handleInitialGenerationChoice: (randomize: boolean) => void;
  randomize: boolean;
}

const InitialGeneration: React.FC<Props> = ({
  handleInitialGenerationChoice,
  randomize,
}) => (
  <div>
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Initial generation
    </label>
    <div className="flex w-full gap-2">
      <div
        onClick={() => handleInitialGenerationChoice(false)}
        className={`cursor-pointer py-1 px-8 border-2 rounded-lg ${
          randomize === false ? "border-blue-500" : "border-gray-300"
        }`}
      >
        Single cell
      </div>
      <div
        onClick={() => handleInitialGenerationChoice(true)}
        className={`cursor-pointer py-1 px-8 border-2 rounded-lg ${
          randomize === true ? "border-blue-500" : "border-gray-300"
        }`}
      >
        Random
      </div>
    </div>
  </div>
);

export default InitialGeneration;
