import React, { memo } from 'react';
import { areEqual } from "react-window";
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import ImgCover from '../ImgCover/ImgCover';

// Style
import AlbumItemStyle from './AlbumItemStyle';

export const AlbumItem = props => {
  const {
    cover,
    classes,
    style,
    name,
    label,
    size,
    onClick,
    active
  } = props;

  return (
    <div style={style}>
      <div className={classNames(
        classes.root,
        active && classes.active
      )}>
        <ButtonBase
          onClick={onClick}
          classes={{ root: classes.buttonBaseRoot }}
        >
          <ImgCover
            cover={cover}
          />
        </ButtonBase>
        <Typography
          variant="body1"
          classes={{ root: classes.typographyRoot }}
        >
          {name}
        </Typography>
        <Typography
          className={active && classes.active}
          variant="subtitle2"
          color="textSecondary"
          classes={{ root: classes.typographyRoot }}
        >
          {label}
        </Typography>
        <Typography
          className={active && classes.active}
          variant="subtitle2"
          color="textSecondary"
          classes={{ root: classes.typographyRoot }}
        >
          {`${size} songs`}
        </Typography>
      </div>
    </div>
  );
};

AlbumItem.propTypes = {
  cover: PropTypes.string,
  classes: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  active: PropTypes.bool
};

export default memo(withStyles(AlbumItemStyle)(AlbumItem), areEqual);
