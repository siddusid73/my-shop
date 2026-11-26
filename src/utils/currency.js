// Product prices from the API are in USD. Change this rate to match the current exchange rate.
export const USD_TO_INR = 88

export function formatINR(usdAmount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(usdAmount * USD_TO_INR)
}