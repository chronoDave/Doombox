import sinon from 'sinon';

import Audio from '../Audio';

export const setup = noInstance => {
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

export const mockCollection = [
  { format: { duration: 3 } },
  { format: { duration: 6 } },
  { format: { duration: 9 } },
  { format: { duration: 12 } }
];
