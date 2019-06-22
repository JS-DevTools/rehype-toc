import { Node } from "unist";

/**
 * The `tagName` property of HTML heading nodes
 */
export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * An HTML element node
 */
export interface HtmlElementNode extends Node {
  type: "element";
  tagName: string;
  properties: {
    [prop: string]: string | undefined;
  };
  children?: Node[];
}

/**
 * Simple node that is turns into a text literal
 */
export interface TextNode extends Node {
  type: "text";
  value: string;
}

/**
 * An HTML heading node (i.e. <h1>, <h2>, etc.)
 */
export interface HeadingNode extends HtmlElementNode {
  tagName: HeadingTagName;
}

/**
 * An HTML list node (i.e. <ol> or <ul>)
 */
export interface ListNode extends HtmlElementNode {
  type: "element";
  tagName: "ol" | "ul";
  properties: {
    class: string;
  };
  children: ListItemNode[];
}

/**
 * An HTML list item node (i.e. <li>)
 */
export interface ListItemNode extends HtmlElementNode {
  type: "element";
  tagName: "li";
  properties: {
    class: string;
  };
  children: Array<HtmlElementNode | TextNode>;
}
