import { useEffect, useState } from "react";
import { runProjection } from "../engine/projection";

export default function ScenarioSpending({ inputs, baseResult }) {
  const [reducedSpend, setReducedSpend] = useState(inputs.monthlySpend);
  const [scenarioResult, setScenarioResult] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const scenarioInputs = {
      ...inputs,
      monthlySpend: reducedSpend
    };

    const result = runProjection(scenarioInputs);
    setScenarioResult(result);
  }, [reducedSpend, inputs]);

  if (!baseResult || !scenarioResult) return null;

  const gainedYears =
    baseResult.ranOut && scenarioResult.ranOut
      ? Math.floor(scenarioResult.runOutAge - baseResult.runOutAge)
      : null;

  const spendingReduction = inputs.monthlySpend - reducedSpend;
  const reductionPercent = ((spendingReduction / inputs.monthlySpend) * 100).toFixed(1);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl p-8 shadow-2xl border border-zinc-800">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-zinc-100">
                Hope Slider
              </h3>
              <p className="text-sm text-zinc-400 mt-0.5">
                What if you reduced your spending?
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Spending Slider */}
        <div className="mb-8">
          {/* Current Value Display */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-lg">💸</span>
              </div>
              <span className="text-sm font-medium text-zinc-400">Monthly Spending</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-blue-400">
                ₹{Number(reducedSpend).toLocaleString()}
              </div>
              {spendingReduction > 0 && (
                <div className="text-xs text-green-400 font-semibold">
                  ↓ {reductionPercent}% reduction
                </div>
              )}
            </div>
          </div>

          {/* Slider with custom styling */}
          <div className="relative">
            <input
              type="range"
              min={inputs.monthlySpend * 0.3}
              max={inputs.monthlySpend}
              step={500}
              value={reducedSpend}
              onChange={(e) => setReducedSpend(Number(e.target.value))}
              onMouseDown={() => setIsInteracting(true)}
              onMouseUp={() => setIsInteracting(false)}
              onTouchStart={() => setIsInteracting(true)}
              onTouchEnd={() => setIsInteracting(false)}
              className="w-full h-3 rounded-full appearance-none cursor-pointer transition-all duration-200"
              style={{
                background: `linear-gradient(to right, 
                  rgb(34 197 94) 0%, 
                  rgb(34 197 94) ${((inputs.monthlySpend - reducedSpend) / (inputs.monthlySpend * 0.7)) * 100}%, 
                  rgb(63 63 70) ${((inputs.monthlySpend - reducedSpend) / (inputs.monthlySpend * 0.7)) * 100}%, 
                  rgb(63 63 70) 100%)`,
                outline: 'none'
              }}
            />
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6, #6366f1);
                cursor: pointer;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                transition: all 0.2s;
              }
              input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.15);
                box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
              }
              input[type="range"]::-moz-range-thumb {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6, #6366f1);
                cursor: pointer;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                transition: all 0.2s;
              }
              input[type="range"]::-moz-range-thumb:hover {
                transform: scale(1.15);
                box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
              }
            `}</style>
          </div>

          {/* Min/Max Labels */}
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs">
              <span className="text-zinc-500">Minimum</span>
              <span className="block text-zinc-400 font-semibold">₹{Math.floor(inputs.monthlySpend * 0.3).toLocaleString()}</span>
            </div>
            <div className="text-xs text-right">
              <span className="text-zinc-500">Current</span>
              <span className="block text-zinc-400 font-semibold">₹{inputs.monthlySpend.toLocaleString()}</span>
            </div>
          </div>

          {/* Savings Indicator */}
          {spendingReduction > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-green-950/30 border border-green-800/30">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-400">💰</span>
                <span className="text-zinc-300">
                  You'd save <span className="font-bold text-green-400">₹{spendingReduction.toLocaleString()}/month</span>
                  {" "}= <span className="font-bold text-green-400">₹{(spendingReduction * 12).toLocaleString()}/year</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Scenario Result */}
        <div className={`transition-all duration-500 ${isInteracting ? 'scale-[0.98] opacity-70' : 'scale-100 opacity-100'}`}>
          {scenarioResult.ranOut ? (
            <div className="space-y-4">
              {/* New Runout Date */}
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-blue-950/40 to-indigo-950/30 border-2 border-blue-800/50 overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-lg">📅</span>
                    </div>
                    <span className="text-sm text-blue-300/80 font-medium uppercase tracking-wide">
                      New Timeline
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 mb-2 text-sm">
                    With reduced spending, your money lasts until:
                  </p>
                  
                  <p className="text-4xl font-black text-blue-400 mb-1">
                    {scenarioResult.runOutDate}
                  </p>
                  
                  <div className="flex items-center gap-2 text-zinc-400">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent"></div>
                    <span className="text-xs">Age {Math.floor(scenarioResult.runOutAge)}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Impact Summary */}
              {gainedYears !== null && (
                <>
                  {gainedYears > 0 ? (
                    <div className="relative p-6 rounded-xl bg-gradient-to-br from-green-950/40 to-emerald-950/30 border-2 border-green-800/50 overflow-hidden">
                      <div className="absolute inset-0 bg-green-500/5"></div>
                      <div className="relative flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-3xl">
                          🎉
                        </div>
                        <div className="flex-1">
                          <p className="text-2xl font-black text-green-400 mb-1">
                            +{gainedYears} Extra {gainedYears === 1 ? 'Year' : 'Years'}
                          </p>
                          <p className="text-zinc-300 leading-relaxed">
                            This single adjustment extends your financial security by <span className="font-bold text-green-400">{gainedYears} years</span>. Small changes create big impact.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : gainedYears === 0 ? (
                    <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                      <p className="text-zinc-400 text-sm">
                        💡 Try reducing more to see meaningful changes in your timeline.
                      </p>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : (
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-green-950/40 to-emerald-950/30 border-2 border-green-800/50 overflow-hidden">
              <div className="absolute inset-0 bg-green-500/5"></div>
              <div className="relative flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 text-3xl">
                  ✨
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-green-400 mb-2">
                    Lifetime Coverage Achieved!
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    With this spending level, your funds will sustain you beyond life expectancy. You've created a truly secure financial future.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pro Tip */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-zinc-800/30 to-zinc-800/50 border border-zinc-700/50">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-zinc-300 text-sm leading-relaxed">
                <span className="font-bold text-zinc-200">Pro Tip:</span> Track your actual spending for 3 months to identify "invisible leaks" — subscriptions you forgot about, dining out, and impulse purchases. Most people can reduce spending 15-25% without lifestyle impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}