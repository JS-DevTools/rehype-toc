"use strict";

module.exports = compare;

/**
 * Compares two HTML strings, ignoring any whitespace differences.
 */
function compare (actual, expected) {
  actual = normalizeWhitespace(actual);
  expected = normalizeWhitespace(expected);

  if (actual !== expected) {
    let columns = createColumns(actual, expected);
    let message = formatColumns(columns);
    throw new Error(message);
  }
}

/**
 * Normalizes whitespace in an HTML string
 */
function normalizeWhitespace (html) {
  html = html.trim();
  html = html.replace(/\>\s+\</g, "><");
  html = html.replace(/\>\</g, ">\n<");
  return html;
}

/**
 * Creates a two dimensional array of side-by-side lines from each string
 */
function createColumns (actual, expected) {
  actual = actual.split("\n");
  expected = expected.split("\n");
  let length = Math.max(actual.length, expected.length);

  let columns = [
    ["EXPECTED HTML", "ACTUAL HTML"],
    ["==============================", "=============================="],
  ];

  for (let i = 0; i < length; i++) {
    columns.push([expected[i] || "", actual[i] || ""]);
  }

  return columns;
}

/**
 * Joins a two dimensional array of side-by-side lines into a single string
 */
function formatColumns (columns) {
  let columnWidth = Math.max(...columns.map(([a]) => a.length));
  let message = "\n\n";

  for (let [index, [column1, column2]] of columns.entries()) {
    let prefix = (index > 1 && column1 !== column2) ? "❌ " : "✔ ";
    message += prefix + column1.padEnd(columnWidth) + "     " + column2 + "\n";
  }

  return message;
}
