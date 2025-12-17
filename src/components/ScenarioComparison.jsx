export default function ScenarioComparison({
  baseResult,
  spendingScenario,
  savingsScenario
}) {
  if (!baseResult) return null;

  const baseAge = baseResult.runOutAge ?? 0;
  const spendAge = spendingScenario?.runOutAge ?? baseAge;
  const saveAge = savingsScenario?.runOutAge ?? baseAge;

  const maxAge = Math.max(baseAge, spendAge, saveAge, 1);

  const spendGain =
    baseResult.ranOut && spendingScenario?.ranOut
      ? Math.floor(spendAge - baseAge)
      : 0;

  const saveGain =
    baseResult.ranOut && savingsScenario?.ranOut
      ? Math.floor(saveAge - baseAge)
      : 0;

  const bestStrategy =
    saveGain > spendGain ? "save" : spendGain > 0 ? "spend" : "none";

  const Bar = ({ label, age, color }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span>Age {Math.floor(age)}</span>
      </div>
      <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${(age / maxAge) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <section className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-zinc-100 mb-6 text-center">
        Which Change Helps You Most?
      </h3>

      <div className="space-y-4">
        <Bar
          label="Current Plan"
          age={baseAge}
          color="bg-red-500"
        />

        {spendingScenario && (
          <Bar
            label={`Reduce Spending ${spendGain > 0 ? `(+${spendGain} yrs)` : ""}`}
            age={spendAge}
            color="bg-blue-500"
          />
        )}

        {savingsScenario && (
          <Bar
            label={`Save More ${saveGain > 0 ? `(+${saveGain} yrs)` : ""}`}
            age={saveAge}
            color="bg-emerald-500"
          />
        )}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
        <p className="text-sm text-zinc-300">
          💡 <span className="font-semibold">Insight:</span>{" "}
          {bestStrategy === "save"
            ? "Increasing savings has the strongest long-term impact due to compounding."
            : bestStrategy === "spend"
            ? "Reducing spending gives faster relief, but compounds less over time."
            : "Try adjusting spending or savings to see meaningful differences."}
        </p>
      </div>
    </section>
  );
}
