const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLOBJ = new URL(baseURL);
  const currentURLOBJ = new URL(currentURL);
  if (baseURLOBJ.hostname != currentURLOBJ.hostname) {
    return pages;
  }
  const normalizedCurrentURL = normalizeUrl(currentURL);

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`actively crawling ${currentURL}`);

  try {
    const res = await fetch(currentURL);

    if (res.status > 399) {
      console.error(
        `error in fetch with status code ${res.status} on ${currentURL}`
      );
      return pages;
    }
    const contentType = res.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.error(
        `error in fetch, non html response type:${contentType} on ${currentURL}`
      );
      return pages;
    }
    // console.log("res", await res.text());
    const htmlBody = await res.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.error("Error in fetching url", error);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    //checking relative urls
    if (linkElement.href.slice(0, 1) == "/") {
      try {
        const urlObj = new URL(baseURL + linkElement.href);
        urls.push(urlObj.href);
      } catch (errr) {
        console.error("error", errr);
      }
    } else {
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.error("error", err);
      }
    }
  }
  return urls;
}
function normalizeUrl(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname.toLowerCase()}${urlObj.pathname.toLowerCase()}`;
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    //checking for slash
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = { normalizeUrl, getURLsFromHTML, crawlPage };
