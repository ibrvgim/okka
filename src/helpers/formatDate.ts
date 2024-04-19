export function formatDate(date: Date) {
  const correctDate = new Date(date);

  const newFormat = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(correctDate);

  return newFormat;
}
