const fse = require('fs-extra');
const path = require('path');

// Clean dist folder
fse.removeSync(path.resolve(__dirname, '../dist'));
