function printReport(pages) {
  console.log("==========================");
  console.log("**********REPORT**********");
  console.log("==========================");

  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    console.log(`Found ${sortedPage[1]} links to page ${sortedPage[0]}`);
  }

  console.log("==========================");
  console.log("*********END OF REPORT REPORT**********");
  console.log("==========================");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    //geting value for hits
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = { sortPages, printReport };
