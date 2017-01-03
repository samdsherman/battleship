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