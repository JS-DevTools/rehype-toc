"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("options.cssClasses", () => {

  it("should use the custom CSS classes instead of defaults", async () => {
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
          <nav class="outline">
            <ol class="outline-section outline-section-1">
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
          </nav>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `);
  });

  it("should omit CSS classes that are explicitly set to a falsy value", async () => {
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
      cssClasses: {
        toc: "",
        list: false,
        listItem: 0,
        link: null
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <nav>
            <ol>
              <li>
                <a href="#">One</a>

                <ol>
                  <li>
                    <a href="#">Two</a>

                    <ol>
                      <li>
                        <a href="#">Three</a>

                        <ol>
                          <li>
                            <a href="#">Four</a>
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

  it("should use the default CSS classes for any that aren't specified", async () => {
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
      cssClasses: {
        list: "outline-section",
        listItem: undefined,
        link: "page-link"
      },
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <nav class="toc">
            <ol class="outline-section outline-section-1">
              <li class="toc-item toc-item-h1">
                <a class="page-link page-link-h1" href="#">One</a>

                <ol class="outline-section outline-section-2">
                  <li class="toc-item toc-item-h2">
                    <a class="page-link page-link-h2" href="#">Two</a>

                    <ol class="outline-section outline-section-3">
                      <li class="toc-item toc-item-h3">
                        <a class="page-link page-link-h3" href="#">Three</a>

                        <ol class="outline-section outline-section-4">
                          <li class="toc-item toc-item-h4">
                            <a class="page-link page-link-h4" href="#">Four</a>
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

});
