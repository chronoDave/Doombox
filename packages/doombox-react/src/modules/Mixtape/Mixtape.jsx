import React, {
  Fragment,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  Tooltip,
  Typography,
  Context,
  ContextItem
} from '../../components';

import { VirtualMixtape } from '../Virtual';

// Utils
import { formatTime } from '../../utils';

// Actions
import { createPlaylist } from '../../actions';

// Validation
import { propPlaylist } from '../../validation/propTypes';

const Mixtape = ({ mixtape, localized }) => {
  const [anchor, setAnchor] = useState(null);

  const { cover, name, collection } = mixtape;
  const { t } = useTranslation();

  const totalTime = formatTime(
    collection.reduce((acc, cur) => acc + cur.format.duration || 0, 0),
    'text'
  );

  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexGrow={1}
        minHeight={0}
        width="100%"
      >
        <Box
          p={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="100%"
          onContextMenu={event => setAnchor(event.currentTarget)}
        >
          <Tooltip
            title={name || t('playlist', { context: 'default' })}
            disableTranslation
            placement="right"
          >
            <Typography
              variant="subtitle2"
              align="center"
              noWrap
            >
              {name || t('playlist', { context: 'default' })}
            </Typography>
          </Tooltip>
          <Typography
            variant="caption"
            align="center"
            noWrap
          >
            {`${t('trackCount', { count: collection.length })} - ${totalTime}`}
          </Typography>
        </Box>
        <Box flexGrow={1} width="100%">
          <VirtualMixtape localized={localized} mixtape={collection} />
        </Box>
      </Box>
      <Context
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
      >
        <ContextItem
          primary={t('action:save', { context: 'playlist' })}
          onClick={() => createPlaylist({
            name,
            cover,
            collection: collection.map(({ _id }) => _id)
          })}
        />
      </Context>
    </Fragment>
  );
};

Mixtape.propTypes = {
  mixtape: propPlaylist.isRequired,
  localized: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  mixtape: state.mixtape,
  localized: state.config[TYPE.CONFIG.GENERAL].localized
});

export default connect(
  mapStateToProps
)(Mixtape);
