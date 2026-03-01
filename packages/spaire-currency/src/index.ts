type FormatStyle = "standard" | "compact";

export function formatCurrency(
  style: FormatStyle,
): (amount: number, currency?: string) => string {
  return (amount: number, currency = "USD") => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: style === "compact" ? "compact" : "standard",
    });
    return formatter.format(amount / 100);
  };
}
