const getBook = require("./data.js");

const { title, pages, author, publicationDate } = getBook(1);

//* Template Literals
const summary = `${title}, a ${pages}-page book ${author} and publiched in ${
  publicationDate.split("-")[0]
}`;
console.log(summary);
