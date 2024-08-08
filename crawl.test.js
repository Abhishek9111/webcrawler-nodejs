const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocol", () => {
  const input = "htttps://google.com/path";
  const actual = normalizeUrl(input);
  const expected = "google.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip trailing slash", () => {
  const input = "htttps://google.com/path/";
  const actual = normalizeUrl(input);
  const expected = "google.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl capitals", () => {
  const input = "htttps://google.com/path/";
  const actual = normalizeUrl(input);
  const expected = "google.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeUrl strip http", () => {
  const input = "htttp://google.com/path/";
  const actual = normalizeUrl(input);
  const expected = "google.com/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const input = `
    <html>
    <body>
    <a href="https://google.com/path/">Yo</a></body>
    <html>`;
  const inputBaseURl = "https://google.com/path/";
  const actual = getURLsFromHTML(input, inputBaseURl);
  const expected = ["https://google.com/path/"];

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const input = `
    <html>
    <body>
    <a href="/path/">Yo</a></body>
    <html>`;
  const inputBaseURl = "https://google.com";
  const actual = getURLsFromHTML(input, inputBaseURl);
  const expected = ["https://google.com/path/"];

  expect(actual).toEqual(expected);
});
