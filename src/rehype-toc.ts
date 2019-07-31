import { Processor, Transformer } from "unified";
import { Node } from "unist";
import { createTOC } from "./create-toc";
import { customizationHooks } from "./customization-hooks";
import { findHeadings } from "./fiind-headings";
import { findMainNode } from "./find-main-node";
import { insertTOC } from "./insert-toc";
import { NormalizedOptions, Options } from "./options";

/**
 * This is a Rehype plugin that adds a table of contents (TOC) that links to all
 * the `<h1>` - `<h6>` headings no the page.
 */
export function toc(this: Processor, opts?: Options): Transformer {
  let options = new NormalizedOptions(opts);

  return function transformer(root: Node): Node {
    // Find the <main> or <body> element
    let [mainNode, mainParent] = findMainNode(root);

    // Find all heading elements
    let headings = findHeadings(mainNode, options);

    // Create the table of contents
    let tocNode = createTOC(headings, options);

    // Allow the user to customize the table of contents before we add it to the page
    let node = customizationHooks(tocNode, options);

    if (node) {
      // Add the table of contents to the <main> element
      insertTOC(node, mainNode, mainParent, options);
    }

    return root;
  };
}
