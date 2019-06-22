import { Node } from "unist";
import { Options } from "./options";
import { HeadingNode, HeadingTagName, HtmlElementNode } from "./types";

/**
 * Determines whether the given node is an HTML element.
 */
export function isHtmlElementNode(node: Node): node is HtmlElementNode {
  return typeof node === "object" &&
    node.type === "element" &&
    typeof node.tagName === "string" &&
    "properties" in node &&
    typeof node.properties === "object";
}

/**
 * Determines whether the given node is an HTML heading node, according to the specified options
 */
export function isHeadingNode(node: Node, options: Options): node is HeadingNode {
  return isHtmlElementNode(node) && options.headings.includes(node.tagName as HeadingTagName);
}
