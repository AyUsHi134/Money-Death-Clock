import { useEffect, useState } from "react";
import { runProjection } from "../engine/projection";

export default function ScenarioSavings({ inputs, baseResult }) {
  const [extraSavings, setExtraSavings] = useState(0);
  const [scenarioResult, setScenarioResult] = useState(null);

  useEffect(() => {
    const scenarioInputs = {
      ...inputs,
      monthlySpend: inputs.monthlySpend - extraSavings
    };

    const result = runProjection(scenarioInputs);
    setScenarioResult(result);
  }, [extraSavings, inputs]);

  if (!baseResult || !scenarioResult) return null;

  const gainedYears =
    baseResult.ranOut && scenarioResult.ranOut
      ? Math.floor(scenarioResult.runOutAge - baseResult.runOutAge)
      : null;

  return (
    <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center">
          💾
        </div>
        <div>
          <h3 className="text-xl font-bold text-zinc-100">
            What if you saved more?
          </h3>
          <p className="text-sm text-zinc-400">
            Increase monthly savings and see the impact
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-5">
        <div className="flex justify-between text-sm text-zinc-400 mb-2">
          <span>Extra Monthly Savings</span>
          <span className="text-emerald-400 font-semibold">
            ₹{extraSavings.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={Math.floor(inputs.monthlySpend * 0.4)}
          step={500}
          value={extraSavings}
          onChange={(e) => setExtraSavings(Number(e.target.value))}
          className="w-full h-2 rounded-full accent-emerald-500 cursor-pointer"
        />

        <div className="flex justify-between text-xs text-zinc-500 mt-1">
          <span>₹0</span>
          <span>
            ₹{Math.floor(inputs.monthlySpend * 0.4).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Result */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
        <p className="text-sm text-zinc-400 mb-1">
          Your money would last until:
        </p>

        <p className="text-2xl font-bold text-emerald-400">
          {scenarioResult.runOutDate || "Beyond life expectancy"}
        </p>

        {gainedYears !== null && gainedYears > 0 && (
          <p className="text-sm text-emerald-300 mt-2">
            +{gainedYears} extra years gained
          </p>
        )}

        {extraSavings > 0 && (
          <p className="text-xs text-zinc-500 mt-2">
            That’s ₹{(extraSavings * 12).toLocaleString()} saved per year
          </p>
        )}
      </div>
    </section>
  );
}
