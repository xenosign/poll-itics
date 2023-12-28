const changeDateFormat = (date: Date): string => {
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

const handleRefresh = (): void => {
  window.location.reload();
};

const handleGoToMain = (): void => {
  window.location.replace("/");
};

export { changeDateFormat, handleRefresh, handleGoToMain };
