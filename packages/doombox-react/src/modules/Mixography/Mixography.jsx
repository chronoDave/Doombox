import React, {
  Fragment,
  useState
} from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconAdd from '@material-ui/icons/Add';

// Core
import { IconButton } from '@material-ui/core';

import {
  Button,
  Tooltip,
  Context,
  ContextItem,
  ContextDivider,
  DialogBase,
  DialogForm,
  DialogConfirmation
} from '../../components';

import { FormPlaylist } from '../Form';

import MixographyItem from './MixographyItem.private';

// Actions
import {
  createPlaylist,
  playPlaylist,
  updatePlaylist,
  addPlaylist,
  deletePlaylist
} from '../../actions';

// Validation
import { propPlaylist } from '../../validation/propTypes';

// Styles
import { useMixographyStyles } from './Mixography.style';

const Mixography = ({ mixography }) => {
  const [menu, setMenu] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [playlist, setPlaylist] = useState({});

  const classes = useMixographyStyles();
  const { t } = useTranslation();

  const renderMenu = () => (
    <Context
      anchorEl={menu}
      open={!!menu}
      onClose={() => setMenu(null)}
    >
      <ContextItem
        primary={t('action:play', { context: 'playlist' })}
        onClick={() => playPlaylist(playlist._id)}
      />
      <ContextItem
        primary={t('action:add', { context: 'playlist' })}
        onClick={() => addPlaylist(playlist._id)}
      />
      <ContextDivider />
      <ContextItem
        onClick={() => setDialog('update')}
        primary={t('action:edit', { context: 'playlist' })}
      />
      <ContextDivider />
      <ContextItem
        primary={t('action:delete', { context: 'playlist' })}
        onClick={() => setDialog('delete')}
        color="error"
      />
    </Context>
  );

  const renderDialog = () => (
    <Fragment>
      <DialogForm
        open={dialog === 'create'}
        disableTranslation
        title={t('action:create', { context: 'playlist' })}
        onClose={() => setDialog(null)}
        form={<FormPlaylist primary="update" onSubmit={createPlaylist} />}
      />
      <DialogForm
        open={dialog === 'update'}
        disableTranslation
        title={t('action:edit', { context: 'playlist' })}
        onClose={() => setDialog(null)}
        form={(
          <FormPlaylist
            primary="create"
            initialValues={{
              name: playlist.name,
              cover: playlist.cover
            }}
            onSubmit={payload => updatePlaylist(playlist._id, payload)}
          />
        )}
      />
      <DialogConfirmation
        open={dialog === 'delete'}
        title={t('action:delete', { context: 'playlist' })}
        primary={playlist.name}
        onClose={() => setDialog(null)}
        onConfirm={() => deletePlaylist(playlist._id)}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <div className={classes.root}>
        {mixography.map(item => (
          <MixographyItem
            key={item._id}
            onContextMenu={event => {
              setPlaylist(item);
              setMenu(event.currentTarget);
            }}
            {...item}
          />
        ))}
        <Tooltip
          disableTranslation
          title={t('action:create', { context: 'playlist' })}
          placement="right"
        >
          <IconButton onClick={() => setDialog('create')}>
            <IconAdd />
          </IconButton>
        </Tooltip>
      </div>
      {renderMenu()}
      {renderDialog()}
    </Fragment>
  );
};

Mixography.propTypes = {
  mixography: PropTypes.arrayOf(propPlaylist).isRequired
};

const mapStateToProps = state => ({
  mixography: state.mixography
});

export default connect(
  mapStateToProps
)(Mixography);
