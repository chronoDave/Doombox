import * as forgo from 'forgo';

export default () => {
  forgo.mount([
    <button type="button">Click me</button>,
    <p>Do not click me</p>
  ], document.body);

  const cleanup = () => forgo.mount(null, document.body);
  const button = document.querySelector('button') as HTMLButtonElement;
  const text = document.querySelector('p') as HTMLParagraphElement;

  return ({
    cleanup,
    button,
    text
  });
};
