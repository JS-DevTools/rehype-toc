import { Node } from "unist";
import { HeadingTagName, HtmlElementNode } from "./types";

/**
 * The different positions at which the table of contents can be inserted,
 * relative to the `<main>` element.
 */
export type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";

/**
 * Options for the Rehype TOC plugin
 */
export interface Options {
  /**
   * Determines whether the table of contents is wrapped in a `<nav>` element.
   *
   * Defaults to `true`.
   */
  nav: boolean;

  /**
   * The position at which the table of contents should be inserted, relative to the `<main>`
   * element.
   *
   * Defaults to "afterbegin";
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
   */
  position: InsertPosition;

  /**
   * HTML heading elements to include in the table of contents.
   *
   * Defaults to all headings ("h1" through "h6").
   */
  headings: HeadingTagName[];

  /**
   * CSS class names for various parts of the table of contents.
   */
  cssClasses: {
    /**
     * The CSS class name for the top-level `<nav>` or `<ol>` element that contains the whole table of contents.
     *
     * Defaults to "toc".
     */
    toc: string;

    /**
     * The CSS class name for all `<ol>` elements in the table of contents, including the top-level one.
     *
     * Defaults to "toc-level", which also adds "toc-level-1", "toc-level-2", etc.
     */
    list: string;

    /**
     * The CSS class name for all `<li>` elements in the table of contents.
     *
     * Defaults to "toc-item", which also adds "toc-item-h1", "toc-item-h2", etc.
     */
    listItem: string;

    /**
     * The CSS class name for all `<a>` elements in the table of contents.
     *
     * Defaults to "toc-link", which also adds "toc-link-h1", "toc-link-h2", etc.
     */
    link: string;
  };

  /**
   * Allows you to customize the table of contents before it is added to the page.
   *
   * @param toc - The table of contents HAST node tree
   * @returns - Return the modified node, a new node to replace it with, or `undefined` to use the
   * existing node. You can return a falsy value to prevent the table of contents from being added
   * to the page.
   */
  customizeTOC(toc: HtmlElementNode): Node | undefined | false;
}

/**
 * Options for the Rehype TOC plugin. All fields are optional.
 */
export type PartialOptions = DeepPartial<Options>;

/**
 * Recursively makes all object properties optional
 */
export type DeepPartial<T> = {
  // tslint:disable-next-line: no-any ban-types
  [P in keyof T]?: T[P] extends string | number | boolean | Function | any[] ? T[P] : DeepPartial<T[P]>;
};

/**
 * Applies default values for any unspecified options
 */
export function applyDefaults(config: PartialOptions = {}): Options {
  let cssClasses = config.cssClasses || {};

  return {
    nav: config.nav === undefined ? true : Boolean(config.nav),
    position: config.position || "afterbegin",
    headings: config.headings || ["h1", "h2", "h3", "h4", "h5", "h6"],
    cssClasses: {
      toc: cssClasses.toc === undefined ? "toc" : cssClasses.toc,
      list: cssClasses.list === undefined ? "toc-level" : cssClasses.list,
      listItem: cssClasses.listItem === undefined ? "toc-item" : cssClasses.listItem,
      link: cssClasses.link === undefined ? "toc-link" : cssClasses.link,
    },
    customizeTOC: config.customizeTOC || ((toc: Node) => toc),
  };
}

/**
 * Builds a CSS class string from the given user-defined class name
 */
export function buildClass(name: string, suffix: string | number): string | undefined {
  if (name) {
    let cssClass = name;

    if (suffix) {
      cssClass += ` ${name}-${suffix}`;
    }

    return cssClass;
  }
}
