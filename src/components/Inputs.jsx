export default function Inputs({ values, onChange }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl p-8 shadow-2xl border border-zinc-800">
      <div className="absolute inset-0 opacity-5">
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🧮</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">
            Your Financial Snapshot
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Current Age" name="currentAge" value={values.currentAge} onChange={onChange} suffix="years" />
          <Field label="Net Liquid Assets" name="currentSavings" value={values.currentSavings} onChange={onChange} prefix="₹" />
          <Field label="Monthly Spending" name="monthlySpend" value={values.monthlySpend} onChange={onChange} prefix="₹" />
          <Field label="Retirement Age" name="retirementAge" value={values.retirementAge} onChange={onChange} suffix="years" />
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-zinc-500 bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
          🔒 Privacy First: Your data never leaves this browser. We don’t store anything.
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, prefix, suffix }) {
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
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-black/50 border-2 border-zinc-700 rounded-xl py-3 text-zinc-100 text-lg ${
            prefix ? "pl-8" : "pl-4"
          } ${suffix ? "pr-16" : "pr-4"}`}
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
