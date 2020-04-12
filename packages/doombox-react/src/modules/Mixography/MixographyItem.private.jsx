import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Tooltip,
  ButtonAvatar
} from '../../components';

// Actions
import { playPlaylist } from '../../actions';

// Validation
import { propImage } from '../../validation/propTypes';

// Styles
import { useMixographyStyles } from './Mixography.style';

const MixographyItem = props => {
  const {
    name,
    collection,
    current,
    _id,
    cover,
    onContextMenu
  } = props;

  const { t } = useTranslation();
  const classes = useMixographyStyles();

  return (
    <Box display="flex" alignItems="center">
      <Tooltip
        disableTranslation
        title={`${name} (${t('trackCount', { count: collection.length })})`}
        placement="right"
      >
        <ButtonAvatar
          alt={name}
          src={cover && (cover.path || cover.file)}
          size={6}
          className={classes.itemAvatar}
          onClick={() => playPlaylist(_id)}
          onContextMenu={onContextMenu}
        />
      </Tooltip>
      {name === current && <div className={classes.activeBar} />}
    </Box>
  );
};

MixographyItem.propTypes = {
  name: PropTypes.string.isRequired,
  collection: PropTypes.arrayOf(PropTypes.string).isRequired,
  current: PropTypes.string,
  _id: PropTypes.string.isRequired,
  cover: propImage,
  onContextMenu: PropTypes.func
};

MixographyItem.defaultProps = {
  current: null,
  cover: null,
  onContextMenu: null
};

const mapStateToProps = state => ({
  current: state.playlist.name
});

export default connect(
  mapStateToProps
)(MixographyItem);
