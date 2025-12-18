export default function Result({ result }) {
  /* ===============================
     STATE 1 — WAITING / INCOMPLETE
     =============================== */
  if (!result || !result.isReady) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl p-8 shadow-2xl border border-zinc-800">
        <h2 className="text-xl font-semibold text-zinc-100 mb-2">
          Financial Forecast
        </h2>
        <p className="text-zinc-400 text-sm">
          Adjust the inputs above to see your financial runway.
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl p-8 shadow-2xl border border-zinc-800">
      {/* Red pulse only for true critical alert */}
      {result.ranOut && !result.hasZeroAssets && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-pulse" />
      )}

      <div className="relative">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red-900/40 flex items-center justify-center">
            📊
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">
            Your Financial Forecast
          </h2>
        </div>

        {/* ===============================
           STATE 2 — ZERO ASSETS WARNING
           =============================== */}
        {result.hasZeroAssets && !result.ranOut && (
          <div className="p-6 rounded-xl bg-gradient-to-br from-amber-950/40 to-yellow-950/30 border border-amber-800/40">
            <h3 className="text-lg font-bold text-amber-400 mb-2">
              ⚠️ No Liquid Savings
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              You currently have no liquid assets. This means your financial
              runway depends entirely on future income or support. Even small
              savings can significantly improve stability.
            </p>
          </div>
        )}

        {/* ===============================
           STATE 3 — CRITICAL ALERT
           =============================== */}
        {result.ranOut && !result.hasZeroAssets && (
          <div className="space-y-6">
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-red-950/50 to-red-900/30 border-2 border-red-800/50">
              <div className="absolute inset-0 bg-red-500/5 rounded-xl animate-pulse" />

              <div className="relative">
                <p className="text-sm text-red-300/80 font-medium mb-3 uppercase tracking-wide">
                  ⚠️ Critical Alert
                </p>

                <p className="text-zinc-300 mb-4 leading-relaxed">
                  Based on your current spending habits and savings, you will
                  completely run out of money on:
                </p>

                <div className="bg-black/40 rounded-lg p-6 border border-red-800/30 mb-4">
                  <p className="text-4xl md:text-5xl font-black text-red-500 mb-2 tracking-tight">
                    {result.runOutDate}
                  </p>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-800/50 to-transparent" />
                    <span className="text-xs md:text-sm">
                      THE DAY YOUR MONEY RUNS OUT
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-800/50 to-transparent" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-black/30 rounded-lg border border-red-900/30">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-2xl">
                    🎂
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">You will be</p>
                    <p className="text-2xl font-bold text-zinc-100">
                      {Math.floor(result.runOutAge)} years old
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guidance (NO CTA) */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 border border-blue-800/30">
              <h3 className="text-lg font-bold text-zinc-100 mb-2">
                💡 Don&apos;t Panic. Take Action.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This is a wake-up call, not a death sentence. Small reductions in
                spending or modest savings can dramatically extend your
                financial runway.
              </p>
            </div>
          </div>
        )}

        {/* ===============================
           STATE 4 — FINANCIALLY SAFE
           =============================== */}
        {!result.ranOut && !result.hasZeroAssets && (
          <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-950/30 to-green-950/30 border border-emerald-800/30">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              ✅ Financially Stable
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Based on your current inputs, your money lasts beyond your life
              expectancy. You&apos;re in a strong position — consistency is key.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
