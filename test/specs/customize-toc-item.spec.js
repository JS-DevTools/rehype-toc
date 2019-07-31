"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("options.customizeTOCItem", () => {

  it("should modify each item in-place", async () => {
    let results = await process(`
      <html>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
    {
      customizeTOCItem (tocItem, heading) {
        tocItem.properties.className = `my-custom-${heading.tagName}-class`;
        tocItem.properties.id = `my-custom-${heading.tagName}-id`;
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <nav class="toc">
            <ol class="toc-level toc-level-1">
              <li class="my-custom-h1-class" id="my-custom-h1-id">
                <a class="toc-link toc-link-h1" href="#">One</a>
                <ol class="toc-level toc-level-2">
                  <li class="my-custom-h2-class" id="my-custom-h2-id">
                    <a class="toc-link toc-link-h2" href="#">Two</a>
                    <ol class="toc-level toc-level-3">
                      <li class="my-custom-h3-class" id="my-custom-h3-id">
                        <a class="toc-link toc-link-h3" href="#">Three</a>
                        <ol class="toc-level toc-level-4">
                          <li class="my-custom-h4-class" id="my-custom-h4-id">
                            <a class="toc-link toc-link-h4" href="#">Four</a>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should replace each item with a new node", async () => {
    let results = await process(`
      <html>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
    {
      customizeTOCItem (tocItem, heading) {
        return {
          type: "element",
          tagName: "li",
          properties: {
            className: heading.tagName,
          },
          children: [
            heading.children[0],
            ...tocItem.children.slice(1),
          ]
        };
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <nav class="toc">
            <ol class="toc-level toc-level-1">
              <li class="h1">
                One
                <ol class="toc-level toc-level-2">
                  <li class="h2">
                    Two
                    <ol class="toc-level toc-level-3">
                      <li class="h3">
                        Three
                        <ol class="toc-level toc-level-4">
                          <li class="h4">
                            Four
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should remove some items entirely by returning false", async () => {
    let results = await process(`
      <html>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
    {
      customizeTOCItem (item, heading) {
        return ["h1", "h2"].includes(heading.tagName);
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <nav class="toc">
            <ol class="toc-level toc-level-1">
              <li class="toc-item toc-item-h1">
                <a class="toc-link toc-link-h1" href="#">One</a>
                <ol class="toc-level toc-level-2">
                  <li class="toc-item toc-item-h2">
                    <a class="toc-link toc-link-h2" href="#">Two</a>
                    <ol class="toc-level toc-level-3">
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should remove some items entirely by returning null", async () => {
    let results = await process(`
      <html>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
    {
      customizeTOCItem (item, heading) {
        if (heading.tagName === "h4") {
          return null;
        }
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <nav class="toc">
            <ol class="toc-level toc-level-1">
              <li class="toc-item toc-item-h1">
                <a class="toc-link toc-link-h1" href="#">One</a>
                <ol class="toc-level toc-level-2">
                  <li class="toc-item toc-item-h2">
                    <a class="toc-link toc-link-h2" href="#">Two</a>
                    <ol class="toc-level toc-level-3">
                      <li class="toc-item toc-item-h3">
                        <a class="toc-link toc-link-h3" href="#">Three</a>
                        <ol class="toc-level toc-level-4">
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

});
