export default function Timeline({ currentAge, runOutAge, ranOut }) {
    const LIFE_EXPECTANCY = 90;
    const totalYears = LIFE_EXPECTANCY - currentAge;
    let greenPercent = 100;
    let redPercent = 0;
    
    if (ranOut && runOutAge > currentAge) {
      greenPercent = ((runOutAge - currentAge) / totalYears) * 100;
      redPercent = 100 - greenPercent;
    }
  
    const yearsWithMoney = ranOut ? Math.floor(runOutAge - currentAge) : totalYears;
    const yearsWithoutMoney = ranOut ? Math.floor(LIFE_EXPECTANCY - runOutAge) : 0;
  
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-100">
                Your Financial Runway
              </h3>
            </div>
          </div>
  
          {/* Timeline Visualization */}
          <div className="space-y-4 mb-6">
            {/* Main Timeline Bar */}
            <div className="relative">
              <div className="w-full h-8 rounded-full overflow-hidden flex bg-zinc-800/50 border border-zinc-700/50 shadow-inner">
                {/* Green Zone - Money Available */}
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-green-400 relative transition-all duration-500"
                  style={{ width: `${greenPercent}%` }}
                >
                  {greenPercent > 15 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold drop-shadow-lg">
                        {greenPercent > 25 ? '💰 Money Available' : '💰'}
                      </span>
                    </div>
                  )}
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent"></div>
                </div>
  
                {/* Red Zone - No Money */}
                {ranOut && redPercent > 0 && (
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 relative transition-all duration-500"
                    style={{ width: `${redPercent}%` }}
                  >
                    {redPercent > 15 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xs font-bold drop-shadow-lg">
                          {redPercent > 25 ? '⚠️ No Money' : '⚠️'}
                        </span>
                      </div>
                    )}
                    {/* Danger pattern */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 20px)'
                    }}></div>
                  </div>
                )}
              </div>
  
              {/* Critical Point Marker */}
              {ranOut && (
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ left: `${greenPercent}%` }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-red-600 shadow-lg animate-pulse"></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                        Money Runs Out
                      </div>
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600 mx-auto"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
  
            {/* Age Labels */}
            <div className="flex justify-between items-center text-sm">
              <div className="flex flex-col items-start">
                <span className="text-zinc-500 text-xs">Today</span>
                <span className="text-zinc-100 font-bold">Age {currentAge}</span>
              </div>
              
              {ranOut && (
                <div className="flex flex-col items-center">
                  <span className="text-red-400 text-xs font-semibold">Money Depleted</span>
                  <span className="text-red-400 font-bold">Age {Math.floor(runOutAge)}</span>
                </div>
              )}
              
              <div className="flex flex-col items-end">
                <span className="text-zinc-500 text-xs">Life Expectancy</span>
                <span className="text-zinc-100 font-bold">Age {LIFE_EXPECTANCY}</span>
              </div>
            </div>
          </div>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Years with Money */}
            <div className="bg-gradient-to-br from-green-950/40 to-emerald-950/30 border border-green-800/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-lg">✓</span>
                </div>
                <span className="text-xs text-green-300/80 font-medium uppercase tracking-wide">Covered Years</span>
              </div>
              <p className="text-3xl font-black text-green-400">
                {yearsWithMoney}
                <span className="text-sm text-zinc-400 font-normal ml-1">years</span>
              </p>
            </div>
  
            {/* Years without Money */}
            {ranOut ? (
              <div className="bg-gradient-to-br from-red-950/40 to-orange-950/30 border border-red-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <span className="text-lg">⚠</span>
                  </div>
                  <span className="text-xs text-red-300/80 font-medium uppercase tracking-wide">Shortfall Years</span>
                </div>
                <p className="text-3xl font-black text-red-400">
                  {yearsWithoutMoney}
                  <span className="text-sm text-zinc-400 font-normal ml-1">years</span>
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-950/40 to-indigo-950/30 border border-blue-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-lg">🎯</span>
                  </div>
                  <span className="text-xs text-blue-300/80 font-medium uppercase tracking-wide">Status</span>
                </div>
                <p className="text-sm font-bold text-blue-400">
                  Fully Covered
                </p>
              </div>
            )}
          </div>
  
          {/* Status Message */}
          <div className={`p-4 rounded-xl border ${
            ranOut 
              ? 'bg-red-950/20 border-red-800/30' 
              : 'bg-green-950/20 border-green-800/30'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                ranOut ? 'bg-red-500/20' : 'bg-green-500/20'
              }`}>
                <span className="text-2xl">{ranOut ? '⚠️' : '✅'}</span>
              </div>
              <div className="flex-1">
                {ranOut ? (
                  <div>
                    <p className="text-zinc-300 leading-relaxed">
                      Based on your current trajectory, your funds will be <span className="text-red-400 font-bold">depleted at age {Math.floor(runOutAge)}</span>, leaving you with <span className="text-red-400 font-bold">{yearsWithoutMoney} years</span> of unfunded retirement.
                    </p>
                    <p className="text-zinc-400 text-sm mt-2">
                      💡 Consider reducing expenses, increasing savings, or delaying retirement to extend your financial runway.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-zinc-300 leading-relaxed">
                      <span className="text-green-400 font-bold">Excellent!</span> Your financial plan sustains you through age {LIFE_EXPECTANCY} and beyond. You're on track for a secure retirement.
                    </p>
                    <p className="text-zinc-400 text-sm mt-2">
                      💡 Continue monitoring and adjusting your plan as life circumstances change.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }