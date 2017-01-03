const prompt = require('prompt');

module.exports.ask = function(...questions) {
  return new Promise((resolve, reject) => {
    prompt.get(questions, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
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