// Types
import {
  CREATE_IMAGE,
  CREATE_USER
} from '../../../../utils/types/create';
import {
  RECEIVE_IMAGE,
  RECEIVE_USER
} from '../../../../utils/types/receive';

// Utils
import { isEmptyObj } from '../utils';

const { ipcRenderer } = window.require('electron');

export const createImage = ({ image }) => {
  ipcRenderer.send(CREATE_IMAGE, `mutation createImage {
    createImage(input: {
      lastModified: ${image.lastModified},
      lastModifiedDate: ${JSON.stringify(image.lastModifiedDate)},
      name: ${JSON.stringify(image.name)},
      path: ${JSON.stringify(image.path)},
      size: ${image.size},
      type: ${JSON.stringify(image.type)},
    }) { _id }
  }`);

  return new Promise((resolve, reject) => {
    ipcRenderer.on(RECEIVE_IMAGE, (event, payload) => {
      if (payload.errors) reject(payload.errors);
      resolve(payload.data.createImage);
    });
  });
};

export const createUser = async ({
  username, avatar
}) => {
  let image;
  if (avatar && !isEmptyObj(avatar)) {
    try {
      image = await createImage({ image: avatar });
    } catch (err) {
      if (/\bIMAGE_ID-\b/.test(err[0].message)) {
        // Image already exists
        image = { _id: err[0].message.split('-')[1] };
      } else {
        throw err;
      }
    }
  }

  ipcRenderer.send(CREATE_USER, `mutation createUser {
    createUser(input: {
      username: ${JSON.stringify(username)}
      avatar: ${image ? JSON.stringify(image._id) : null}
    }) { _id, username }
  }`);

  return new Promise((resolve, reject) => {
    ipcRenderer.on(RECEIVE_USER, (event, payload) => {
      if (payload.errors) reject(payload.errors);
      resolve(payload.data.createUser);
    });
  });
};
