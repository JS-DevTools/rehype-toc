import { Processor, Transformer } from "unified";
import { Node } from "unist";
import { findMainNode } from "./find-main-node";
import { applyDefaults, Options } from "./options";

/**
 * This is a Rehype plugin that adds a table of contents (TOC) that links to all
 * the `<h1>` - `<h6>` headings no the page.
 */
export function toc(this: Processor, config?: Partial<Options>): Transformer {
  let options = applyDefaults(config);

  return function transformer(root: Node): Node {
    // Find the <main> or <body> element
    let mainNode = findMainNode(root);

    // // Start the table of contents
    // let toc = createTOCSection(mainNode);

    // // Crawl the <main> element's decendants and built the TOC
    // buildTOC(mainNode, toc);

    // // Add the TOC to the <main>
    // mainNode.children!.unshift(toc);

    return root;
  };
}
