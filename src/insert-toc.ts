import { Parent, Element } from "hast";
import { NormalizedOptions } from "./options";

/**
 * Inserts the table of contents at the specified position, relative to the given nodes.
 *
 * @param toc - The table of contents node to insert
 * @param target - The node to insert `toc` in/before/after
 * @param parent - The parent node of `target`. This is used for inserting `toc` before/after `target`
 * @param options - Options object
 * @param options.position - The `position` option determines where `toc` is inserted
 * @param options.replace - Set this to `true` will insert the `toc` node in place of `target` node
 */
export function insertTOC(toc: Element, target: Element, parent: Parent, { position, replace }: NormalizedOptions & { replace: boolean }): void {
  let childIndex = parent.children.indexOf(target);

  if (replace) {
    parent.children[childIndex] = toc;
  }
  else {
    switch (position) {
      case "beforebegin":
        parent.children.splice(childIndex, 0, toc);
        break;

      case "afterbegin":
        target.children.unshift(toc);
        break;

      case "beforeend":
        target.children.push(toc);
        break;

      case "afterend":
        parent.children.splice(childIndex + 1, 0, toc);
        break;

      default:
        throw new Error(`Invalid table-of-contents position: ${position}`);
    }
  }
}
