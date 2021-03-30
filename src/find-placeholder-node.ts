import { Node, Parent, Element, Text } from "hast";
import { isElement, isParent, isText } from "./type-guards";

/**
 * Returns the parent Parent node of the placeholder Text node (aka the `target` node).
 * The second node returned is the ancestor of the placeholder Text node (aka the `parent` node).
 */
export function findPlaceholderNode(root: Parent, placeholder: string): [Element | undefined, Parent | undefined] {
  const [, parent, ancestor] = findText(root, placeholder);

  return [parent, ancestor];
}

/**
 * Recursively crawls the HAST tree and finds the first Text element with the exactly specified text.
 */
function findText(node: Node, placeholder: string): [Text | undefined, Element | undefined, Parent | undefined] {
  if (isText(node)) {
    return [
      node.value === placeholder ? node : undefined,
      undefined,
      undefined,
    ];
  }
  else if (isParent(node)) {
    for (const child of node.children) {
      let [found, parent] = findText(child, placeholder);
      if (found) {
        if (!parent) {
          if (!isElement(node)) { throw new Error("Parent `node` should be an Element hast node."); }
          return [found, node, undefined];
        }
        return [found, parent, node];
      }
    }
  }

  return [undefined, undefined, undefined];
}
