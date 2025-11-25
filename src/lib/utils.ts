export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  });

  return formattedDate.format(date);
};

export const formatCurrency = (amount: number) => {
  const formattedDate = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });

  return formattedDate.format(amount);
};
