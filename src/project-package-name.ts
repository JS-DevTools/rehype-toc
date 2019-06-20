import { Options, Settings } from "./settings";

/**
 * A rehype plugin that adds a table of contents (TOC) to the page
 *
 * @returns - The new version number
 */
export function toc(options?: Options): string {
  let settings = new Settings(options);

  if (settings.greeting === "Goodbye") {
    // Simulate a runtime error
    throw new Error("Cannot say goodbye");
  }

  return `${settings.greeting}, ${settings.subject}.`;
}
