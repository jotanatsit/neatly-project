function changeFormatDate(date) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const tempDate = date
    .toLocaleDateString("en-US", options)
    .replace(",", "")
    .replace(",", "")
    .split(" ");

  return `${tempDate[0]}, ${tempDate[2]} ${tempDate[1]} ${tempDate[3]}`;
}

export default changeFormatDate;
