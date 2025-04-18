export const formatCurrency = (value) => {
  if (!value && value !== 0) return "";
  let stringValue = String(value).replace(/\D/g, "");
  if (stringValue === "") return "";
  const formattedValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedValue;
};
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const regex = /^\d{10,15}$/;
  return regex.test(phone);
};

//  Validate password textfield
// export const validatePassword = (password) => {
//   return password.length >= 6;
// };
