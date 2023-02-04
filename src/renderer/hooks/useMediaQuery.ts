import type { Component } from 'forgo';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Breakpoint = `${Size}-w` | `${Size}-h`;

export type Axis = 'min-width' | 'max-width' | 'min-height' | 'max-height';

export const BREAKPOINTS: Record<Breakpoint, number> = {
  'xs-w': 320,
  'sm-w': 480,
  'md-w': 720,
  'lg-w': 960,
  'xl-w': 1280,
  'xs-h': 240,
  'sm-h': 320,
  'md-h': 480,
  'lg-h': 720,
  'xl-h': 960
} as const;

export const useMediaQuery = (axis: Axis, breakpoint: Breakpoint) =>
  (cb: (matches: boolean) => void) =>
    (component: Component) => {
      const { abort, signal } = new AbortController();
      const mql = window.matchMedia(`(${axis}: ${BREAKPOINTS[breakpoint]}px)`);

      component.mount(() => {
        mql.addEventListener('change', e => {
          cb(e.matches);
          component.update();
        }, { signal });
      });

      component.unmount(() => {
        abort();
      });

      cb(mql.matches);
      queueMicrotask(() => component.update());
    };

export const useMediaQueryList = <T extends Breakpoint>(axis: Axis, breakpoints: T[]) =>
  (cb: (breakpoint: T, i: number, arr: T[]) => void) =>
    (component: Component) => {
      const controller = new AbortController();
      const mqls = breakpoints.slice(1).map(breakpoint => window.matchMedia(`(${axis}: ${BREAKPOINTS[breakpoint]}px)`));

      component.mount(() => {
        mqls.forEach((mql, i) => {
          mql.addEventListener('change', e => {
            const index = e.matches ? i + 1 : i;
            cb(breakpoints[index], index, breakpoints);
            component.update();
          }, { signal: controller.signal });
        });
      });

      component.unmount(() => {
        controller.abort();
      });

      let i = mqls.findIndex(mql => !mql.matches);
      if (i === -1) i = breakpoints.length - 1;
      cb(breakpoints[i], i, breakpoints);
      queueMicrotask(() => component.update());
    };
