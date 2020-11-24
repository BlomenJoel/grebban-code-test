export const createPieces = (initialLength) => {
  let initialPieces = [];
  for (let index = 1; index < initialLength; index++) {
    initialPieces.push({ number: index });
  }
  initialPieces.push({ number: 0 });
  return initialPieces;
};

export const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const checkWin = (pieces) => {
  for (let i = 0; i < pieces.length - 2; i++) {
    if (!pieces[i].number || pieces[i].number > pieces[i + 1].number) {
      return false;
    }
  }
  return true;
};

export const allowedMove = (index, picked, rows, columns) => {
  console.log(
    "empty space is at",
    index,
    "and we want to move it to",
    picked.index
  );
  const { counter, row, column } = getCurrentColumnRow(picked, rows, columns);
  let allowedMoves = [];
  console.log("empty space is at column", column, "and row", row);
  allowedMoves = getAllowedMove(counter, row, rows, columns);
  allowedMoves = allowedMoves.concat(
    getAllowedMove(counter, column, columns, 1)
  );
  console.log("allowed moves are", allowedMoves);
  return allowedMoves.includes(index);
};

export const getCurrentColumnRow = (picked, rows, columns) => {
  let column;
  let row;
  let counter = 0;

  for (row = 0; row < rows; row++) {
    for (column = 0; column < columns; column++) {
      if (picked.index === counter) {
        return { counter, row, column };
      }
      counter++;
    }
  }
};

export const getAllowedMove = (counter, currentAxis, totalAxis, adjuster) => {
  let allowedMoves = [];
  switch (currentAxis) {
    case 0:
      allowedMoves.push(counter + adjuster);
      break;
    case totalAxis:
      allowedMoves.push(counter - adjuster);
      break;
    default:
      allowedMoves.push(counter + adjuster);
      allowedMoves.push(counter - adjuster);
      break;
  }
  return allowedMoves;
};
