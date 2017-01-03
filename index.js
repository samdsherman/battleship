const utils = require('./utils');

const ships = {
  Carrier: 5,
  Battleship: 4,
  Cruiser: 3,
  Submarine: 3,
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

let player1 = [];
let player2 = [];

for (let i = 0; i < rows.length; ++i) {
  player1.push([]);
  player2.push([]);
  for (let j = 0; j < cols.length; ++j) {
    player1[i].push(null);
    player2[i].push(null);
  }
}

for (let ship in ships) {
  console.log('Player 1 ships:');
  utils.printShipsGrid(player1, rows, cols);

  console.log('Player 1, place your ' + ship + '(' + ships[ship] + ' units)');
  console.log('Enter start and end coordinates in the format "A5"');
  while (true) {
    let start = utils.ask('Start? ');
    let end = utils.ask('End? ');

    if (start.length !== 2 || end.length !== 2) { // problem with extensibility
      console.log('Invalid coordinate format. Should look like "D7"');
      continue;
    }

    let startCol = colMap[start.charAt(0).toUpperCase()];
    let endCol = colMap[end.charAt(0).toUpperCase()];
    let startRow = rowMap[start.charAt(1)];
    let endRow = rowMap[end.charAt(1)];

    if (startCol === undefined || endCol === undefined) {
      console.log('Invalid column. Valid options are ' + cols[0] + ' through ' + cols[cols.length - 1] + '.');
      continue;
    }
    if (startRow === undefined || endRow === undefined) {
      console.log('Invalid row. Valid options are ' + rows[0] + ' through ' + rows[rows.length - 1] + '.');
      continue;
    }
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
        if (player1[i][startCol]) {
          invalid = true;
        }
      }
    } else {
      for (let i = Math.min(startCol, endCol); i <= Math.max(startCol, endCol); ++i) {
        if (player1[startRow][i]) {
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
        player1[i][startCol] = ship;
      }
    } else {
      for (let i = Math.min(startCol, endCol); i <= Math.max(startCol, endCol); ++i) {
        player1[startRow][i] = ship;
      }
    }
    break;
  }
}