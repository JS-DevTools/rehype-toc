import { Node, Parent } from "unist";

/**
 * Returns the text content of all children of the given node
 */
export function getInnerText(node: Node): string {
  let text = "";

  if (node.type === "text") {
    text += node.value || "";
  }

  if (node.children) {
    let parent = node as Parent;
    for (let child of parent.children) {
      text += getInnerText(child);
    }
  }

  return text;
}
