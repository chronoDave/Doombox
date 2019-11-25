const fs = require('fs');
const path = require('path');

const { PATH } = require('../utils/const');

const createLog = (name, text) => fs.writeFileSync(
  path.join(PATH.LOG, `${name}_${new Date().getTime()}.txt`),
  text
);

const createLogError = err => createLog(
  'error',
  JSON.stringify(err, Object.getOwnPropertyNames(err))
);

module.exports = {
  createLog,
  createLogError
};
