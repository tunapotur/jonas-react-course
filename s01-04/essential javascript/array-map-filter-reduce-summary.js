const values = [1, 3, 5, 7, 9];

const mapValues = values.map((value) => value * 2);
const filterValues = values.filter((value) => value > 5);
const reduceValues = values.reduce((acc, current) => acc + current);

console.log(mapValues);
console.log(filterValues);
console.log(reduceValues);
