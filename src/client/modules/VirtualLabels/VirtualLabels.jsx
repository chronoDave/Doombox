import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList, VirtualListItem } from '../../components';

// Redux
import { populateSearchLabels } from '../../redux';

// Hooks
import { useTranslation, useAudio } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propLabel } from '../../validation/propTypes';

const VirtualLabels = ({ labels, current }) => {
  const { set } = useAudio();
  const { t, formatTime, getLocalizedTag } = useTranslation();

  return (
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
              collection: label.songs
            })}
          />
        );
      }}
    </VirtualList>
  );
};

VirtualLabels.defaultProps = {
  current: null
};

VirtualLabels.propTypes = {
  current: PropTypes.string,
  labels: PropTypes.arrayOf(propLabel).isRequired
};

const mapStateToProps = state => ({
  current: state.player.metadata._labelId,
  labels: populateSearchLabels(state)
});

export default connect(
  mapStateToProps
)(VirtualLabels);
