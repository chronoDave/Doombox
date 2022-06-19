import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { shuffle, sortMetadata } from '../../../utils';
import {
  VirtualList,
  VirtualListItem,
  Popper,
  MenuItem
} from '../../components';
import { createPlaylist } from '../../actions';
import { populateSearchLabels } from '../../redux';
import { useTranslation, useAudio, useTimeoutOpen } from '../../hooks';
import { mixins } from '../../theme';
import { propLabel } from '../../validation/propTypes';

const VirtualLabels = ({ labels, current, useLocalizedMetadata }) => {
  const [menu, setMenu] = useState({ anchorEl: null, label: null });

  const { set, add } = useAudio();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const { t, formatTime, getLocalizedTag } = useTranslation();

  return (
    <Fragment>
      <VirtualList
        length={labels.length}
        size={mixins.virtual.item * 2}
      >
        {({ style, index }) => {
          const label = labels[index];

          if (!label) return null;
          return (
            <VirtualListItem
              key={label._id}
              style={style}
              active={label._id === current}
              primary={getLocalizedTag(label, 'publisher')}
              secondary={[
                `${label.albums.length} ${t('common.album', { plural: label.albums.length !== 1 })}`,
                `${label.songs.length} ${t('common.track', { plural: label.songs.length !== 1 })}`,
                formatTime(label.duration || 0)
              ].join(' \u2022 ')}
              onClick={() => set({
                name: getLocalizedTag(label, 'publisher'),
                collection: label.songs.sort(sortMetadata(
                  ['year', 'date', 'disc', 'track'],
                  useLocalizedMetadata
                ))
              })}
              onContextMenu={event => {
                setMenu({ anchorEl: event.currentTarget, label });
                setOpen(true);
              }}
              onMouseEnter={() => open && handleEnter()}
              onMouseLeave={handleLeave}
            />
          );
        }}
      </VirtualList>
      <Popper
        open={open}
        anchorEl={menu.anchorEl}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="left"
      >
        <MenuItem
          primary={t('action.common.add_to', {
            mixins: { item: t('common.playlist') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            add(menu.label.songs.sort(sortMetadata(
              ['year', 'date', 'disc', 'track'],
              useLocalizedMetadata
            )));
          }}
        />
        <MenuItem
          primary={t('action.common.shuffle', {
            mixins: { item: t('common.label') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            set({
              name: getLocalizedTag(menu.label, 'publisher'),
              collection: shuffle(menu.label.songs.sort(sortMetadata(
                ['year', 'date', 'disc', 'track'],
                useLocalizedMetadata
              )))
            });
          }}
          divider
        />
        <MenuItem
          primary={t('action.common.create', {
            mixins: { item: t('common.playlist') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            createPlaylist(
              getLocalizedTag(menu.label, 'publisher'),
              menu.label.songs
            );
          }}
        />
      </Popper>
    </Fragment>
  );
};

VirtualLabels.defaultProps = {
  current: null
};

VirtualLabels.propTypes = {
  current: PropTypes.string,
  useLocalizedMetadata: PropTypes.bool.isRequired,
  labels: PropTypes.arrayOf(propLabel).isRequired
};

const mapStateToProps = state => ({
  current: state.player.metadata._labelId,
  useLocalizedMetadata: state.config.display.useLocalizedMetadata,
  labels: populateSearchLabels(state)
});

export default connect(
  mapStateToProps
)(VirtualLabels);
