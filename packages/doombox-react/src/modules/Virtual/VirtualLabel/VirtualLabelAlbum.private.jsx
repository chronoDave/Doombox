import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import {
  Tooltip,
  Typography,
  Image,
  Table,
  TableRow
} from '../../../components';

const VirtualLabelAlbum = props => {
  const {
    classes,
    width,
    primary,
    fields,
    cover,
    tooltip,
    onPlay,
    onMenu
  } = props;

  return (
    <Box display="flex" width={width} p={1}>
      <Tooltip disableTranslation title={tooltip.album}>
        <ButtonBase
          onClick={onPlay}
          onContextMenu={onMenu}
          classes={{ root: classes.buttonAlbum }}
        >
          <Image
            src={cover}
            disableOverlay
            className={classes.album}
          />
        </ButtonBase>
      </Tooltip>
      <Box display="flex" flexDirection="column" py={1} pl={1.5} pr={0}>
        <Typography variant="subtitle2" clamp={2}>
          {primary}
        </Typography>
        <Table>
          {fields.map(({ key, value }) => (
            <TableRow
              key={key}
              variant="caption"
              label={key}
              value={value}
            />
          ))}
        </Table>
      </Box>
    </Box>
  );
};

VirtualLabelAlbum.propTypes = {
  classes: PropTypes.shape({
    buttonAlbum: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired
  }).isRequired,
  width: PropTypes.number.isRequired,
  primary: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  })).isRequired,
  cover: PropTypes.string,
  tooltip: PropTypes.shape({
    album: PropTypes.string.isRequired
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
  onMenu: PropTypes.func.isRequired
};

VirtualLabelAlbum.defaultProps = {
  cover: null
};

export default VirtualLabelAlbum;
