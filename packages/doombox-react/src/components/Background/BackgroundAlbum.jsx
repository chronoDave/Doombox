import React, {
  useState,
  useEffect
} from 'react';
import { TYPE } from '@doombox/utils';
import PropTypes from 'prop-types';

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

const BackgroundAlbum = ({ override }) => {
  const [image, setImage] = useState({});

  const { general } = useIpc(HOOK.IPC.CONFIG);
  const { getImageById } = useIpc(HOOK.IPC.METHOD);
  const { images } = useAudio(HOOK.AUDIO.CURRENT);

  const classes = useBackgroundStyles();

  useEffect(() => {
    if (images) setImage(getImageById(images[0]));
  }, [images]);

  return (override || general[TYPE.OPTIONS.BACKGROUND]) ? (
    <Image
      className={classes.background}
      src={image ? image.path : null}
    />
  ) : null;
};

BackgroundAlbum.propTypes = {
  override: PropTypes.bool
};

BackgroundAlbum.defaultProps = {
  override: false
};

export default BackgroundAlbum;
