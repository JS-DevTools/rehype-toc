import { Node } from "unist";
import { Options } from "./options";
import { HtmlElementNode } from "./types";

/**
 * Allows the user to customize the table of contents before it gets added to the page.
 */
export function customizeTOC(toc: HtmlElementNode, options: Options): Node | undefined {
  let customized = options.customizeTOC(toc);
  if (customized) {
    return customized;
  }
  else if (customized === undefined) {
    return toc;
  }
}
