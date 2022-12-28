const getValueFromStringAfterSeparator = (string: string, separator: string) =>
  string.slice(string.indexOf(separator) + 1);

const getValueFromStringBeforeSeparator = (string: string, separator: string) =>
  string.slice(0, string.indexOf(separator));

export { getValueFromStringAfterSeparator, getValueFromStringBeforeSeparator };
