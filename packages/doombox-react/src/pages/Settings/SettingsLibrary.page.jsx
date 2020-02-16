import React from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import IconRemove from '@material-ui/icons/Close';
import IconRefresh from '@material-ui/icons/Refresh';

// Core
import {
  Box,
  MenuItem,
  Switch,
  IconButton
} from '@material-ui/core';

import {
  SwitchLabel,
  FieldFolderBase,
  TypographyField,
  Tooltip,
  Button
} from '../../components';

import { ContainerSettings } from '../../modules';

// Actions
import {
  createLibrary,
  updateLibraryFolder,
  deleteLibraryFolder,
  updateConfig
} from '../../actions';

const SettingsLibrary = props => {
  const {
    libraryCache,
    skipCovers,
    parseStrict,
    folders
  } = props;
  const id = 'settingsLibrary';

  const { t } = useTranslation();

  const handleUpdateFolders = items => {
    const filteredFolders = items.filter(item => !folders.includes(item));

    if (filteredFolders.length > 0) {
      createLibrary(filteredFolders);
      updateConfig.library({ folders: [...folders, ...filteredFolders] });
    }
  };

  const handleDeleteFolder = item => {
    deleteLibraryFolder(item);

    updateConfig.library({
      folders: folders.filter(folder => folder !== item)
    });
  };

  const handleDelete = () => {
    deleteLibraryFolder({});

    updateConfig.library({
      folders: []
    });
  };

  return (
    <Box display="flex" flexDirection="column">
      <ContainerSettings title="general">
        <SwitchLabel id={id} name="parseStrict">
          <Switch
            checked={parseStrict}
            onChange={event => updateConfig.parser({
              parseStrict: event.target.checked
            })}
          />
        </SwitchLabel>
        <SwitchLabel id={id} name="skipCovers">
          <Switch
            checked={skipCovers}
            onChange={event => updateConfig.parser({
              skipCovers: event.target.checked
            })}
          />
        </SwitchLabel>
        <TypographyField
          select
          id={id}
          name="libraryCache"
          value={libraryCache}
          onChange={event => updateConfig.advanced({
            libraryCache: event.target.value
          })}
        >
          <MenuItem value={5}>
            {t('minimal')}
          </MenuItem>
          <MenuItem value={10}>
            {t('optimal')}
          </MenuItem>
          <MenuItem value={25}>
            {t('overkill')}
          </MenuItem>
        </TypographyField>
      </ContainerSettings>

      <ContainerSettings title="library">
        <FieldFolderBase
          multi
          value={folders}
          onChange={handleUpdateFolders}
          secondaryAction={folder => (
            <Box display="flex">
              <Tooltip title={t('action:refresh', { context: 'folder' })}>
                <IconButton onClick={() => updateLibraryFolder(folder)}>
                  <IconRefresh />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('action:remove', { context: 'folder' })}>
                <IconButton onClick={() => handleDeleteFolder(folder)}>
                  <IconRemove />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
        <Button onClick={handleDelete} variant="contained" color="error">
          {t('action:delete', { context: 'library' })}
        </Button>
      </ContainerSettings>
    </Box>
  );
};

SettingsLibrary.propTypes = {
  libraryCache: PropTypes.number.isRequired,
  skipCovers: PropTypes.bool.isRequired,
  parseStrict: PropTypes.bool.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  libraryCache: state.config[TYPE.CONFIG.ADVANCED].libraryCache,
  skipCovers: state.config[TYPE.CONFIG.PARSER].skipCovers,
  parseStrict: state.config[TYPE.CONFIG.PARSER].parseStrict,
  folders: state.config[TYPE.CONFIG.LIBRARY].folders
});

export default connect(
  mapStateToProps
)(SettingsLibrary);
