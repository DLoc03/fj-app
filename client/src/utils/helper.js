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

export const formatDate = (dateString) => {
  if (/\d{4}-\d{2}-\d{2}T/.test(dateString)) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return dateString;
  }
  return "Không xác định";
};
