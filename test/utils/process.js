"use strict";

const toc = require("../../");
const unified = require("unified");
const parse = require("rehype-parse");
const slug = require("rehype-slug");
const stringify = require("rehype-stringify");

module.exports = process;

/**
 * Processes the given HTML using Rehype and the TOC plugin
 */
async function process (html, { slug: useSlug, ...options } = {}) {
  let processor = unified().use(parse);

  if (useSlug) {
    processor.use(slug);
  }

  processor.use(toc, options);
  processor.use(stringify);

  let file = await processor.process(html);
  return file.contents;
}
