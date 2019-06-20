import { HeadingTagName } from "./types";

/**
 * Options for the Rehype TOC plugin
 */
export interface Options {
  /**
   * HTML heading elements to include in the table of contents.
   *
   * Defaults to all headings ("h1" through "h6")
   */
  headings: HeadingTagName[];
}

/**
 * Applies default values for any unspecified options
 */
export function applyDefaults(config: Partial<Options> = {}): Options {
  return {
    headings: config.headings || ["h1", "h2", "h3", "h4", "h5", "h6"],
  };
}
