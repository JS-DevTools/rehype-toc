"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("options.headings", () => {

  it("should only include the specified headings in the TOC", async () => {
    let results = await process(`
      <html>
        <body>
          <h1>Apple Pie Recipe</h1>
          <p>This is the world's best apple pie recipe...</p>

          <div>
            <h2>Filling</h2>
            <p>The filling is the best part...</p>

            <h3>Preparing the apples</h3>
            <p>Cut the apples into 1/4 inch slices...</p>

            <h3>Preparing the spice mix</h3>
            <p>In a mixing bowl, combine sugar, cinnamon...</p>
          </div>

          <div>
            <h2>Crust</h2>
            <p>How to make the perfect flaky crust...</p>

            <h3>Preparing the dough</h3>
            <p>Combine flour, sugar, salt...</p>

            <h3>The criss-cross top</h3>
            <p>Cut the top crust into 1/2 inch strips...</p>
          </div>
        </body>
      </html>
    `,
    {
      slug: true,
      headings: ["h1", "h2"],
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1">
            <li class="toc-item toc-item-h1">
              <a class="toc-link toc-link-h1" href="#apple-pie-recipe">
                Apple Pie Recipe
              </a>

              <ol class="toc-level toc-level-2">
                <li class="toc-item toc-item-h2">
                  <a class="toc-link toc-link-h2" href="#filling">
                    Filling
                  </a>
                </li>
                <li class="toc-item toc-item-h2">
                  <a class="toc-link toc-link-h2" href="#crust">
                    Crust
                  </a>
                </li>
              </ol>
            </li>
          </ol>

          <h1 id="apple-pie-recipe">Apple Pie Recipe</h1>
          <p>This is the world's best apple pie recipe...</p>

          <div>
            <h2 id="filling">Filling</h2>
            <p>The filling is the best part...</p>

            <h3 id="preparing-the-apples">Preparing the apples</h3>
            <p>Cut the apples into 1/4 inch slices...</p>

            <h3 id="preparing-the-spice-mix">Preparing the spice mix</h3>
            <p>In a mixing bowl, combine sugar, cinnamon...</p>
          </div>

          <div>
            <h2 id="crust">Crust</h2>
            <p>How to make the perfect flaky crust...</p>

            <h3 id="preparing-the-dough">Preparing the dough</h3>
            <p>Combine flour, sugar, salt...</p>

            <h3 id="the-criss-cross-top">The criss-cross top</h3>
            <p>Cut the top crust into 1/2 inch strips...</p>
          </div>
        </body>
      </html>
    `);
  });

  it("should follow document order, not options order", async () => {
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
      headings: ["h3", "h5", "h1", "h6", "h4", "h2"],
    });

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

  it("should allow heading levels to be skipped", async () => {
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
      headings: ["h2", "h4"],
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1">
            <li class="toc-item toc-item-h2">
              <a class="toc-link toc-link-h2" href="#">Two</a>

              <ol class="toc-level toc-level-2">
                <li class="toc-item toc-item-h4">
                  <a class="toc-link toc-link-h4" href="#">Four</a>
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

  it("should build an empty TOC if no headings match the list", async () => {
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
      headings: ["h5", "h6"],
    });

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1">
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
