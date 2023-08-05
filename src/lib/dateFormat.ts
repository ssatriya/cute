export const longDateFormat = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
