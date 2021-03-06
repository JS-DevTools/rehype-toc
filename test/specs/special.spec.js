"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("Special Cases", () => {

  it("should handle headings that are out of order", async () => {
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
          <nav class="toc">
            <ol class="toc-level toc-level-1">
              <li class="toc-item toc-item-h6">
                <a class="toc-link toc-link-h6" href="#">Six</a>
              </li>
              <li class="toc-item toc-item-h5">
                <a class="toc-link toc-link-h5" href="#">Five</a>
              </li>
              <li class="toc-item toc-item-h3">
                <a class="toc-link toc-link-h3" href="#">Three</a>
              </li>
              <li class="toc-item toc-item-h1">
                <a class="toc-link toc-link-h1" href="#">One</a>
                <ol class="toc-level toc-level-2">
                  <li class="toc-item toc-item-h5">
                    <a class="toc-link toc-link-h5" href="#">Five Again</a>
                  </li>
                  <li class="toc-item toc-item-h3">
                    <a class="toc-link toc-link-h3" href="#">Three Again</a>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>
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
          <nav class="toc">
            <ol class="toc-level toc-level-1">
              <li class="toc-item toc-item-h1">
                <a class="toc-link toc-link-h1" href="#">This heading is in the head</a>
              </li>
            </ol>
          </nav>
          <h1>This heading is in the head</h1>
          <p>Lorem ipsum dolor sit amet...</p>
        </body>
      </html>
    `);
  });

});
