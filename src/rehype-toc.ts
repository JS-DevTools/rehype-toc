import { Processor, Transformer } from "unified";
import { Node } from "unist";
import { createTOC } from "./create-toc";
import { customizeTOC } from "./customize-toc";
import { findHeadings } from "./fiind-headings";
import { findMainNode } from "./find-main-node";
import { applyDefaults, PartialOptions } from "./options";

/**
 * This is a Rehype plugin that adds a table of contents (TOC) that links to all
 * the `<h1>` - `<h6>` headings no the page.
 */
export function toc(this: Processor, config?: PartialOptions): Transformer {
  let options = applyDefaults(config);

  return function transformer(root: Node): Node {
    // Find the <main> or <body> element
    let mainNode = findMainNode(root);

    // Find all heading elements
    let headings = findHeadings(mainNode, options);

    // Create the table of contents
    let tocNode = createTOC(headings, options);

    // Allow the user to customize the table of contents before we add it to the page
    let node = customizeTOC(tocNode, options);

    if (node) {
      // Add the table of contents to the <main> element
      mainNode.children!.unshift(node);
    }

    return root;
  };
}
