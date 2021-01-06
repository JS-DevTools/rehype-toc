import { Element } from "hast";
import { NormalizedOptions } from "./options";
import { isHeading, isElement } from "./type-guards";
import { Heading } from "./types";

/**
 * Finds all HTML heading nodes (`<h1>` through `<h6>`)
 */
export function findHeadings(node: Element, options: NormalizedOptions): Heading[] {
  let headingNodes: Heading[] = [];
  findHeadingsRecursive(node, headingNodes, options);
  return headingNodes;
}

/**
 * Recursively crawls the HAST tree and adds all HTML heading nodes to the given array.
 */
function findHeadingsRecursive(node: Element, headingNodes: Heading[], options: NormalizedOptions): void {
  if (isHeading(node, options)) {
    headingNodes.push(node);
  }

  if (node.children) {
    let parent = node;
    for (let child of parent.children) {
      if (isElement(child)) {
        findHeadingsRecursive(child, headingNodes, options);
      }
    }
  }
}
