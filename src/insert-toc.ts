import { Node } from "unist";
import { Options } from "./options";
import { HtmlElementNode } from "./types";

/**
 * Inserts the table of contents at the specified position, relative to the given nodes.
 *
 * @param toc - The table of contents node to insert
 * @param target - The node to insert `toc` in/before/after
 * @param parent - The parent node of `target`. This is used for inserting `toc` before/after `target`
 * @param options - The `position` option determines where `toc` is inserted
 */
export function insertTOC(toc: Node, target: HtmlElementNode, parent: HtmlElementNode, { position }: Options): void {
  let childIndex = parent.children!.indexOf(target);

  switch (position) {
    case "beforebegin":
      parent.children!.splice(childIndex, 0, toc);
      break;

    case "afterbegin":
      target.children!.unshift(toc);
      break;

    case "beforeend":
      target.children!.push(toc);
      break;

    case "afterend":
      parent.children!.splice(childIndex + 1, 0, toc);
      break;

    default:
      throw new Error(`Invalid table-of-contents position: ${position}`);
  }
}
