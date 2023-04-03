"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("options.extract", () => {

  it("should only include the node for the table of contents", async () => {
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
      extract: true
    });

    compare(results, `
      <nav class="toc">
        <ol class="toc-level toc-level-1">
          <li class="toc-item toc-item-h1">
            <a class="toc-link toc-link-h1" href="#apple-pie-recipe">
              Apple Pie Recipe
            </a>

            <ol class="toc-level toc-level-2">
              <li class="toc-item toc-item-h2">
                <a class="toc-link toc-link-h2" href="#filling">
                  Filling
                </a>

                <ol class="toc-level toc-level-3">
                  <li class="toc-item toc-item-h3">
                    <a class="toc-link toc-link-h3" href="#preparing-the-apples">
                      Preparing the apples
                    </a>
                  </li>
                  <li class="toc-item toc-item-h3">
                    <a class="toc-link toc-link-h3" href="#preparing-the-spice-mix">
                      Preparing the spice mix
                    </a>
                  </li>
                </ol>
              </li>

              <li class="toc-item toc-item-h2">
                <a class="toc-link toc-link-h2" href="#crust">
                  Crust
                </a>

                <ol class="toc-level toc-level-3">
                  <li class="toc-item toc-item-h3">
                    <a class="toc-link toc-link-h3" href="#preparing-the-dough">
                      Preparing the dough
                    </a>
                  </li>
                  <li class="toc-item toc-item-h3">
                    <a class="toc-link toc-link-h3" href="#the-criss-cross-top">
                      The criss-cross top
                    </a>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </nav>
    `);
  });

  it("should return an empty div for falsy customizeTOC returns", async () => {
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
      extract: true,
      customizeTOC: () => false
    });

    compare(results, "<div></div>");
  });
});
