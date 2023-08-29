const getBook = require("./data.js");

const { pages, hasMovieAdaptation } = getBook(2);

//* Ternaries Instead of If/Else Statements
const pageRange = pages > 1000 ? "over a thousand" : "less than 1000";
console.log(`The book has ${pageRange} pages.`);
console.log(
  `The book has ${hasMovieAdaptation ? "" : "not "}been adapted as a movie`
);
