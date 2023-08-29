const getBook = require("./data.js");

//* Rest and Spread Operator

const book2 = getBook(2);
const { genres } = book2;

// first, and second array elements separated to primaryGenre and secondaryGenre variables
// others array elements separated otherGenres array
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;
console.log(primaryGenre, secondaryGenre, otherGenres);

/* 
if you add new element to array this is not proper way
it will create nested array end of the operation
*/
// const newGenres = [genres, "epic fantasy"];

//* it'll create new array with new element
const newGenres = ["epic fantasy", ...genres];
console.log(newGenres);

//* it'll create new object with new property and update property value
// moviePublicationDate new property added to book1 object
// book has pages property, it'll update pages property value
const book1 = getBook(1);
const updatedBook = {
  ...book1,
  // Adding a new property
  moviePublicationDate: "2001-12-19",

  // Updating(overwriting) an existing property
  pages: 1210,
};
console.log(updatedBook);
