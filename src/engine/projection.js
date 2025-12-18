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

  // ---- Readiness Check (VERY IMPORTANT) ----
  const isReady =
    currentAge > 0 &&
    retirementAge > currentAge &&
    monthlySpend > 0 &&
    currentSavings >= 0;

  // If not ready, return minimal object
  if (!isReady) {
    return {
      isReady: false
    };
  }

  // ---- Flags ----
  const hasZeroAssets = currentSavings === 0;

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

    // Apply growth
    balance *= (1 + monthlyReturn);

    // Inflate expenses
    const inflatedMonthlySpend =
      monthlySpend * Math.pow(1 + monthlyInflation, monthIndex);

    // Subtract spending
    balance -= inflatedMonthlySpend;

    // Record yearly snapshot
    if (monthIndex % MONTHS_IN_YEAR === 0) {
      timeline.push({
        age: Number((currentAge + monthIndex / MONTHS_IN_YEAR).toFixed(1)),
        balance: Math.max(balance, 0)
      });
    }

    monthIndex++;

    if (monthIndex % MONTHS_IN_YEAR === 0) {
      age++;
    }

    if (monthIndex > DEFAULT_ASSUMPTIONS.MAX_SIM_YEARS * MONTHS_IN_YEAR) {
      break;
    }
  }

  // ---- Result Calculation ----
  const ranOut = balance <= 0 && !hasZeroAssets;
  const yearsElapsed = monthIndex / MONTHS_IN_YEAR;
  const runOutAge = currentAge + yearsElapsed;

  const runOutDate = new Date();
  runOutDate.setMonth(runOutDate.getMonth() + monthIndex);

  // ---- Final Output ----
  return {
    isReady: true,
    ranOut,
    hasZeroAssets,
    runOutAge: Number(runOutAge.toFixed(1)),
    runOutDate: runOutDate.toDateString(),
    timeline
  };
}
