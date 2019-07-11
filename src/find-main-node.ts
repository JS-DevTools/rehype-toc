import { Node } from "unist";
import { isHtmlElementNode } from "./type-guards";
import { HtmlElementNode } from "./types";

/**
 * Returns the `<main>` node, or the `<body>` node if there is no `<main>`.
 * The second node returned is the parent of the first node.
 */
export function findMainNode(root: Node): [HtmlElementNode, HtmlElementNode] {
  let [body, bodyParent] = findTagName(root, "body");
  let [main, mainParent] = findTagName(body || root, "main");

  if (main) {
    return [main, mainParent || body || root as HtmlElementNode];
  }
  else {
    return [
      body || root as HtmlElementNode,
      bodyParent || root as HtmlElementNode
    ];
  }
}


/**
 * Recursively crawls the HAST tree and finds the first element with the specified tag name.
 */
function findTagName(node: Node, tagName: string): [HtmlElementNode | undefined, HtmlElementNode | undefined] {
  if (isHtmlElementNode(node) && node.tagName === tagName) {
    return [node, undefined];
  }

  if (node.children) {
    let parent = node as HtmlElementNode;
    for (let child of parent.children!) {
      let [found] = findTagName(child, tagName);
      if (found) {
        return [found, parent];
      }
    }
  }

  return [undefined, undefined];
}
