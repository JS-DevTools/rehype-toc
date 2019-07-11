"use strict";

const process = require("../utils/process");
const compare = require("../utils/compare");
const { expect } = require("chai");

describe("options.position", () => {
  describe("beforebegin", () => {
    it("should insert the TOC before the <main> element", async () => {
      let results = await process(`
        <html>
          <body>
            <header>This is the header</header>
            <main>This is the content</main>
            <footer>This is the footer</footer>
          </body>
        </html>
      `,
      {
        position: "beforebegin",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <header>This is the header</header>
            <nav class="toc">
              <ol class="toc-level toc-level-1"></ol>
            </nav>
            <main>This is the content</main>
            <footer>This is the footer</footer>
          </body>
        </html>
      `);
    });

    it("should insert the TOC before the <main> element, even if it's the first element", async () => {
      let results = await process(`
        <html>
          <body>
            <main>This is the content</main>
          </body>
        </html>
      `,
      {
        position: "beforebegin",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <nav class="toc">
              <ol class="toc-level toc-level-1"></ol>
            </nav>
            <main>This is the content</main>
          </body>
        </html>
      `);
    });

    it("should insert the TOC before the <main> element, even there's text content there", async () => {
      let results = await process(`
        <html>
          <body>
            Lorem ipsum dolor sit amet...
            <main>This is the content</main>
          </body>
        </html>
      `,
      {
        position: "beforebegin",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            Lorem ipsum dolor sit amet...
            <nav class="toc">
              <ol class="toc-level toc-level-1"></ol>
            </nav>
            <main>This is the content</main>
          </body>
        </html>
      `);
    });
  });

  describe("afterbegin", () => {
    it("should insert the TOC inside the <main> element", async () => {
      let results = await process(`
        <html>
          <body>
            <header>This is the header</header>
            <main><p>This is the content</p></main>
            <footer>This is the footer</footer>
          </body>
        </html>
      `,
      {
        position: "afterbegin",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <header>This is the header</header>
            <main>
              <nav class="toc">
                <ol class="toc-level toc-level-1"></ol>
              </nav>
              <p>This is the content</p>
            </main>
            <footer>This is the footer</footer>
          </body>
        </html>
      `);
    });

    it("should insert the TOC inside the <main> element, even if it's empty", async () => {
      let results = await process(`
        <html>
          <body>
            <main></main>
          </body>
        </html>
      `,
      {
        position: "afterbegin",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <main>
              <nav class="toc">
                <ol class="toc-level toc-level-1"></ol>
              </nav>
            </main>
          </body>
        </html>
      `);
    });

    it("should insert the TOC inside the <main> element, even there's text content there", async () => {
      let results = await process(`
        <html>
          <body>
            <main>
              Lorem ipsum dolor sit amet...
            </main>
          </body>
        </html>
      `,
      {
        position: "afterbegin",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <main>
              <nav class="toc">
                <ol class="toc-level toc-level-1"></ol>
              </nav>
              Lorem ipsum dolor sit amet...
            </main>
          </body>
        </html>
      `);
    });
  });

  describe("beforeend", () => {
    it("should insert the TOC inside the <main> element", async () => {
      let results = await process(`
        <html>
          <body>
            <header>This is the header</header>
            <main><p>This is the content</p></main>
            <footer>This is the footer</footer>
          </body>
        </html>
      `,
      {
        position: "beforeend",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <header>This is the header</header>
            <main>
              <p>This is the content</p>
              <nav class="toc">
                <ol class="toc-level toc-level-1"></ol>
              </nav>
            </main>
            <footer>This is the footer</footer>
          </body>
        </html>
      `);
    });

    it("should insert the TOC inside the <main> element, even if it's empty", async () => {
      let results = await process(`
        <html>
          <body>
            <main></main>
          </body>
        </html>
      `,
      {
        position: "beforeend",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <main>
              <nav class="toc">
                <ol class="toc-level toc-level-1"></ol>
              </nav>
            </main>
          </body>
        </html>
      `);
    });

    it("should insert the TOC inside the <main> element, even there's text content there", async () => {
      let results = await process(`
        <html>
          <body>
            <main>
              Lorem ipsum dolor sit amet...
            </main>
          </body>
        </html>
      `,
      {
        position: "beforeend",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <main>
              Lorem ipsum dolor sit amet...
              <nav class="toc">
                <ol class="toc-level toc-level-1"></ol>
              </nav>
            </main>
          </body>
        </html>
      `);
    });
  });

  describe("afterend", () => {
    it("should insert the TOC after the <main> element", async () => {
      let results = await process(`
        <html>
          <body>
            <header>This is the header</header>
            <main>This is the content</main>
            <footer>This is the footer</footer>
          </body>
        </html>
      `,
      {
        position: "afterend",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <header>This is the header</header>
            <main>This is the content</main>
            <nav class="toc">
              <ol class="toc-level toc-level-1"></ol>
            </nav>
            <footer>This is the footer</footer>
          </body>
        </html>
      `);
    });

    it("should insert the TOC after the <main> element, even if it's the last element", async () => {
      let results = await process(`
        <html>
          <body>
            <main>This is the content</main>
          </body>
        </html>
      `,
      {
        position: "afterend",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <main>This is the content</main>
            <nav class="toc">
              <ol class="toc-level toc-level-1"></ol>
            </nav>
          </body>
        </html>
      `);
    });

    it("should insert the TOC after the <main> element, even there's text content there", async () => {
      let results = await process(`
        <html>
          <body>
            <main>This is the content</main>
            Lorem ipsum dolor sit amet...
          </body>
        </html>
      `,
      {
        position: "afterend",
      });

      compare(results, `
        <html>
          <head></head>
          <body>
            <main>This is the content</main>
            <nav class="toc">
              <ol class="toc-level toc-level-1"></ol>
            </nav>
            Lorem ipsum dolor sit amet...
          </body>
        </html>
      `);
    });
  });


  it("should should throw an error if set to an invalid value", async () => {
    let error;

    try {
      await process(`
        <html>
          <body>
            <main>This is the content</main>
            Lorem ipsum dolor sit amet...
          </body>
        </html>
      `,
      {
        position: "foobar",
      });
    }
    catch (e) {
      error = e;
    }

    expect(error).to.be.an.instanceOf(Error);
    expect(error.message).to.equal("Invalid table-of-contents position: foobar");
  });
});
