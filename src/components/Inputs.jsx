import { useState, useEffect } from "react";
import calculatorIcon from "../assets/calculator.png";

export default function Inputs({ values, onChange }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl p-8 shadow-2xl border border-zinc-800">

      {/* subtle dotted texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative">

        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red-900/40 flex items-center justify-center border border-red-800/40">
            <img
              src={calculatorIcon}
              alt="Calculator"
              className="w-6 h-6" 
            />
          </div>
          <h2 className="text-xl font-semibold text-zinc-100">
            Financial Inputs Calculator
          </h2>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Current Age"
            name="currentAge"
            value={values.currentAge}
            onChange={onChange}
            min={1}
            suffix="years"
          />
          <Field
            label="Net Liquid Assets"
            name="currentSavings"
            value={values.currentSavings}
            onChange={onChange}
            min={0}
            prefix="₹"
          />
          <Field
            label="Monthly Spending"
            name="monthlySpend"
            value={values.monthlySpend}
            onChange={onChange}
            min={1}
            prefix="₹"
          />
          <Field
            label="Retirement Age"
            name="retirementAge"
            value={values.retirementAge}
            onChange={onChange}
            min={1}
            suffix="years"
          />
        </div>

        {/* Privacy line (LEFT aligned & clean) */}
        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
          <span>🔒</span>
          <span>Privacy First: Your data never leaves this browser.</span>
        </div>

      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, min, prefix, suffix }) {
  const [draft, setDraft] = useState(
    value === 0 || value === undefined ? "" : value.toString()
  );

  // 🔑 Keep draft synced with parent state
  useEffect(() => {
    setDraft(value === 0 || value === undefined ? "" : value.toString());
  }, [value]);

  function handleChange(e) {
    setDraft(e.target.value);
  }

  function handleBlur() {
    if (draft === "") return;

    const num = Number(draft);
    if (isNaN(num) || num < min) {
      setDraft(value === 0 || value === undefined ? "" : value.toString());
      return;
    }

    onChange({ target: { name, value: num } });
  }

  return (
    <div>
      <label className="text-sm font-medium text-zinc-300 mb-2 block">
        {label}
      </label>

      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
            {prefix}
          </span>
        )}

        <input
          type="text"
          value={draft}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full bg-black/50 border border-zinc-700 rounded-xl py-3 text-zinc-100
            focus:outline-none focus:ring-2 focus:ring-red-900/40
            ${prefix ? "pl-8" : "pl-4"}
            ${suffix ? "pr-16" : "pr-4"}`}
        />

        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
