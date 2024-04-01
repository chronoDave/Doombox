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

      let matches = mqls.length - 1;
      for (let i = 0; i < mqls.length; i += 1) {
        if (!mqls[i].matches) {
          matches = i - 1;
          break;
        }
      }
      onmatch(matches);

      return component;
    };
