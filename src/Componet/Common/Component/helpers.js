export function convertStringToDate(dateString) {
  var parts = dateString.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);

  // Note: Months in JavaScript are zero-based (0-11).
  var date = new Date(year, month - 1, day);

  return date;
}

export function convertStringToDate2(dateString) {
  var parts = dateString?.split("/");

  if (parts?.length > 2) {
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Note: Months in JavaScript are zero-based (0-11).
    var date = new Date(year, month - 1, day);

    return date;
  }
  return null;
}
