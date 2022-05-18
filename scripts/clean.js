const path = require('path');
const fs = require('fs');

fs.rmSync(path.resolve(__dirname, '../dist'), { recursive: true, force: true });
