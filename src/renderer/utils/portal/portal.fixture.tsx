import * as forgo from 'forgo';

export default () => {
  forgo.mount((
    <div class="anchor">
      Anchor
    </div>
  ), document.body);

  return () => {
    forgo.unmount(document.body);
  };
};
