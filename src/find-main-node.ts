import { Parent, Element } from "hast";
import { isElement, isParent } from "./type-guards";

/**
 * Returns the `<main>` node, or the `<body>` node if there is no `<main>`.
 * The second node returned is the parent of the first node.
 */
export function findMainNode(root: Parent): [Element, Parent] {
  let [body, bodyParent] = findTagName(root, "body");
  let [main, mainParent] = findTagName(body || root, "main");

  if (main) {
    return [main, mainParent || body || (root as Element)];
  }
  else {
    return [
      body || (root as Element),
      bodyParent || (root as Element)
    ];
  }
}


/**
 * Recursively crawls the HAST tree and finds the first element with the specified tag name.
 */
function findTagName(node: Parent, tagName: string): [Element | undefined, Parent | undefined] {
  if (isElement(node) && node.tagName === tagName) {
    return [node, undefined];
  }

  for (const child of node.children) {
    if (isParent(child)) {
      let [found] = findTagName(child, tagName);
      if (found) {
        return [found, node];
      }
    }
  }

  return [undefined, undefined];
}
