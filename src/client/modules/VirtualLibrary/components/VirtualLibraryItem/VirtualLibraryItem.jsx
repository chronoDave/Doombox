import React from 'react';
import { sortMetadata } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, TablePair } from '../../../../components';

// Hooks
import { useTranslation, useAudio } from '../../../../hooks';

// Validation
import { propLabel, propVirtualStyle } from '../../../../validation/propTypes';

import './VirtualLibraryItem.scss';

const VirtualLibraryItem = props => {
  const {
    style,
    primary,
    secondary,
    onMouseLeave,
    label,
    onContextMenu
  } = props;

  const { set } = useAudio();
  const {
    t,
    getLocalizedTag,
    formatDate,
    formatTime
  } = useTranslation();

  return (
    <div className="VirtualLibraryItem" style={style}>
      <div className="header">
        <ButtonBase
          onClick={() => set({
            name: primary,
            collection: label.songs
              .sort(sortMetadata(['date', 'year', 'disc', 'track']))
          })}
          onContextMenu={event => onContextMenu(event, {
            ...label,
            name: primary,
            songs: label.songs
              .sort(sortMetadata(['date', 'year', 'disc', 'track']))
          })}
        >
          <p>{primary}</p>
          <p className="subtitle">{secondary}</p>
        </ButtonBase>
        <div className="divider" />
      </div>
      <div className="albums">
        {label.albums
          .sort(sortMetadata(['date', 'year']))
          .map(album => (
            <div className="album" key={album._id}>
              <ButtonBase
                onClick={() => set({
                  name: getLocalizedTag(album, 'album'),
                  collection: album.songs
                    .sort(sortMetadata(['disc', 'track']))
                })}
                onContextMenu={event => onContextMenu(event, {
                  ...album,
                  name: getLocalizedTag(album, 'album'),
                  songs: album.songs
                    .sort(sortMetadata(['disc', 'track']))
                })}
                onMouseLeave={onMouseLeave}
              >
                <img
                  src={album.images[0] ? album.images[0].files.thumbnail : null}
                  alt={getLocalizedTag(album, 'album')}
                  decoding="async"
                />
              </ButtonBase>
              <div className="metadata">
                <p className="primary">{getLocalizedTag(album, 'album')}</p>
                <p className="secondary">{getLocalizedTag(album, 'albumartist')}</p>
                <TablePair
                  variant="subtitle"
                  values={[{
                    label: t('common.release', { transform: 'capitalize' }),
                    value: formatDate(album.date || album.year)
                  }, {
                    label: t('common.duration', { transform: 'capitalize' }),
                    value: formatTime(album.duration, 'text')
                  }, {
                    label: t('common.track', {
                      transform: 'capitalize',
                      plural: album.songs.length !== 1
                    }),
                    value: album.songs.length
                  }]}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

VirtualLibraryItem.propTypes = {
  style: propVirtualStyle.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  label: propLabel.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired
};

export default VirtualLibraryItem;
