const getBook = require("./data.js");

//* Destructuring Objects and Arrays

const book = getBook(2);

// destructuring object.
/* 
const title = book.title;
const author = book.author; 
*/
// This usage is more convenient than the above
const { title, author, pages, publicationDate, genres, hasMovieAdaptation } =
  book;

console.log(title, author, genres);

// destructuring array
/* const primaryGenre = genres[0];
const secondaryGenre = genres[1]; */
const [primaryGenre, secondaryGenre] = genres;

console.log(primaryGenre, secondaryGenre);
