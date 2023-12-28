const changeDateFormat = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate()) +
    ", " +
    (date.getHours() < 9 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 9 ? "0" + date.getMinutes() : date.getMinutes()) +
    " 이후"
  );
};

export { changeDateFormat };
