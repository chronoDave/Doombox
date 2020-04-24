const { Client } = require('discord-rpc');

module.exports = class RpcController {
  constructor(logger, options) {
    this.log = logger;
    this.token = options.token;

    this.connected = false;
    this.client = null;

    if (this.token) this.initialize();
  }

  initialize() {
    this.client = new Client({ transport: 'ipc' });

    this.client.login({ clientId: this.token })
      .then(() => { this.connected = true; })
      .catch(err => { this.log.createLogError(err, 'Discord'); });

    this.client.on('error', err => {
      this.log.createLogError(err, 'Discord');
    });
  }

  create(event, { data }) {
    if (this.client) this.client.destroy();
    this.connected = false;
    this.client = new Client({ transport: 'ipc' });

    this.client.login({ clientId: data.payload })
      .then(() => {
        this.connected = true;
      })
      .catch(err => {
        this.connected = false;
        this.log.createLogError(err, 'Discord');
      });
  }

  update(event, { data }) {
    if (this.connected) {
      this.client.setActivity(data.update);
    }
  }
};
