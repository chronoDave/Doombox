import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList } from '../../components';

import { VirtualLabelsItem } from '../VirtualLabelsItem';

// Redux
import { populateLabels } from '../../redux';

// Hooks
import { useTranslation, useAudio } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propLabel } from '../../validation/propTypes';

const VirtualLabels = ({ labels }) => {
  const { set } = useAudio();
  const { getLocalizedTag } = useTranslation();

  return (
    <VirtualList
      length={labels.length}
      size={mixins.labels.item}
    >
      {({ style, index }) => {
        const label = labels[index];

        if (!label) return null;
        return (
          <VirtualLabelsItem
            key={label._id}
            style={style}
            primary={getLocalizedTag(label, 'publisher')}
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

VirtualLabels.propTypes = {
  labels: PropTypes.arrayOf(propLabel).isRequired
};

const mapStateToProps = state => ({
  labels: populateLabels(state, state.search.labels),
});

export default connect(
  mapStateToProps
)(VirtualLabels);
