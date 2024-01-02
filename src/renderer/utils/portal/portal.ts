import * as forgo from 'forgo';

export type PortalOptions = {
  anchor?: Element | null
};

export default (element: forgo.ForgoNode, options?: PortalOptions) => {
  const anchor = options?.anchor ?? document.body;
  const root = document.createElement('div');
  root.classList.add('Portal');

  anchor.appendChild(root);
  forgo.mount(element, root);

  return () => {
    forgo.unmount(root);
    if (root.isConnected) anchor.removeChild(root);
  };
};
