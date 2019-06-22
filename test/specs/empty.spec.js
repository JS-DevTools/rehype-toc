"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");

describe("Empty TOC", () => {

  it("should add an empty TOC to the <body> if the HTML is empty", async () => {
    let results = await process("");

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1"></ol>
        </body>
      </html>
    `);
  });

  it("should add an empty TOC to the <main> if the HTML is a <main> fragment", async () => {
    let results = await process("<main></main>");

    compare(results, `
      <html>
        <head></head>
        <body>
          <main>
            <ol class="toc toc-level toc-level-1"></ol>
          </main>
        </body>
      </html>
    `);
  });

  it("should add an empty TOC to the <body> if the <body> is in the <head>", async () => {
    let results = await process("<head><body></body></head>");

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1"></ol>
        </body>
      </html>
    `);
  });

  it("should add an empty TOC to the <main> if the <main> is in the <head>", async () => {
    let results = await process("<head><main></main></head>");

    compare(results, `
      <html>
        <head></head>
        <body>
          <main>
            <ol class="toc toc-level toc-level-1"></ol>
          </main>
        </body>
      </html>
    `);
  });

  it("should add an empty TOC to the <body> if there's no <main> and no headings", async () => {
    let results = await process(`
      <html>
        <body>
          <p>Lorem ipsum dolor sit amet...</p>
        </body>
      </html>
    `);

    compare(results, `
      <html>
        <head></head>
        <body>
          <ol class="toc toc-level toc-level-1"></ol>
          <p>Lorem ipsum dolor sit amet...</p>
        </body>
      </html>
    `);
  });

  it("should add an empty TOC to the <main> if there's a <main> with no headings", async () => {
    let results = await process(`
      <html>
        <body>
          <main>
            <p>Lorem ipsum dolor sit amet...</p>
          </main>
        </body>
      </html>
    `);

    compare(results, `
      <html>
        <head></head>
        <body>
          <main>
            <ol class="toc toc-level toc-level-1"></ol>
            <p>Lorem ipsum dolor sit amet...</p>
          </main>
        </body>
      </html>
    `);
  });

  it("should ignore headings outside of the <main>", async () => {
    let results = await process(`
      <html>
        <head>
          <h1>This heading is outside of the main</h1>
        </head>
        <body>
          <header>
            <h1>This heading is outside of the main</h1>
          </header>
          <main>
            <p>Lorem ipsum dolor sit amet...</p>
          </main>
          <footer>
            <h2>This heading is outside of the main</h2>
          </footer>
        </body>
      </html>
    `);

    compare(results, `
      <html>
        <head>
        </head>
        <body>
          <h1>This heading is outside of the main</h1>
          <header>
            <h1>This heading is outside of the main</h1>
          </header>
          <main>
            <ol class="toc toc-level toc-level-1"></ol>
            <p>Lorem ipsum dolor sit amet...</p>
          </main>
          <footer>
            <h2>This heading is outside of the main</h2>
          </footer>
        </body>
      </html>
    `);
  });

});
