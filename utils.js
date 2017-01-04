const readlineSync = require('readline-sync');

module.exports.ask = function(question) {
  return readlineSync.question(question);
};

module.exports.clearConsole = function() {
  console.log('\x1Bc');
};

module.exports.printShipsGrid = function(grid, rows, cols) {
  let top = '  |';
  cols.forEach((col, index) => top += ' ' + col + ' |');
  console.log(top);
  rows.forEach((row, rowIndex) => {
    let current = row + ' |';
    cols.forEach((col, colIndex) => current += ' ' + (grid[rowIndex][colIndex] ? 'X' : ' ') + ' |');
    console.log(current);
  });
};

module.exports.verifyCoordinates = function(coords, rowMap, colMap, rows, cols) {
  if (coords.length !== 2) {
    console.log('Invalid coordinate format. Should look like "D7"');
    return false;
  }
  if (colMap[coords.charAt(0).toUpperCase()] === undefined) {
    console.log('Invalid column. Valid options are ' + cols[0] + ' through ' + cols[cols.length - 1] + '.');
    return false;
  }
  if (rowMap[coords.charAt(1)] === undefined) {
    console.log('Invalid row. Valid options are ' + rows[0] + ' through ' + rows[rows.length - 1] + '.');
    return false;
  }

  return true;
};

module.exports.nullMatrix = function(rows, cols) {
  let result = [];
  for (let i = 0; i < rows; ++i) {
    result.push([]);
    for (let j = 0; j < cols; ++j) {
      result[i].push(null);
    }
  }
  return result;
};