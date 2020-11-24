const { checkWin, createPieces, shuffle, allowedMove } = require("./helpers");
const { invalidMoves, validMoves } = require("./test.fixtures");
const orderedPieces = [
  { number: 1 },
  { number: 2 },
  { number: 3 },
  { number: 0 },
];
const unorderedPieces = [
  { number: 2 },
  { number: 3 },
  { number: 0 },
  { number: 1 },
];

test("checkWin should be true", () => {
  expect(checkWin(orderedPieces)).toBe(true);
});

test("checkWin should be false", () => {
  expect(checkWin(unorderedPieces)).toBe(false);
});

test("createPieces should return correct Array", () => {
  expect(createPieces(4)).toEqual(orderedPieces);
});

test("shuffle", () => {
  expect(shuffle(orderedPieces)).toHaveLength(4);
});


const rows = 3;
const columns = 3;

it.each(invalidMoves)(`should be invalid moves %s`, ({ index, picked }) => {
  expect(allowedMove(index, picked, rows, columns)).toBe(false);
});
it.each(validMoves)(`should be invalid moves %s`, ({ index, picked }) => {
  expect(allowedMove(index, picked, rows, columns)).toBe(true);
});
