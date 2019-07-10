"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("options.nav", () => {

  it("should output a top-level <ol> instead of a <nav>", async () => {
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
    { nav: false });

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1">
            <li class="toc-item toc-item-h1">
              <a class="toc-link toc-link-h1" href="#">One</a>

              <ol class="toc-level toc-level-2">
                <li class="toc-item toc-item-h2">
                  <a class="toc-link toc-link-h2" href="#">Two</a>

                  <ol class="toc-level toc-level-3">
                    <li class="toc-item toc-item-h3">
                      <a class="toc-link toc-link-h3" href="#">Three</a>

                      <ol class="toc-level toc-level-4">
                        <li class="toc-item toc-item-h4">
                          <a class="toc-link toc-link-h4" href="#">Four</a>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should put the cssClasses.toc class on the <ol> instead of the <nav>", async () => {
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
      nav: false,
      cssClasses: {
        toc: "outline",
        list: "outline-section",
        listItem: "outline-bullet",
        link: "page-link"
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="outline outline-section outline-section-1">
            <li class="outline-bullet outline-bullet-h1">
              <a class="page-link page-link-h1" href="#">One</a>

              <ol class="outline-section outline-section-2">
                <li class="outline-bullet outline-bullet-h2">
                  <a class="page-link page-link-h2" href="#">Two</a>

                  <ol class="outline-section outline-section-3">
                    <li class="outline-bullet outline-bullet-h3">
                      <a class="page-link page-link-h3" href="#">Three</a>

                      <ol class="outline-section outline-section-4">
                        <li class="outline-bullet outline-bullet-h4">
                          <a class="page-link page-link-h4" href="#">Four</a>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

});
