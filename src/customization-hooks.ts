import { Node } from "unist";
import { NormalizedOptions } from "./options";
import { HtmlElementNode } from "./types";

/**
 * A function that allows callers to customize the table of contents
 */
export type CustomizationHook = (node: Node, ...args: unknown[]) => Node | boolean | undefined;

/**
 * Allows the user to customize the table of contents before it gets added to the page.
 */
export function customizationHooks(toc: HtmlElementNode, options: NormalizedOptions): Node | undefined {
  let { customizeTOC, customizeTOCItem } = options;
  customizeNodes(toc, "li", customizeTOCItem);
  return customizationHook(customizeTOC, toc);
}

function customizeNodes(parent: HtmlElementNode, tagName: string, hook?: CustomizationHook): void {
  if (!hook) return;

  for (let child of parent.children!) {
    if (child.tagName === tagName) {
      let hookArgs = child.data && child.data.hookArgs as unknown[];
      if (hookArgs) {
        let newChild = customizationHook(hook, child, hookArgs);
        replaceNode(parent, child, newChild);
      }
    }

    if (child.children) {
      customizeNodes(child as HtmlElementNode, tagName, hook);
    }
  }
}

/**
 * Allows callers to customize the table of contents.
 */
function customizationHook(hook: CustomizationHook | undefined, node: Node, args: unknown[] = []): Node | undefined {
  if (!hook) {
    // No customization. Use the original node.
    return node;
  }

  // Call the customization hook
  let newNode = hook(node, ...args);

  if (newNode && typeof newNode === "object") {
    // The hook returned a new Node to replace the original one
    return newNode;
  }
  else if (newNode === true || newNode === undefined) {
    // Use the original Node
    return node;
  }
  else {
    // The hook returned a falsy value, so discard the Node altogether
    return undefined;
  }
}

/**
 * Replaces the specified child node with a different node
 */
function replaceNode(parent: HtmlElementNode, oldChild: Node, newChild: Node | undefined): void {
  // We only need to do a replacement if the nodes ar different
  if (newChild !== oldChild) {
    let index = parent.children!.indexOf(oldChild);

    if (newChild === undefined) {
      // Remove the old child
      parent.children!.splice(index, 1);
    }
    else {
      // Replace the old child with the new child
      parent.children!.splice(index, 1, newChild);
    }
  }
}
