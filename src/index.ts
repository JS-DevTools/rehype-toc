import { toc } from "./rehype-toc";

export { Options } from "./settings";
export { toc };

// Export `toc` as the default export
// tslint:disable: no-default-export
export default toc;


// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
