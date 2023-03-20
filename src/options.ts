import { Node } from "unist";
import { CustomizationHook } from "./customization-hooks";
import { HeadingTagName, HtmlElementNode, ListItemNode } from "./types";

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
  nav?: boolean;

  /**
   * The position at which the table of contents should be inserted, relative to the `<main>`
   * element.
   *
   * Defaults to "afterbegin";
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
   */
  position?: InsertPosition;

  /**
   * HTML heading elements to include in the table of contents.
   *
   * Defaults to all headings ("h1" through "h6").
   */
  headings?: HeadingTagName[];

  /**
   * CSS class names for various parts of the table of contents.
   */
  cssClasses?: CssClasses;

  /**
   * Allows you to customize the table of contents before it is added to the page.
   *
   * @param toc - The table of contents HAST node tree
   * @returns - Return the modified node, a new node to replace it with, or `undefined` to use the
   * existing node. You can return a falsy value to prevent the table of contents from being added
   * to the page.
   */
  customizeTOC?(toc: HtmlElementNode): Node | boolean | undefined;

  /**
   * Allows you to customize an item before it is added to the table of contents.
   *
   * @param tocItem - A HAST node tree containing an `<li>` and `<a>`
   * @param heading - The original heading (e.g. `<h1>`, `<h2>`, etc.) that `tocItem` is a referene to
   *
   * @returns - Return the modified node, a new node to replace it with, or `undefined` to use the
   * existing node. You can return a falsy value to prevent the item from being added to the
   * table of contents.
   */
  customizeTOCItem?(tocItem: ListItemNode, heading: HtmlElementNode): Node | boolean | undefined;

  /**
   * Determines whether the table of contents is extracted from the HTML of the page.
   * When true, only the table of contents HTML is returned.
   *
   * Defaults to false.
   */
  extract?: boolean;
}

/**
 * CSS class names for various parts of the table of contents.
 */
export interface CssClasses {
  /**
   * The CSS class name for the top-level `<nav>` or `<ol>` element that contains the whole table of contents.
   *
   * Defaults to "toc".
   */
  toc?: string;

  /**
   * The CSS class name for all `<ol>` elements in the table of contents, including the top-level one.
   *
   * Defaults to "toc-level", which also adds "toc-level-1", "toc-level-2", etc.
   */
  list?: string;

  /**
   * The CSS class name for all `<li>` elements in the table of contents.
   *
   * Defaults to "toc-item", which also adds "toc-item-h1", "toc-item-h2", etc.
   */
  listItem?: string;

  /**
   * The CSS class name for all `<a>` elements in the table of contents.
   *
   * Defaults to "toc-link", which also adds "toc-link-h1", "toc-link-h2", etc.
   */
  link?: string;
}

/**
 * Normalized, sanitized, and complete settings,
 * with default values for anything that wasn't specified by the caller.
 */
export class NormalizedOptions {
  public readonly nav: boolean;
  public readonly position: InsertPosition;
  public readonly headings: HeadingTagName[];
  public readonly cssClasses: Required<CssClasses>;
  public readonly customizeTOC?: CustomizationHook;
  public readonly customizeTOCItem?: CustomizationHook;
  public readonly extract?: boolean;

  /**
   * Applies default values for any unspecified options
   */
  public constructor(options: Options = {}) {
    let cssClasses = options.cssClasses || {};

    this.nav = options.nav === undefined ? true : Boolean(options.nav);
    this.position = options.position || "afterbegin";
    this.headings = options.headings || ["h1", "h2", "h3", "h4", "h5", "h6"];
    this.cssClasses = {
      toc: cssClasses.toc === undefined ? "toc" : cssClasses.toc,
      list: cssClasses.list === undefined ? "toc-level" : cssClasses.list,
      listItem: cssClasses.listItem === undefined ? "toc-item" : cssClasses.listItem,
      link: cssClasses.link === undefined ? "toc-link" : cssClasses.link,
    };
    this.customizeTOC = options.customizeTOC;
    this.customizeTOCItem = options.customizeTOCItem;
    this.extract = options.extract === undefined ? false : Boolean(options.extract);
  }
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
