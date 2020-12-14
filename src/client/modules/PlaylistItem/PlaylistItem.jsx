import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography, Hidden } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Validation
import { propVirtualStyle } from '../../validation/propTypes';

// Styles
import usePlaylistItemStyles from './PlaylistItem.styles';

const PlaylistItem = props => {
  const {
    active,
    style,
    index,
    primary,
    secondary
  } = props;

  const classes = usePlaylistItemStyles();
  const { skip } = useAudio();

  return (
    <ButtonBase
      style={style}
      onClick={() => skip(index)}
      className={cx(classes.root, { [classes.active]: active })}
    >
      <Hidden on={({ create, queries, values }) => create(queries.maxWidth, values.sm)}>
        <Typography className={classes.index}>
          {`${index + 1}.`}
        </Typography>
      </Hidden>
      <div className={classes.metadata}>
        <Typography clamp>
          {primary}
        </Typography>
        <Hidden on={({ create, queries, values }) => create(queries.maxWidth, values.sm)}>
          <Typography clamp color="textSecondary">
            {secondary}
          </Typography>
        </Hidden>
      </div>
    </ButtonBase>
  );
};

PlaylistItem.defaultProps = {
  active: false
};

PlaylistItem.propTypes = {
  active: PropTypes.bool,
  style: propVirtualStyle.isRequired,
  index: PropTypes.number.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired
};
export default PlaylistItem;
