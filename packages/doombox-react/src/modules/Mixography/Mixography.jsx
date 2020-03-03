import React, {
  Fragment,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import { IconButton } from '@material-ui/core';

import { Tooltip } from '../../components';

import MixographyItem from './MixographyItem.private';
import MixographyDialog from './MixographyDialog.private';
import MixographyMenu from './MixographyMenu.private';

// Validation
import { propPlaylist } from '../../validation/propTypes';

// Styles
import { useMixographyStyles } from './Mixography.style';

const Mixography = ({ active, mixography }) => {
  const defaultPlaylist = { name: 'default', cover: '', collection: [] };

  const [menu, setMenu] = useState({ anchorEl: null, playlist: defaultPlaylist });
  const [dialog, setDialog] = useState({ id: null, playlist: defaultPlaylist });

  const { t } = useTranslation();
  const classes = useMixographyStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        {mixography.map(playlist => (
          <MixographyItem
            key={playlist._id}
            active={active}
            playlist={playlist}
            onMenu={event => setMenu({ anchorEl: event.currentTarget, playlist })}
          />
        ))}
        <Tooltip
          disableTranslation
          title={t('action:create', { context: 'playlist' })}
          placement="right"
        >
          <IconButton onClick={() => setDialog({ ...dialog, id: 'create' })}>
            <IconAdd />
          </IconButton>
        </Tooltip>
      </div>
      <MixographyDialog
        onClose={() => setDialog({ ...dialog, id: null })}
        dialog={dialog}
      />
      <MixographyMenu
        onClose={() => setMenu({ ...menu, anchorEl: null })}
        onDialog={newDialog => setDialog(newDialog)}
        menu={menu}
      />
    </Fragment>
  );
};

Mixography.propTypes = {
  active: PropTypes.string,
  mixography: PropTypes.arrayOf(propPlaylist)
};

Mixography.defaultProps = {
  mixography: [],
  active: null
};

const mapStateToProps = state => ({
  active: state.playlist.name,
  mixography: state.mixography
});

export default connect(
  mapStateToProps
)(Mixography);
