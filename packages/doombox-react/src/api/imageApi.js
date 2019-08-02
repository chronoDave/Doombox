// Types
const { ipcRenderer } = window.require('electron');

export const createImage = image => {
  // ipcRenderer.send(asyncActionPending(crudActionCreate((IMAGE))), image);

  // return new Promise((resolve, reject) => {
  //   ipcRenderer.on(
  //     asyncActionSuccess(crudActionCreate((IMAGE))),
  //     (event, payload) => resolve(payload)
  //   );
  //   ipcRenderer.on(
  //     asyncActionError(crudActionCreate((IMAGE))),
  //     (event, err) => reject(err)
  //   );
  // });
};
