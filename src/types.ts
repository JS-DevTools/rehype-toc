import { Element } from "hast";

/**
 * The `tagName` property of HTML heading nodes
 */
export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * An HTML heading node (i.e. <h1>, <h2>, etc.)
 */
export interface Heading extends Element {
  tagName: HeadingTagName;
}

/**
 * An HTML list node (i.e. <ol> or <ul>)
 */
export interface List extends Element {
  tagName: "ol" | "ul";
  children: ListItem[];
}

/**
 * An HTML list item node (i.e. <li>)
 */
export interface ListItem extends Element {
  tagName: "li";
  children: Element[];
}
