const utils = require('./utils');

const ships = {
  // Carrier: 5,
  // Battleship: 4,
  // Cruiser: 3,
  // Submarine: 3,
  Destroyer: 2
};
const colMap = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9
};
const rowMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9
};
const cols = Object.keys(colMap);
const rows = Object.keys(rowMap);

let players = [
  utils.nullMatrix(rows.length, cols.length),
  utils.nullMatrix(rows.length, cols.length)
];

players.forEach((player, index) => {
  for (let ship in ships) {
    console.log('Player ' + index + ' ships:');
    utils.printShipsGrid(player, rows, cols);

    console.log('Player ' + index + ', place your ' + ship + '(' + ships[ship] + ' units)');
    console.log('Enter start and end coordinates in the format "A5"');
    while (true) {
      let start = utils.ask('Start? ');
      if (!utils.verifyCoordinates(start, rowMap, colMap, rows, cols)) {
        continue;
      }
      let end = utils.ask('End? ');
      if (!utils.verifyCoordinates(end, rowMap, colMap, rows, cols)) {
        continue;
      }

      let startCol = colMap[start.charAt(0).toUpperCase()];
      let endCol = colMap[end.charAt(0).toUpperCase()];
      let startRow = rowMap[start.charAt(1)];
      let endRow = rowMap[end.charAt(1)];

      if (startCol !== endCol && startRow !== endRow) {
        console.log('Invalid placement. Ship must lie on a row or a column, no diagonals please.');
        continue;
      }
      if (Math.abs(startCol - endCol) + 1 !== ships[ship] && Math.abs(startRow - endRow) + 1 !== ships[ship]) {
        console.log('Invalid size. ' + ship + ' is ' + ships[ship] + ' units long.');
        continue;
      }

      let invalid = false;
      if (startCol === endCol) {
        for (let i = Math.min(startRow, endRow); i <= Math.max(startRow, endRow); ++i) {
          if (player[i][startCol]) {
            invalid = true;
          }
        }
      } else {
        for (let i = Math.min(startCol, endCol); i <= Math.max(startCol, endCol); ++i) {
          if (player[startRow][i]) {
            invalid = true;
          }
        }
      }
      if (invalid) {
        console.log('Invalid location. Must not overlap with a ship that has already been placed.');
        continue;
      }

      if (startCol === endCol) {
        for (let i = Math.min(startRow, endRow); i <= Math.max(startRow, endRow); ++i) {
          player[i][startCol] = ship;
        }
      } else {
        for (let i = Math.min(startCol, endCol); i <= Math.max(startCol, endCol); ++i) {
          player[startRow][i] = ship;
        }
      }
      break;
    }
  }
  console.log('Player ' + index + ' ships:');
  utils.printShipsGrid(player, rows, cols);
  utils.ask('Press enter to continue.');
  utils.clearConsole();
});

let currentTurn = 0;
