import React from 'react';

// Core
import Image from './Image';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useImageStyles } from './Image.style';

const ImageBackground = () => {
  const classes = useImageStyles();
  const { images } = useAudio(HOOK.AUDIO.CURRENT);

  return (
    <Image
      className={classes.background}
      src={images ? images[0].file : null}
    />
  );
};

export default ImageBackground;
