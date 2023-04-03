import { Node } from "unist";
import { HtmlElementNode } from "./types";

/**
 * If the given node is undefined, returns a blank HTMLElementNode.
 * Otherwise, returns the given node.
 *
 * @param node the node to be returned
 */
export function extractTOC(node: Node | undefined): Node {
  if (node !== undefined) {
    return node;
  }

  const blankNode: HtmlElementNode = {
    type: "element",
    tagName: "div",
    properties: {}
  };
  return blankNode;
}
