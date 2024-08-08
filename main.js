const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");
async function main() {
  //1st is name of program, second is the name of entry poin file, third will be the url
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  } else if (process.argv.length > 3) {
    //only run for 1 url
    console.log("too many urls");
    process.exit(1);
  }
  const baseUrl = process.argv[2];
  console.log("starting crawl", baseUrl);
  const pages = await crawlPage(baseUrl, baseUrl, {});
  //   for (const page of Object.entries(pages)) {
  //      console.log("apage", page);
  //   }
  printReport(pages);
}

main();
