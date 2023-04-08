export const INR = "₹";

export const formatAmount = (amount, type, includeSign=true) => {
    const sign = type == "credit" ? "+" : "-";
    const amountWCurrency = `${INR}${amount.toLocaleString('en-IN')}`;
    return includeSign ? `${sign}${amountWCurrency}` : `${amountWCurrency}`;
}