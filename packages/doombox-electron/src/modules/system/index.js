const { ipcMain } = require('electron');

// Types
const {
  actionPending
} = require('@doombox/utils/types/asyncTypes');
const {
  actionRead
} = require('@doombox/utils/types/crudTypes');
const {
  CONNECTION_CACHE
} = require('@doombox/utils/types');

// Controllers
const pouchController = require('./controllers/pouchController');
const mongooseController = require('./controllers/mongooseController');

const systemRouter = store => {
  ipcMain.on(actionPending(actionRead(CONNECTION_CACHE)), event => {
    const connection = store.get('connection');

    if (!connection || connection.local) return pouchController.connect(event, store);
    return mongooseController.connect(event, connection.path);
  });
};

const systemCleanup = () => {
  ipcMain.removeAllListeners([
    actionPending(actionRead(CONNECTION_CACHE))
  ]);
};

module.exports = {
  systemRouter,
  systemCleanup
};

// module.exports = {
//   systemListener(store) {
//     ipcMain.on(asyncActionPending(CREATE_CONNECTION), async (event, payload) => {
//       const { path, local } = payload;

//       if (local) {
//         pouchController.connect(event);
//       } else {
//         mongooseController.connect(path);
//       }
//     });
//     // ipcMain.on(asyncActionPending(GET_CONNECTION_CACHE), async event => {
//     //   const user = store.get('user');
//     //   try {
//     //     await mongoose.disconnect();
//     //     await mongoose.connect(user.database, { useNewUrlParser: true });
//     //     mongoose.set('useFindAndModify', false);

//     //     event.sender.send(asyncActionSuccess(GET_CONNECTION_CACHE));
//     //   } catch (err) {
//     //     if (user) {
//     //       event.sender.send(asyncActionError(GET_CONNECTION), {
//     //         ...err,
//     //         address: user.database
//     //       });
//     //     } else {
//     //       event.sender.send(asyncActionError(GET_CONNECTION_CACHE));
//     //     }
//     //   }
//     // });
//     // ipcMain.on(asyncActionPending(CREATE_CONNECTION), async (event, url) => {
//     //   try {
//     //     await mongoose.disconnect();
//     //     await mongoose.connect(url, { useNewUrlParser: true });
//     //     mongoose.set('useFindAndModify', false);

//     //     event.sender.send(asyncActionSuccess(CREATE_CONNECTION));
//     //   } catch (err) {
//     //     event.sender.send(asyncActionError(CREATE_CONNECTION), err);
//     //   }
//     // });
//     // ipcMain.on(asyncActionPending(UPDATE_CONNECTION), async (event, url) => {
//     //   try {
//     //     await mongoose.disconnect();
//     //     await mongoose.connect(url, { useNewUrlParser: true });
//     //     mongoose.set('useFindAndModify', false);

//     //     const user = store.get('user');
//     //     await User.findByIdAndUpdate(user.id, { database: url });
//     //     const newUser = await User.findById(user.id)
//     //       .populate('avatar')
//     //       .populate('background')
//     //       .lean();

//     //     store.set('user', { ...user, database: url });

//     //     event.sender.send(asyncActionSuccess(UPDATE_CONNECTION), {
//     //       ...newUser,
//     //       _id: newUser._id.toString()
//     //     });
//     //   } catch (err) {
//     //     event.sender.send(asyncActionError(UPDATE_CONNECTION), err);
//     //   }
//     // });
//   }
// };
