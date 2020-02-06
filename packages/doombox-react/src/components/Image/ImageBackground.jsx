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
  const { image } = useAudio(HOOK.AUDIO.CURRENT);

  return (
    <Image
      className={classes.background}
      src={image ? image.path : null}
    />
  );
};

export default ImageBackground;
