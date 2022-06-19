import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { IPC } from '../../../../../utils/types';
import { Popper, ButtonIcon, InputText } from '../../../../components';
import { ipcInsert } from '../../../../actions';
import { useTranslation, useTimeoutOpen } from '../../../../hooks';

import './PlaylistTitle.scss';

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
        className="PlaylistTitle root"
        onContextMenu={event => {
          if (size > 0) {
            setAnchorEl(event.currentTarget);
            setOpen(!open);
          }
        }}
        onMouseLeave={handleLeave}
      >
        <p className="primary">
          {name || t('common.playlist', { transform: 'capitalize' })}
          <span>
            (
            {size}
            )
          </span>
        </p>
        <p className="secondary">
          {[
            `${size} ${t('common.track', { plural: size !== 1 })}`,
            formatTime(duration, 'text')
          ].join(' \u2022 ')}
        </p>
      </div>
      <Popper
        open={open}
        anchorEl={anchorEl}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="bottom"
        className="PlaylistTitle"
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
  collection: state.playlist.collection
});

export default connect(
  mapStateToProps
)(PlaylistTitle);
