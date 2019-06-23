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
  let levels: TocLevel[] = [];
  let currentLevel: TocLevel = {
    depth: 0,
    headingNumber: 0,
    list: undefined as unknown as ListNode,
  };

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
      if (currentLevel.list) {
        let lastItem = currentLevel.list.children.slice(-1)[0];
        lastItem.children.push(level.list);
      }

      levels.push(level);
      currentLevel = level;
    }
    else {
      if (headingNumber < currentLevel.headingNumber) {
        // This is a lower heading number, so we need to go up to a previous level
        for (let i = levels.length - 2; i >= 0; i--) {
          let level = levels[i];
          if (level.headingNumber === headingNumber) {
            // We found the previous level that matches this heading
            levels = levels.slice(0, i + 1);
            currentLevel = level;
            break;
          }
        }

        // while (levels.length > 1) {
        //   let previousLevel = levels.slice(-2, -1)[0];
        //   if (previousLevel.headingNumber === headingNumber) {
        //     levels.pop();
        //     currentLevel = previousLevel;
        //   }
        //   else {
        //     break;
        //   }
        // }

        // If headings are in an incorrect order, then we may need to adjust the headingNumber
        currentLevel.headingNumber = Math.min(currentLevel.headingNumber, headingNumber);
      }

      // This heading is the same level as the previous heading,
      // so just add another <li> to the same <ol>
      let listItem = createListItem(heading, options);
      currentLevel.list.children.push(listItem);
    }
  }

  if (levels.length === 0) {
    return createList(undefined, 1, options);
  }
  else {
    return levels[0].list;
  }
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
          class: `${options.cssClasses.link} ${options.cssClasses.link}-${heading.tagName}`,
          href: `#${heading.properties.id || ""}`,
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
