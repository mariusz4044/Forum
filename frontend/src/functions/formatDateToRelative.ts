export function formatDateToRelative(input: string): string {
  const inputDate = new Date(input);
  const now = new Date();

  const inputMidnight = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
  );
  const nowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const msInDay = 24 * 60 * 60 * 1000;
  const dayDiff = Math.floor(
    (nowMidnight.getTime() - inputMidnight.getTime()) / msInDay,
  );

  let dayLabel: string;
  switch (dayDiff) {
    case 0:
      dayLabel = "today";
      break;
    case 1:
      dayLabel = "yesterday";
      break;
    default:
      dayLabel = `${dayDiff} days ago`;
  }

  const timeString = inputDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dayLabel}, ${timeString}`;
}
