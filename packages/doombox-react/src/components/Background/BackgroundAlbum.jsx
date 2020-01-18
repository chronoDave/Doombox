import React, {
  useState,
  useEffect
} from 'react';
import { TYPE } from '@doombox/utils';

// Core
import { Image } from '../Image';

// Hooks
import {
  useIpc,
  useAudio
} from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useBackgroundStyles } from './Background.style';

const BackgroundAlbum = () => {
  const [image, setImage] = useState({});

  const config = useIpc(HOOK.IPC.CONFIG);
  const configGeneral = config[TYPE.CONFIG.GENERAL];

  const { getImageById } = useIpc(HOOK.IPC.METHOD);
  const { images } = useAudio(HOOK.AUDIO.CURRENT);

  const classes = useBackgroundStyles();

  useEffect(() => {
    if (images) setImage(getImageById(images[0]));
  }, [images]);

  return configGeneral[TYPE.OPTIONS.BACKGROUND] ? (
    <Image
      className={classes.background}
      src={image ? image.path : null}
    />
  ) : null;
};

export default BackgroundAlbum;
