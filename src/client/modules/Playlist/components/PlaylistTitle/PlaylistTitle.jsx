import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import {
  Typography,
  Popper,
  ButtonIcon,
  InputText
} from '../../../../components';

// Actions
import { ipcInsert } from '../../../../actions';

// Hooks
import { useMediaQuery, useTranslation, useTimeoutOpen } from '../../../../hooks';

// Styles
import usePlaylistTitleStyles from './PlaylistTitle.styles';

const PlaylistTitle = props => {
  const {
    name,
    duration,
    collection,
    size
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const input = useRef();

  const { t, formatTime } = useTranslation();
  const classes = usePlaylistTitleStyles();
  const displaySecondary = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'xs')
  ));
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();

  const handleSubmit = () => {
    ipcInsert(IPC.CHANNEL.PLAYLIST, {
      name: input.current.value && input.current.value.length > 0 ?
        input.current.value :
        name,
      collection: collection.map(({ _id }) => _id)
    });
    input.current.value = '';
    setOpen(false);
  };

  return (
    <Fragment>
      <div
        className={classes.root}
        onContextMenu={event => {
          if (size > 0) {
            setAnchorEl(event.currentTarget);
            setOpen(!open);
          }
        }}
        onMouseLeave={handleLeave}
      >
        <Typography clamp fontWeight={displaySecondary ? 500 : 400}>
          {`${name || t('common.playlist', { transform: 'capitalize' })}${!displaySecondary ? ` (${size})` : ''}`}
        </Typography>
        {displaySecondary && (
          <Typography>
            {[
              `${size} ${t('common.track', { plural: size !== 1 })}`,
              formatTime(duration, 'text')
            ].join(' \u2022 ')}
          </Typography>
        )}
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="bottom"
        className={classes.popper}
      >
        <InputText ref={input} />
        <ButtonIcon
          icon="save"
          small
          onClick={handleSubmit}
        />
      </Popper>
    </Fragment>
  );
};

PlaylistTitle.defaultProps = {
  name: null,
  duration: 0,
  size: 0
};

PlaylistTitle.propTypes = {
  name: PropTypes.string,
  duration: PropTypes.number,
  size: PropTypes.number,
  collection: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  name: state.playlist.name,
  duration: state.playlist.duration,
  size: state.playlist.collection.length,
  collection: state.playlist.collection,
});

export default connect(
  mapStateToProps
)(PlaylistTitle);
