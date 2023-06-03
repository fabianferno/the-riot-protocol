export default function getTimeDifferenceString(inputDate: string) {
  // Convert the input date to milliseconds
  const inputTime = new Date(inputDate).getTime();

  // Get the current time in milliseconds
  const currentTime = Date.now();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - inputTime;

  // Calculate the time difference in seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + ' day' + (days > 1 ? 's' : '') + ' ago';
  } else if (hours > 0) {
    return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
  } else if (minutes > 0) {
    return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
  } else {
    return seconds + ' second' + (seconds > 1 ? 's' : '') + ' ago';
  }
}
