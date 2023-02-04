import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './imageBlur.scss';

export type ImageBlurProps = {
  src: string
  alt: string
  padding: number
};

const ImageBlur: Component<ImageBlurProps> = () => {
  const component = new forgo.Component<ImageBlurProps>({
    render(props) {
      return (
        <div class='ImageBlur' style={{ '--padding': `${props.padding}px` }}>
          <img class='blur' src={props.src} alt='' />
          <img src={props.src} alt={props.alt} />
        </div>
      );
    }
  });

  return component;
};

export default ImageBlur;
