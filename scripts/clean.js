const path = require('path');
const fs = require('fs');

fs.rmdirSync(path.resolve(__dirname, '../dist'), { recursive: true });
