import { toc } from "./rehype-toc";

export { CssClasses, InsertPosition, Options } from "./options";
export * from "./types";
export { toc };

// Export `toc` as the default export
// tslint:disable: no-default-export
export default toc;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
