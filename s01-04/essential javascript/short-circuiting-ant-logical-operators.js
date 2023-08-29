const getBook = require("./data.js");

//* Short-Circuiting and Logical Operators: &&, ||, ??
//* falsy values: false, 0, "", null, undefined, NaN

//* &&: AND
/**
 * true && print = print
 * false && print = not print
 */
// if first operand is truthy, return second operand
console.log("\n&&: AND");
console.log(true && "This string will be printed");
console.log(false && "This string will not be printed!");
console.log(
  getBook(1).hasMovieAdaptation && "This book has a movie adaptation"
);

//falsy values
console.log("jonas" && "This string will be printed");
console.log(false && "This string will not be printed!");
console.log(0 && "This string will not be printed!");
console.log("" && "This string will not be printed!");
console.log(null && "This string will not be printed!");
console.log(undefined && "This string will not be printed!");
console.log(NaN && "This string will not be printed!");

//* ||: OR
/**
 * true || print = true
 * false || print = print
 */
console.log("\n||: OR");
console.log(true || "This string will not be printed!");
console.log(false || "This string will be printed");

const book2 = getBook(2);
console.log(book2.translations.spanish);
console.log(book2.translations.spanish || "No translation!");

console.log(book2.reviews.librarything.reviewsCount);
console.log(book2.reviews.librarything.reviewsCount || "No reviews yet!");

const book1 = getBook(1);
console.log(book1.reviews.librarything.reviewsCount || "No reviews yet!");

//* ??: Nullish Coalescing Operator
/**
 * same as ||, but only if the first operand is 0 result will be 0
 */
console.log("\n??: Nullish Coalescing Operator");
console.log(true ?? "This string will not be printed!");
console.log(false ?? "This string will not be printed!");

console.log(book2.translations.spanish);
console.log(book2.translations.spanish ?? "No translation!");

console.log(book2.reviews.librarything.reviewsCount);
console.log(book2.reviews.librarything.reviewsCount ?? "No reviews yet!");

console.log(book1.reviews.librarything.reviewsCount);
console.log(book1.reviews.librarything.reviewsCount ?? "No reviews yet!");
