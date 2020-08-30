const fse = require('fs-extra');
const path = require('path');

fse.removeSync(path.resolve(__dirname, '../../../dist'));
