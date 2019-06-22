import { getInnerText } from "./get-inner-text";
import { Options } from "./options";
import { HeadingNode, ListItemNode, ListNode } from "./types";

interface TocLevel {
  depth: number;
  headingNumber: number;
  list: ListNode;
}

/**
 * Creates an `<ol>` element containing the table of contents.
 */
export function createTOC(headings: HeadingNode[], options: Options): ListNode {
  let currentLevel: TocLevel = {
    depth: 0,
    headingNumber: 0,
    list: createList(undefined, 1, options),
  };

  let levels: TocLevel[] = [currentLevel];

  for (let heading of headings) {
    let headingNumber = options.headings.indexOf(heading.tagName) + 1;

    if (headingNumber > currentLevel.headingNumber) {
      // This is a higher heading number, so start a new level
      let depth = currentLevel.depth + 1;
      let level = {
        depth,
        headingNumber,
        list: createList(heading, depth, options),
      };

      // Add the new list to the previous level's list
      let lastItem = currentLevel.list.children.slice(-1)[0];
      lastItem && lastItem.children.push(level.list);

      levels.push(level);
      currentLevel = level;
    }
    else {
      if (headingNumber < currentLevel.headingNumber) {
        // This is a lower heading number, so we need to go up to the corresponding previous level
        do {
          levels.pop();
          currentLevel = levels.slice(-1)[0];
          if (currentLevel.headingNumber === headingNumber) {
            break;
          }
        } while (levels.length > 1);
      }

      // This heading is the same level as the previous heading,
      // so just add another <li> to the same <ol>
      let listItem = createListItem(heading, options);
      currentLevel.list.children.push(listItem);
    }
  }

  let toc = levels.pop()!.list;
  return toc;
}

/**
 * Creates an `<ol>` and `<li>` element for the given heading
 */
function createList(heading: HeadingNode | undefined, depth: number, options: Options): ListNode {
  let list: ListNode = {
    type: "element",
    tagName: "ol",
    properties: {
      class: `${options.cssClasses.list} ${options.cssClasses.list}-${depth}`,
    },
    children: [],
  };

  if (heading) {
    let listItem = createListItem(heading, options);
    list.children.push(listItem);
  }

  if (depth === 1) {
    // This is the top-level table of contents list
    list.properties.class = options.cssClasses.toc + " " + list.properties.class;
  }

  return list;
}

/**
 * Creates an `<li>` element for the given heading
 */
function createListItem(heading: HeadingNode, options: Options): ListItemNode {
  return {
    type: "element",
    tagName: "li",
    properties: {
      class: `${options.cssClasses.listItem} ${options.cssClasses.listItem}-${heading.tagName}`,
    },
    children: [
      {
        type: "element",
        tagName: "a",
        properties: {
          href: `#${heading.properties.id || ""}`,
          class: `${options.cssClasses.link} ${options.cssClasses.link}-${heading.tagName}`,
        },
        children: [
          {
            type: "text",
            value: getInnerText(heading),
          }
        ]
      }
    ],
  };
}
