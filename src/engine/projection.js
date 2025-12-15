import {
    DEFAULT_ASSUMPTIONS,
    MONTHS_IN_YEAR
  } from "./constants";
  
  import {
    annualToMonthlyRate,
    toNumber
  } from "./utils";
  
  
  export function runProjection(input) {
    
    // ---- Normalize Inputs ----
    const currentAge = toNumber(input.currentAge);
    const currentSavings = toNumber(input.currentSavings);
    const monthlySpend = toNumber(input.monthlySpend);
    const retirementAge = toNumber(input.retirementAge);
  
    const annualReturn =
      toNumber(input.annualReturn, DEFAULT_ASSUMPTIONS.ANNUAL_RETURN);
  
    const annualInflation =
      toNumber(input.annualInflation, DEFAULT_ASSUMPTIONS.ANNUAL_INFLATION);
  
    const lifeExpectancy =
      toNumber(input.lifeExpectancy, DEFAULT_ASSUMPTIONS.LIFE_EXPECTANCY);
  
    // ---- Derived Rates ----
    const monthlyReturn = annualToMonthlyRate(annualReturn);
    const monthlyInflation = annualToMonthlyRate(annualInflation);
  
    // ---- Simulation State ----
    let balance = currentSavings;
    let monthIndex = 0;
    let age = currentAge;
  
    const timeline = [];
  
    // ---- Projection Loop ----
    while (balance > 0 && age < lifeExpectancy) {
      // 1. Apply investment growth
      balance *= (1 + monthlyReturn);
  
      // 2. Inflate expenses over time
      const inflatedMonthlySpend =
        monthlySpend * Math.pow(1 + monthlyInflation, monthIndex);
  
      // 3. Subtract spending
      balance -= inflatedMonthlySpend;
  
      // 4. Record yearly snapshot (used for UI timeline)
      if (monthIndex % MONTHS_IN_YEAR === 0) {
        timeline.push({
          age: Number((currentAge + monthIndex / MONTHS_IN_YEAR).toFixed(1)),
          balance: Math.max(balance, 0)
        });
      }
  
      // 5. Advance time
      monthIndex++;
  
      if (monthIndex % MONTHS_IN_YEAR === 0) {
        age++;
      }
  
      // Safety guard
      if (monthIndex > DEFAULT_ASSUMPTIONS.MAX_SIM_YEARS * MONTHS_IN_YEAR) {
        break;
      }
    }
  
    // ---- Result Calculation ----
    const ranOut = balance <= 0;
    const yearsElapsed = monthIndex / MONTHS_IN_YEAR;
    const runOutAge = currentAge + yearsElapsed;
  
    const runOutDate = new Date();
    runOutDate.setMonth(runOutDate.getMonth() + monthIndex);
  
    // ---- Final Output ----
    return {
      ranOut,
      runOutAge: Number(runOutAge.toFixed(1)),
      runOutDate: runOutDate.toDateString(),
      timeline
    };
  }
  