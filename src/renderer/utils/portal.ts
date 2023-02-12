import * as forgo from 'forgo';

import createClickAwayListener from './clickAwayListener';

export type PortalOptions = {
  persistent?: boolean
};

export default (component: forgo.ForgoNode, options?: PortalOptions) => {
  let deleted = false;

  const abortController = new AbortController();
  const element = (forgo.render(component).node) as Element;
  document.body.appendChild(element);

  const unmount = () => {
    forgo.unmount(element);
    document.body.removeChild(element);
    deleted = true;
  };

  if (!options?.persistent) {
    createClickAwayListener(element, () => {
      if (!deleted) unmount();
    }, { abortController });
  }

  return () => {
    if (!deleted) unmount();
    abortController.abort();
  };
};
