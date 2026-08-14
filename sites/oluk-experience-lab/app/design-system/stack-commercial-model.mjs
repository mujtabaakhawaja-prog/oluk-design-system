// @ts-check

/** @typedef {"FOUNDATION" | "STRONGER" | "MAXIMUM"} StackCommercialLevel */

/**
 * Stack level is a basket-completeness signal, not a product-performance score.
 * The baseline is always product one, so a valid stack can never contain fewer
 * than one selected product.
 *
 * @param {number} selectedProductCount
 * @returns {StackCommercialLevel}
 */
export function stackLevelFor(selectedProductCount) {
  if (!Number.isInteger(selectedProductCount) || selectedProductCount < 1) {
    throw new Error("A stack requires at least one selected product.");
  }

  if (selectedProductCount === 1) return "FOUNDATION";
  if (selectedProductCount === 2) return "STRONGER";
  return "MAXIMUM";
}

/**
 * @param {string} price
 */
export function stackPriceValue(price) {
  const value = Number(price.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(value)) throw new Error(`Invalid stack price: ${price}`);
  return value;
}

/**
 * @param {string} baselinePrice
 * @param {readonly string[]} additionPrices
 */
export function stackTotalFor(baselinePrice, additionPrices) {
  return stackPriceValue(baselinePrice) + additionPrices.reduce((total, price) => total + stackPriceValue(price), 0);
}

/**
 * @param {readonly (readonly string[])[]} groups
 */
export function uniqueStackContributions(groups) {
  return [...new Set(groups.flat())];
}
