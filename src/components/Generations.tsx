import React from "react";

interface Props {
  setGenerationsNumber: (value: number) => void;
  generationsNumber: number;
  generationsError: string;
}

const Generations: React.FC<Props> = ({
  setGenerationsNumber,
  generationsNumber,
  generationsError,
}) => (
  <div>
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Number of generations
    </label>
    <input
      id="generationsNumber"
      type="number"
      min={0}
      max={1000}
      value={generationsNumber}
      onChange={(event) => setGenerationsNumber(parseInt(event.target.value))}
      className={`border-2 block leading-tight rounded w-full py-2 px-4 text-gray-700 focus:outline-none ${
        generationsError ? "border-red-500" : "border-gray-200"
      }`}
    />
    <div className="error-message absolute text-red-500 text-xs mt-1">
      {generationsError}
    </div>
  </div>
);

export default Generations;
