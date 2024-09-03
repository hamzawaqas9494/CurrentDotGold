export default function getFormattedDateTime() {
  const now = new Date();

  // Options for formatting the date
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit", // Two-digit day of the month (e.g., "09")
    month: "short", // Abbreviated month name (e.g., "Sep")
    year: "numeric", // Full numeric year (e.g., "2024")
  };

  // Options for formatting the time
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour clock format with AM/PM
  };

  // Create formatters using the options
  const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);

  // Format the date and time
  const date = dateFormatter.format(now);
  const time = timeFormatter.format(now);

  // Return an object with the date and time
  return {
    date, // e.g., "Sep 20, 2024"
    time, // e.g., "2:30 PM"
  };
}
