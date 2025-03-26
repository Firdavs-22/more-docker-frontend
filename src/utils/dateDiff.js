export function getTimeDifference(createdAt) {
  const now = new Date();
  const createdTime = new Date(createdAt);
  const differenceInMilliseconds = now - createdTime;

  const seconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day(s) ago`;
  } else if (hours > 0) {
    return `${hours} hour(s) ago`;
  } else if (minutes > 0) {
    return `${minutes} minute(s) ago`;
  } else {
    return `${seconds} second(s) ago`;
  }
}
