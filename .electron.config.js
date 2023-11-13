const fs = require('fs');
const path = require('path');

fs.rmSync(path.resolve(__dirname, 'dist'), { force: true, recursive: true });

const crawlDeps = dep => {
  const deps = [dep];
  const files = [];

  while (deps.length > 0) {
    const dep = deps.pop();
    const package = path.resolve(__dirname, `node_modules/${dep}/package.json`);
    const json = JSON.parse(fs.readFileSync(package, 'utf-8'));
  
    files.push({
      from: `node_modules/${dep}`,
      to: `node_modules/${dep}`,
      filter: [
        'package.json',
        'LICENSE',
        ...(json.files ?? [json.main ?? 'index.js'])
      ]
    });

    if (json.dependencies) {
      const cDeps = Object.keys(json.dependencies)
        .map(dep => {
          const rPackage = path.resolve(__dirname, `node_modules/${dep}/package.json`);

          // Nested node_modules folder
          if (fs.existsSync(rPackage)) return dep;
          return `${json.name}/node_modules/${dep}`
        })
        // Remove dupes
        .filter(dep => !files.some(file => file.from === `node_modules/${dep}`))

      deps.push(...cDeps)
    }
  }

  return files;
};

module.exports = {
  appId: 'com.electron.doombox',
  productName: 'Doombox',
  copyright: `Copyright © 2019-${new Date().getFullYear()} \${author}`,
  extraMetadata: {
    main: 'app.js'
  },
  directories: {
    output: path.resolve(__dirname, 'dist')
  },
  files: [
    '!**/*',
    'LICENSE',
    'package.json',
    { from: 'build/app' },
    { from: 'node_modules/sharp/build', to: 'node_modules/sharp/build' },
    { from: 'node_modules/kuromoji/dict', to: 'assets/dict' },
    ...crawlDeps('sharp')
  ],
  npmRebuild: false,
  // Windows
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
    uninstallDisplayName: '${productName} ${version}'
  },
  win: {
    target: [
      { target: 'nsis', arch: 'x64' },
      { target: 'portable', arch: 'x64' }
    ],
    icon: path.resolve(__dirname, 'build/app/assets/app.ico'),
    publisherName: 'Chronocide'
  },
}
