const path = require('path');

const fse = require('fs-extra');

fse.removeSync(path.resolve(__dirname, '../../../dist'));
