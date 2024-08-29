const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  console.log(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`;
};

export default formatDateForInput;
