import React, { useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';

// Core
import VirtualMixtapeItem from './VirtualMixtapeItem.private';

// Hooks
import { useAudio } from '../../../hooks';

// Utils
import { HOOK } from '../../../utils/const';

// Validation
import { propSong } from '../../../validation/propTypes';

// Styles
import { useVirtualMixtapeStyles } from './VirtualMixtape.style';

const VirtualMixtape = ({ mixtape, localized }) => {
  const size = 6.5;

  const { _id: currentId } = useAudio(HOOK.AUDIO.CURRENT);
  const { goTo } = useAudio(HOOK.AUDIO.METHOD);
  const classes = useVirtualMixtapeStyles();

  const itemData = useMemo(() => ({
    localized,
    classes,
    mixtape,
    currentId,
    goTo
  }), [
    localized,
    classes,
    mixtape,
    currentId,
    goTo
  ]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          // General
          width={width}
          height={height}
          // Items
          itemCount={mixtape.length}
          itemData={itemData}
          itemSize={8 * size}
        >
          {VirtualMixtapeItem}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

VirtualMixtape.propTypes = {
  mixtape: PropTypes.arrayOf(propSong),
  localized: PropTypes.bool.isRequired
};

VirtualMixtape.defaultProps = {
  mixtape: []
};

export default VirtualMixtape;
