export const DateFormat = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("vi-VN");
};
