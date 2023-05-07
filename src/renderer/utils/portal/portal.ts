import * as forgo from 'forgo';

export type PortalOptions = {
  anchor?: Element | null
};

export default (node: forgo.ForgoNode, options?: PortalOptions) => {
  const anchor = options?.anchor ?? document.body;

  const element = document.createElement('div');
  element.classList.add('portal');

  anchor.appendChild(element);
  forgo.mount(node, element);

  return () => {
    forgo.unmount(element);
    anchor.removeChild(element);
  };
};
