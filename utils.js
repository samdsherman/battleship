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