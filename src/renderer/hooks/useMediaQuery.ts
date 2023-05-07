import type { Component } from 'forgo';

export default <T extends string>(queries: T[]) =>
  (onmatch: (i: number) => void) =>
    (component: Component) => {
      const controller = new AbortController();
      const mqls = queries.map(query => window.matchMedia(query));

      component.mount(() => {
        mqls.forEach((mql, i) => mql.addEventListener('change', () => {
          onmatch(mql.matches ? i : i - 1);
          component.update();
        }, { signal: controller.signal }));
      });

      component.unmount(() => {
        controller.abort();
      });

      const active = (mqls.length - 1) - [...mqls].reverse().findIndex(mql => mql.matches);
      onmatch(active);

      return component;
    };
