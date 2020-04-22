import React, {
  Fragment,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icons
import IconAdd from '@material-ui/icons/Add';
import IconDelete from '@material-ui/icons/DeleteSweep';
import IconRescan from '@material-ui/icons/Refresh';
import IconRemove from '@material-ui/icons/Delete';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import {
  Button,
  Typography,
  DialogConfirmation
} from '../../components';

import { VirtualLibrary } from '../Virtual';

// Actions
import {
  updateConfigLibrary,
  appendLibrary,
  updateFolders,
  deleteFolders,
  dropLibrary
} from '../../actions';

// Utils
import { selectFolder } from '../../utils';

const ManagerLibrary = ({ folders }) => {
  const [selected, setSelected] = useState([]);
  const [confirm, setConfirm] = useState(false);

  const { t } = useTranslation();

  const handleSelect = newFolder => {
    if (selected.includes(newFolder)) {
      setSelected(selected.filter(folder => folder !== newFolder));
    } else {
      setSelected([...selected, newFolder]);
    }
  };

  const handleAppend = () => {
    selectFolder({ multi: true })
      .then(newFolders => {
        if (newFolders) {
          const filteredFolders = [...new Set([
            ...folders,
            ...newFolders
          ])];
          const appendableFolders = newFolders
            .filter(newFolder => !folders.includes(newFolder));

          updateConfigLibrary({ folders: filteredFolders });
          if (appendableFolders.length !== 0) appendLibrary(appendableFolders);
          setSelected([]);
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  const handleUpdate = () => {
    updateFolders(selected);
    setSelected([]);
  };

  const handleRemove = () => {
    const newFolders = folders
      .filter(folder => !selected.includes(folder));

    updateConfigLibrary({ folders: newFolders });
    deleteFolders({
      regex: {
        operator: 'or',
        expressions: selected.map(folder => ({
          key: 'file',
          expression: folder
        }))
      }
    });
    setSelected([]);
  };

  const handleDrop = () => {
    updateConfigLibrary({ folders: [] });
    dropLibrary();
    setSelected([]);
  };

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" height="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
        >
          <Button
            startIcon={<IconAdd />}
            variant="contained"
            color="primary"
            onClick={handleAppend}
          >
            {t('action:add', { context: 'folder' })}
          </Button>
          <Button
            startIcon={<IconDelete />}
            variant="outlined"
            color="error"
            onClick={() => setConfirm(true)}
          >
            {t('action:delete', { context: 'library' })}
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pb={1}
            pl={1}
          >
            <Typography>
              {t('folderCount', { count: selected.length })}
            </Typography>
            <Box display="flex">
              <IconButton
                disabled={selected.length === 0}
                onClick={handleUpdate}
              >
                <IconRescan />
              </IconButton>
              <IconButton
                disabled={selected.length === 0}
                onClick={handleRemove}
              >
                <IconRemove />
              </IconButton>
            </Box>
          </Box>
          <Box
            height="100%"
            minHeight={300}
            bgcolor="grey.200"
            borderRadius={4}
          >
            {folders.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                py={2}
              >
                <Typography color="textSecondary">
                  {t('foldersNone')}
                </Typography>
              </Box>
            ) : (
              <VirtualLibrary
                folders={folders}
                selected={selected}
                onClick={handleSelect}
              />
            )}
          </Box>
        </Box>
      </Box>
      <DialogConfirmation
        open={confirm}
        title={t('action:delete', { context: 'library' })}
        primary={t('library')}
        onClose={() => setConfirm(false)}
        onConfirm={handleDrop}
      />
    </Fragment>
  );
};

ManagerLibrary.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  folders: state.config[TYPE.CONFIG.LIBRARY].folders
});

export default connect(
  mapStateToProps
)(ManagerLibrary);
