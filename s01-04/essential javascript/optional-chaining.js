const getBook = require("./data.js");

//* Optional Chaining
// if we use ?. it will return undefined instead of error.
function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;

  // if reviewsCount doesn't exist, this line will return 0
  const librarything = book.reviews.librarything?.reviewsCount ?? 0;

  return goodreads + librarything;
}

console.log(getTotalReviewCount(getBook(3)));
