import React from 'react';
import { connect } from 'react-redux';

// Core
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Main } from '../../components/Main';

const HomePage = ({ library }) => (
  <Main>
    Main
    {/* <Card>
      <Box p={2}>
        <List dense>
          {(library.map(({ doc }) => (
            <ListItem>
              <ListItemText
                primary={doc.TIT2}
                secondary={doc.TPE1}
              />
            </ListItem>
          )))}
        </List>
      </Box>
    </Card> */}
  </Main>
);

const mapStateToProps = state => ({
  library: state.library.collection
});

export default connect(
  mapStateToProps
)(HomePage);
