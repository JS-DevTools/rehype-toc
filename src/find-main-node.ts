import { Node, Parent } from "unist";
import { isHtmlElementNode } from "./type-guards";
import { HtmlElementNode } from "./types";

/**
 * Returns the `<main>` node, or the `<body>` node if there is no `<main>`.
 */
export function findMainNode(root: Node): HtmlElementNode {
  let body = findTagName(root, "body");
  let main = findTagName(body || root, "main");
  return main || body || root as HtmlElementNode;
}


/**
 * Recursively crawls the HAST tree and finds the first element with the specified tag name.
 */
function findTagName(node: Node, tagName: string): HtmlElementNode | undefined {
  if (isHtmlElementNode(node) && node.tagName === tagName) {
    return node;
  }

  if (node.children) {
    let parent = node as Parent;
    for (let child of parent.children) {
      let found = findTagName(child, tagName);
      if (found) {
        return found;
      }
    }
  }
}
