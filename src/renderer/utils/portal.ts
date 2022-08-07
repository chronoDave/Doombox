import * as forgo from 'forgo';

/**
 * @deprecated Does not fire `unmount()` event
 */
export default (anchor: HTMLElement, element: forgo.ForgoComponentCtor) => {
  let unmounted = false;
  let unmount: () => void;

  const portal = () => {
    const component = new forgo.Component({
      render() {
        if (unmounted) return null;
        return element;
      }
    });

    unmount = () => {
      unmounted = true;
      component.update();
    };

    return component;
  };

  const { node } = forgo.render(forgo.createElement(portal, {}));
  queueMicrotask(() => anchor.appendChild(node));
  return () => unmount();
};
