const { TYPE } = require('@doombox/utils');
const { handleErrorIpc } = require('../utils');

module.exports = class ConfigController {
  constructor({ config }) {
    this.config = config;
    this.type = TYPE.IPC.CONFIG;
  }

  read(event, { data }) {
    if (!data.configKey) {
      return handleErrorIpc({
        event,
        type: this.type,
        err: new Error(`No configKey found in data: ${JSON.stringify(data)}`)
      });
    }

    const { darkMode, ...rest } = this.config.get(data.configKey);

    if (!data) {
      return handleErrorIpc({
        event,
        type: this.type,
        err: new Error(`${data.configKey} is not a valid configKey`)
      });
    }

    return event.sender.send(this.type, { darkMode, colors: { ...rest } });
  }
};
