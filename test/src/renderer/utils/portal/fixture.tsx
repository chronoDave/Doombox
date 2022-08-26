import * as forgo from 'forgo';

export default () => {
  const cleanup = () => forgo.mount(null, document.body);

  return ({
    cleanup
  });
};
