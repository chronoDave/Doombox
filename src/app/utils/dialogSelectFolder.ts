import { dialog } from 'electron';

export default () => dialog.showOpenDialog({
  title: 'Select folder',
  properties: [
    'multiSelections',
    'createDirectory',
    'openDirectory'
  ]
})
  .then(x => x.filePaths);
