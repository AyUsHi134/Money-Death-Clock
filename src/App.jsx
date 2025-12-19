import { useMemo, useState } from "react";
import Inputs from "./components/Inputs";
import Result from "./components/Result";
import { runProjection } from "./engine/projection";
import Timeline from "./components/TimeLine";
import ScenarioSpending from "./components/ScenarioSpending";
import ScenarioSavings from "./components/ScenarioSavings";
import ScenarioComparison from "./components/ScenarioComparison";

export default function App() {
  const [inputs, setInputs] = useState({
    currentAge: 32,
    currentSavings: 1200000,
    monthlySpend: 45000,
    retirementAge: 65,
  });

  const [spendingScenario, setSpendingScenario] = useState(null);
  const [savingsScenario, setSavingsScenario] = useState(null);

  const result = useMemo(() => runProjection(inputs), [inputs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: Number(value) }));
  }

  return (
    <main className="min-h-screen bg-[#0f0806] text-[#f5ede6]">

      {/* ================= HERO ================= */}
      <section
        className="
          w-full
          px-6
          pt-16
          pb-16
          bg-gradient-to-b
          from-[#3a1e14]
          via-[#2a160f]
          to-[#0f0806]
        "
      >
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/30 border border-red-800/30 mb-5">
            <span className="text-red-400 text-xs font-semibold tracking-wide">
              FINANCIAL RUNWAY ANALYSIS
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="
              text-4xl md:text-5xl
              font-extrabold
              tracking-tight
              mb-4
              text-red-400
              leading-tight
            "
          >
            Money Death Clock
          </h1>

          {/* Subheading */}
          <p className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto mb-14">
            Most people never calculate when their money actually runs out.
            <br className="hidden sm:block" />
            This tool does.
          </p>

          {/* Inputs */}
          <Inputs values={inputs} onChange={handleChange} />
        </div>
      </section>
      {/* ================= END HERO ================= */}


      {/* ================= MAIN CONTENT ================= */}
      <section className="bg-[#0f0806]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 pb-20">
          <aside className="hidden xl:block col-span-2" />

          <div className="col-span-12 xl:col-span-8 space-y-8">
            <Result result={result} />

            <Timeline
              currentAge={inputs.currentAge}
              runOutAge={result?.runOutAge}
              ranOut={result?.ranOut}
            />

            <ScenarioSpending
              inputs={inputs}
              baseResult={result}
              onScenarioResult={setSpendingScenario}
            />

            <ScenarioSavings
              inputs={inputs}
              baseResult={result}
              onScenarioResult={setSavingsScenario}
            />

            <ScenarioComparison
              baseResult={result}
              spendingScenario={spendingScenario}
              savingsScenario={savingsScenario}
            />

            <footer className="text-center text-zinc-500 text-sm pt-10">
              <p>
                Built with fear and hope. Assumptions: 7% annual returns, 3% inflation.
              </p>
              <p>Not financial advice. Consult a professional.</p>
            </footer>
          </div>

          <aside className="hidden xl:block col-span-2" />
        </div>
      </section>
      {/* ================= END MAIN ================= */}

    </main>
  );
}
