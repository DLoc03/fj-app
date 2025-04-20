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
