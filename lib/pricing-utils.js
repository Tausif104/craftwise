/**
 * Formats a number as a human-readable price string with euro symbol.
 * Uses European format (comma for decimals) by default.
 * @param {number} amount
 * @param {string} locale
 * @returns {string}
 */
export function formatPrice(amount, locale = "de-DE") {
    if (typeof amount !== "number" || isNaN(amount)) {
        console.error("Invalid amount provided to formatPrice:", amount);
        return "€0.00";
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Validates a pricing plan object.
 * @param {object} plan
 * @returns {boolean}
 */
export function validatePricingPlan(plan) {
    const requiredFields = ["id", "name", "monthlyPrice", "annualPrice"];
    for (const field of requiredFields) {
        if (!plan[field]) {
            console.warn(`Pricing plan validation failed: missing field '${field}'`, plan);
            return false;
        }
    }

    if (plan.monthlyPrice < 0 || plan.annualPrice < 0) {
        console.warn("Pricing plan validation failed: negative price", plan);
        return false;
    }

    return true;
}
