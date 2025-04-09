export default function formatMoney(amount) {
  if (!amount && amount !== 0) return "";
  const number = Number(amount);
  if (isNaN(number)) return amount;
  return number.toLocaleString("vi-VN") + "đ";
}
