"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("Special Cases", () => {

  it.skip("should handle headings that are out of order", async () => {
    let results = await process(`
      <html>
        <body>
          <h6>Six</h6>
          <h5>Five</h5>
          <h3>Three</h3>
          <h1>One</h1>
          <h5>Five Again</h5>
          <h3>Three Again</h3>
        </body>
      </html>
    `);

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1">
            <li class="toc-item toc-item-h6">
              <a href="#" class="toc-link toc-link-h6">Six</a>
            </li>
            <li class="toc-item toc-item-h5">
              <a href="#" class="toc-link toc-link-h5">Five</a>
            </li>
            <li class="toc-item toc-item-h3">
              <a href="#" class="toc-link toc-link-h3">Three</a>
            </li>
            <li class="toc-item toc-item-h1">
              <a href="#" class="toc-link toc-link-h1">One</a>
              <ol class="toc toc-level toc-level-2">
                <li class="toc-item toc-item-h5">
                  <a href="#" class="toc-link toc-link-h5">Five Again</a>
                </li>
                <li class="toc-item toc-item-h3">
                  <a href="#" class="toc-link toc-link-h3">Three Again</a>
                </li>
              </ol>
            </li>
          </ol>
          <h6>Six</h6>
          <h5>Five</h5>
          <h3>Three</h3>
          <h1>One</h1>
          <h5>Five Again</h5>
          <h3>Three Again</h3>
        </body>
      </html>
    `);
  });

  it("should include headings that get moved from <head> to <body>", async () => {
    let results = await process(`
      <html>
        <head>
          <h1>This heading is in the head</h1>
        </head>
        <body>
          <p>Lorem ipsum dolor sit amet...</p>
        </body>
      </html>
    `);

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1">
            <li class="toc-item toc-item-h1">
              <a href="#" class="toc-link toc-link-h1">This heading is in the head</a>
            </li>
          </ol>
          <h1>This heading is in the head</h1>
          <p>Lorem ipsum dolor sit amet...</p>
        </body>
      </html>
    `);
  });

});
