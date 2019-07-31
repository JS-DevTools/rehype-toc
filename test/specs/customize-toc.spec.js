"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("options.customizeTOC", () => {

  it("should modify the TOC in-place", async () => {
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
      customizeTOC (toc) {
        toc.tagName = "div";
        toc.properties.className = "my-custom-class";
        toc.properties.id = "my-custom-id";
        toc.children[0].children[0].children.splice(1, 1);
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <div class="my-custom-class" id="my-custom-id">
            <ol class="toc-level toc-level-1">
              <li class="toc-item toc-item-h1">
                <a class="toc-link toc-link-h1" href="#">One</a>
              </li>
            </ol>
          </div>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should replace the TOC with a new node", async () => {
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
      customizeTOC (toc) {
        return {
          type: "element",
          tagName: "div",
          properties: {
            id: "table-of-contents",
          },
          children: [
            toc.children[0].children[0].children[0],
            toc.children[0].children[0].children[1].children[0].children[0],
          ]
        };
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <div id="table-of-contents">
            <a class="toc-link toc-link-h1" href="#">One</a>
            <a class="toc-link toc-link-h2" href="#">Two</a>
          </div>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should remove the TOC entirely by returning false", async () => {
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
      customizeTOC () {
        return false;
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should remove the TOC entirely by returning null", async () => {
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
      customizeTOC () {
        return null;
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

});
