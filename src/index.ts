import { toc } from "./rehype-toc";

export { CssClasses, InsertPosition, Options } from "./options";
export * from "./types";
export { toc };

// Export `toc` as the default export
export default toc;

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  module.exports = Object.assign(module.exports.default, module.exports);
}
