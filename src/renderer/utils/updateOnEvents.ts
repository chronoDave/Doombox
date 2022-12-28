import type { Component } from 'forgo';

import { emitter } from '../state/state';

export default (component: Component, channels: string[]) => {
  const update = () => component.update();

  component.mount(() => {
    channels.forEach(channel => emitter.on(channel, update));
  });

  component.unmount(() => {
    channels.forEach(channel => emitter.off(channel, update));
  });
};
