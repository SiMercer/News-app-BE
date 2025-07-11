const devData = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
  console.log(' Running seed...');
  return seed(devData).then(() => {
    console.log(' Seeding complete.');
    db.end();
  });
};

runSeed();
