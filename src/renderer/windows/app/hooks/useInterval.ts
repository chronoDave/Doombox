import type { Component } from 'forgo';

export const useInterval = (cb: () => void, n: number) =>
  (component: Component) => {
    let interval: number;

    component.mount(() => {
      interval = window.setInterval(() => {
        cb();
        component.update();
      }, n);
    });

    component.unmount(() => {
      window.clearInterval(interval);
    });
  };
