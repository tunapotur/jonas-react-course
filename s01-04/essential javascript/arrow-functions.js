const getBook = require("./data.js");

//* Arrow Functions
const { publicationDate } = getBook(1);

function f_getYear(str) {
  return str.split("-")[0];
}

// instead of
const getYear = (str) => str.split("-")[0];

console.log(f_getYear(publicationDate));
console.log(getYear(publicationDate));
