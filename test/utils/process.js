"use strict";

const toc = require("../../");
const unified = require("unified");
const parse = require("rehype-parse");
const stringify = require("rehype-stringify");

module.exports = process;

/**
 * Processes the given HTML using Rehype and the TOC plugin
 */
async function process (html, options) {
  let processor = unified()
    .use(parse)
    .use(toc, options)
    .use(stringify);

  let file = await processor.process(html);
  return file.contents;
}
