import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { IPC, TYPES, WINDOW } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { Search, Popper, Checkbox } from '../../components';

// Actions
import { updateConfig, ipcFind } from '../../actions';

// Redux
import { setView } from '../../redux';

// Hooks
import { useTranslation, useTimeoutOpen } from '../../hooks';

// Validation
import { propConfigSearch } from '../../validation/propTypes';

// Styles
import useSearchLibrary from './SearchLibrary.styles';

const SearchLibrary = ({ fields, dispatchView }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { t } = useTranslation();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave,
  } = useTimeoutOpen();
  const classes = useSearchLibrary();

  const handleSearch = query => {
    const search = (channel, tags) => ipcFind(channel, {
      $some: tags.map(tag => ({
        $stringLoose: {
          [tag]: query.toString()
        }
      }))
    }, { projection: ['_id'] });

    if (fields.artist || fields.title) {
      search(IPC.CHANNEL.SONG, [
        'artist',
        'artistlocalized',
        'title',
        'titlelocalize'
      ]);
    }
    if (fields.album || fields.albumartist || fields.cdid) {
      search(IPC.CHANNEL.ALBUM, [
        'album',
        'albumlocalized',
        'albumartist',
        'albumartistlocalized',
        'cdid'
      ]);
    }
    if (fields.publisher) {
      search(IPC.CHANNEL.LABEL, [
        'publisher',
        'publisherlocalized'
      ]);
    }
  };

  return (
    <Fragment>
      <Search
        onContextMenu={event => {
          setAnchorEl(event.currentTarget);
          setOpen(!open);
        }}
        onClear={() => dispatchView(WINDOW.VIEW.LIBRARY)}
        onChange={(_, query) => {
          if (!query || query === '') {
            dispatchView(WINDOW.VIEW.LIBRARY);
          } else {
            dispatchView(WINDOW.VIEW.SEARCH);
            handleSearch(query);
          }
        }}
        onMouseLeave={handleLeave}
      />
      <Popper
        anchorEl={anchorEl}
        open={open}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="bottom-start"
        className={classes.popper}
      >
        {Object.keys(fields).map(key => (
          <Checkbox
            key={key}
            label={t(`common.${key}`, {
              transform: key === 'cdid' ?
                'uppercase' :
                'capitalize'
            })}
            checked={fields[key]}
            className={classes.checkbox}
            onChange={event => updateConfig(
              TYPES.CONFIG.SEARCH,
              { [key]: event.currentTarget.checked }
            )}
          />
        ))}
      </Popper>
    </Fragment>
  );
};

SearchLibrary.propTypes = {
  fields: propConfigSearch.isRequired,
  dispatchView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  fields: state.config.search
});

const mapDispatchToProps = {
  dispatchView: setView
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchLibrary);
