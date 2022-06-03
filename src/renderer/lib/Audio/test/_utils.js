const sinon = require('sinon');

const Audio = require('./build').default;

module.exports = noInstance => {
  const audio = new Audio();

  sinon.replace(audio, 'create', sinon.fake());
  if (!noInstance) {
    audio.instance = {
      play: sinon.fake(),
      pause: sinon.fake(),
      seek: sinon.fake(),
      mute: sinon.fake(),
      volume: sinon.fake()
    };
  }

  return audio;
};
