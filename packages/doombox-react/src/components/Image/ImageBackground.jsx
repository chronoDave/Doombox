import React from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import Image from './Image';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useImageStyles } from './Image.style';

const ImageBackground = ({ enableBackground }) => {
  const classes = useImageStyles();
  const { images } = useAudio(HOOK.AUDIO.CURRENT);

  return (
    <Image
      className={classes.background}
      disableDefault={!enableBackground}
      src={(enableBackground && images) ? images[0].file : null}
    />
  );
};

ImageBackground.propTypes = {
  enableBackground: PropTypes.bool
};

ImageBackground.defaultProps = {
  enableBackground: false
};

const mapStateToProps = state => ({
  enableBackground: state.config[TYPE.CONFIG.GENERAL].background
});

export default connect(
  mapStateToProps
)(ImageBackground);
