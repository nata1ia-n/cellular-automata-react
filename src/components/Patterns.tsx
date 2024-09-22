import React from "react";

interface Props {
  setPatternNumber: (value: number) => void;
  patternNumber: number;
  patternError: string;
}

const Patterns: React.FC<Props> = ({
  setPatternNumber,
  patternNumber,
  patternError,
}) => (
  <div>
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Pattern number
    </label>
    <input
      id="patternNumber"
      type="number"
      min={0}
      max={255}
      value={patternNumber}
      onChange={(event) => setPatternNumber(parseInt(event.target.value))}
      className={`border-2 block leading-tight rounded w-full py-2 px-4 text-gray-700 focus:outline-none ${
        patternError ? "border-red-500" : "border-gray-200"
      }`}
    />
    <div className="error-message absolute text-red-500 text-xs mt-1">
      {patternError}
    </div>
  </div>
);

export default Patterns;
