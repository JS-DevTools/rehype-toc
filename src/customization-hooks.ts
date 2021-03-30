import { Element, Parent } from "hast";
import { NormalizedOptions } from "./options";
import { isElement } from "./type-guards";

/**
 * A function that allows callers to customize the table of contents
 */
export type CustomizationHook = (node: Element, ...args: unknown[]) => Element | boolean | undefined;

/**
 * Allows the user to customize the table of contents before it gets added to the page.
 */
export function customizationHooks(toc: Element, options: NormalizedOptions): Element | undefined {
  let { customizeTOC, customizeTOCItem } = options;
  customizeNodes(toc, "li", customizeTOCItem);
  return customizationHook(customizeTOC, toc);
}

/**
 * Recursively customize nodes.
 */
function customizeNodes(parent: Element, tagName: string, hook?: CustomizationHook): void {
  if (!hook) { return; }

  for (let child of parent.children) {
    if (isElement(child) && child.tagName === tagName) {
      let hookArgs = child.data && (child.data.hookArgs as unknown[]);
      if (hookArgs) {
        let newChild = customizationHook(hook, child, hookArgs);
        replaceNode(parent, child, newChild);
      }
    }

    if (child.children) {
      customizeNodes(child as Element, tagName, hook);
    }
  }
}

/**
 * Allows callers to customize the table of contents.
 */
function customizationHook(hook: CustomizationHook | undefined, node: Element, args: unknown[] = []): Element | undefined {
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
function replaceNode(parent: Parent, oldChild: Element, newChild: Element | undefined): void {
  // We only need to do a replacement if the nodes ar different
  if (newChild !== oldChild) {
    let index = parent.children.indexOf(oldChild);

    if (newChild === undefined) {
      // Remove the old child
      parent.children.splice(index, 1);
    }
    else {
      // Replace the old child with the new child
      parent.children.splice(index, 1, newChild);
    }
  }
}
