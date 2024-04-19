export function calculateDue(date: string, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + Number(days));

  const newFormat = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(newDate);

  return newFormat;
}
