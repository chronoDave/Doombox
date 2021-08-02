const path = require('path');
const fs = require('fs');

const dist = path.resolve(__dirname, '../dist');

if (fs.existsSync(dist)) fs.rmdirSync(dist, { recursive: true });
