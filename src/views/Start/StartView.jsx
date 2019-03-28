import React from 'react';
import { connect } from 'react-redux';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { GridContainer } from '../../components/Grid';

// Style
import StartViewStyle from './StartViewStyle';

// Electron
const { remote } = window.require('electron');
const mainProcess = remote.require('./electron');

const StartView = props => {
  const { handleSubmit, folderPath } = props;

  return (
    <GridContainer>
      <Button
        onClick={() => mainProcess.selectDirectory(callback => console.log(callback))}
      >
        Select folder
      </Button>
      <Typography variant="body1">
        {folderPath}
      </Typography>
    </GridContainer>
  );
};

const mapStateToProps = state => ({
  folderPath: state.list.folderPath
});

export default connect(
  mapStateToProps
)(withStyles(StartViewStyle)(StartView));
