import * as forgo from 'forgo';

/**
 * @deprecated Does not fire `unmount()` event, see [forgojs/forgo#73](https://github.com/forgojs/forgo/issues/73)
 */
export default (
  anchor: HTMLElement,
  element: (unmount: () => void) => forgo.ForgoComponentCtor
) => {
  let unmounted = false;
  let unmount: () => void;

  const portal = () => {
    const component = new forgo.Component({
      render() {
        if (unmounted) return null;
        return element(unmount);
      }
    });

    unmount = () => {
      unmounted = true;
      component.update();
    };

    return component;
  };

  anchor.appendChild(forgo.render(forgo.createElement(portal, {})).node);

  return () => unmount();
};
