import { Node } from "unist";
import { HeadingNode, HtmlElementNode } from "./types";

/**
 * The `tagName` property of HTML heading nodes
 */
export const headingTagNames = ["h1", "h2", "h3", "h4", "h5", "h6"];

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
 * Determines whether the given node is an HTML heading node
 */
export function isHeadingNode(node: Node): node is HeadingNode {
  return isHtmlElementNode(node) && headingTagNames.includes(node.tagName);
}
