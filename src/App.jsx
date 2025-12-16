import { useEffect, useState } from "react";
import Inputs from "./components/Inputs";
import Result from "./components/Result";
import { runProjection } from "./engine/projection";

export default function App() {
  const [inputs, setInputs] = useState({
    currentAge: 32,
    currentSavings: 1200000,
    monthlySpend: 45000,
    retirementAge: 65,
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(runProjection(inputs));
  }, [inputs]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-zinc-100 p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/30 border border-red-800/30 mb-4">
            ⏰ <span className="text-red-400 text-sm font-semibold">TIME IS MONEY</span>
          </div>
          <h1 className="text-5xl font-black text-red-500 mb-4">
            Money Death Clock
          </h1>
          <p className="text-zinc-400">
            Enter your spending and savings below. We’ll calculate the exact date you’ll run out of money.
          </p>
        </header>

        <Inputs values={inputs} onChange={handleChange} />
        <Result result={result} />

        <footer className="text-center text-zinc-600 text-sm pt-10">
          <p>Built with fear and hope. Assumptions: 7% annual returns, 3% inflation.</p>
          <p>Not financial advice. Consult a professional.</p>
        </footer>
      </div>
    </main>
  );
}
