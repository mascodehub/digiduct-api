function detectType(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  if (Array.isArray(value)) return "array";

  if (typeof value === "boolean") return "boolean";
  if (typeof value === "string") {
    if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
      return "boolean-string";

    if (!isNaN(value) && value.trim() !== "") {
      if (Number(value) % 1 === 0) return "int-string";
      else return "float-string";
    }

    return "string";
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) return "integer";
    return "float";
  }

  return typeof value;
}

function convertByType(value) {
  let type = detectType(value);
  switch (type) {
    case "boolean":
      return Boolean(value);

    case "boolean-string":
      return value.toLowerCase() === "true";

    case "int-string":
    case "integer":
      return parseInt(value, 10);

    case "float-string":
    case "float":
      return parseFloat(value);

    case "null":
      return null;

    case "undefined":
      return undefined;

    case "string":
      return String(value);

    default:
      return value; // fallback for unknown types
  }
}

module.exports = {
  detectType,
  convertByType,
};
