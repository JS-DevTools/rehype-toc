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
    id?: string;
    class?: string;
  };
  children?: Array<HtmlElementNode | TextNode>;
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
 * A <ul> or <li> node that we create for the table of contents
 */
export interface TOCNode extends HtmlElementNode {
  parent: TOCNode;
  children: HtmlElementNode[];
  level: number;
}
