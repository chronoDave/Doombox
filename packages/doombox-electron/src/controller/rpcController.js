const Rpc = require('discord-rpc');

// Utils
const { createLogError } = require('../utils');

module.exports = class RpcController {
  constructor({ discordToken }) {
    this.connected = false;

    if (discordToken) {
      this.rpc = new Rpc.Client({ transport: 'ipc' });
      this.rpc.login({ clientId: discordToken })
        .then(() => {
          this.connected = true;
        })
        .catch(createLogError);
      this.rpc.on('error', createLogError);
    }
  }

  update(event, { data }) {
    if (this.connected) {
      this.rpc.setActivity(data);
    }
  }
};
