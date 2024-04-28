import * as forgo from 'forgo';

export default () => {
  forgo.mount([
    <button type="button">Click me</button>,
    <p>Do not click me</p>
  ], document.body);

  return () => forgo.unmount(document.body);
};
