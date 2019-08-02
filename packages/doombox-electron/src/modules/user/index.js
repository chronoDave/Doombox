const { ipcMain } = require('electron');

// Types
const {
  actionPending
} = require('@doombox/utils/types/asyncTypes');
const {
  actionCreate,
  actionUpdate,
  actionDelete
} = require('@doombox/utils/types/crudTypes');
const {
  USER
} = require('@doombox/utils/types');

// Controllers
const pouchController = require('../system/controllers/pouchController');

const userRouter = store => {
  ipcMain.on(actionPending(actionCreate(USER)), (event, payload) => {
    pouchController.create(event, ({ store, payload }));
  });
  ipcMain.on(actionPending(actionDelete(USER)), (event, payload) => {
    pouchController.remove(event, ({ store, _id: payload }));
  });
  ipcMain.on(actionPending(actionUpdate(USER)), (event, payload) => {
    pouchController.update(event, payload);
  });
};

const userCleanup = () => {
  ipcMain.removeAllListeners([
    actionPending(actionCreate(USER))
  ]);
};

module.exports = {
  userRouter,
  userCleanup
};

// module.exports = {
//   userListener(store) {
//     ipcMain.on(asyncActionPending(CREATE_USER), async (event, payload) => {
//       try {
//         const user = await User.create({ ...payload });
//         const newUser = await User
//           .findById(user._doc._id)
//           .populate('avatar')
//           .lean();

//         // Cache user
//         store.set('user', {
//           id: newUser._id,
//           database: payload.database
//         });

//         event.sender.send(asyncActionSuccess(CREATE_USER), {
//           ...newUser,
//           _id: newUser._id.toString()
//         });
//       } catch (err) {
//         event.sender.send(asyncActionError(CREATE_USER), err);
//       }
//     });
//     ipcMain.on(asyncActionPending(GET_USER_CACHE), async event => {
//       try {
//         const cachedUser = store.get('user');

//         if (cachedUser && cachedUser.id) {
//           const user = await User
//             .findById(cachedUser.id)
//             .populate('avatar')
//             .populate('background')
//             .lean();

//           event.sender.send(asyncActionSuccess(GET_USER_CACHE), {
//             ...user,
//             _id: user._id.toString()
//           });
//         } else {
//           event.sender.send(asyncActionError(GET_USER_CACHE));
//         }
//       } catch (err) {
//         event.sender.send(asyncActionError(GET_USER_CACHE, err));
//       }
//     });
//     ipcMain.on(asyncActionPending(UPDATE_USER), async (event, payload) => {
//       try {
//         const { id, values } = payload;

//         await User.findByIdAndUpdate(id, { ...values }, { omitUndefined: true });
//         const newUser = await User.findById(id)
//           .populate('avatar')
//           .populate('background')
//           .lean();

//         event.sender.send(asyncActionSuccess(UPDATE_USER), {
//           ...newUser,
//           _id: newUser._id.toString()
//         });
//       } catch (err) {
//         event.sender.send(asyncActionError(UPDATE_USER), err);
//       }
//     });
//     ipcMain.on(asyncActionPending(DELETE_USER), async (event, id) => {
//       try {
//         store.set('user', null);
//         await User.findByIdAndDelete(id);
//         event.sender.send(asyncActionSuccess(DELETE_USER));
//       } catch (err) {
//         event.sender.send(asyncActionError(DELETE_USER), err);
//       }
//     });
//   },
//   userCleanup() {
//     ipcMain.removeAllListeners([
//       asyncActionPending(CREATE_USER),
//       asyncActionPending(GET_USER_CACHE),
//       asyncActionPending(UPDATE_USER),
//       asyncActionPending(DELETE_USER)
//     ]);
//   }
// };
