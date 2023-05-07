import * as forgo from 'forgo';

export default () => {
  forgo.mount([
    <div class='container'>
      <button id='1' type='button'>1</button>
      <button id='2' type='button'>2</button>
    </div>,
    <button id='3' type='button'>3</button>
  ], document.body);

  return () => forgo.unmount(document.body);
};
