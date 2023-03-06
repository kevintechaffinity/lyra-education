export function addOneYear(date) {
  date.setFullYear(date.getFullYear() + 1);
  return date;
}

export function addOneDay(date) {
  date.setDate(date.getDate() + 1);
  return date;
}
