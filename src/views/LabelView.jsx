import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { connect } from 'react-redux';
import _ from 'lodash';

// Core
import withStyles from '@material-ui/core/styles/withStyles';

import ViewHeader from '../components/ViewHeader/ViewHeader';
import { LabelItem } from '../components/ViewItem';

// Style
import LabelViewStyle from './LabelViewStyle';

const LabelView = props => {
  const {
    classes,
    size,
    labelList
  } = props;

  return (
    <div className={classes.root}>
      <ViewHeader
        size={size}
        title="Label collection"
        type="labels"
      >
        a
      </ViewHeader>
      <AutoSizer>
        {({ height, width }) => {
          const itemWidth = 480;
          const itemHeight = 398;
          const itemCount = Math.floor(width / (itemWidth + 5));
          const rowCount = Math.ceil(size / itemCount);

          return (
            <Grid
              className={classes.scrollbar}
              // Amount of items
              rowCount={rowCount}
              columnCount={itemCount}
              // Item dimensions
              columnWidth={itemWidth}
              rowHeight={itemHeight}
              // Container dimensions
              width={width}
              height={height - 192}
              // Overscan
              overscanColumnsCount={3}
              overscanRowCount={rowCount}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * itemCount + columnIndex;

                if (index > size - 1) return null;
                const albums = _.chain(labelList[index])
                  .groupBy(label => label.album)
                  .toPairs()
                  .map(array => array[1])
                  .sortBy(array => array[0].year)
                  .value();

                const { label, id } = labelList[index][0];
                return (
                  <LabelItem
                    style={style}
                    key={id}
                    index={index}
                    label={label}
                    collection={labelList[index]}
                    albums={albums}
                  />
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

const mapStateToProps = state => ({
  size: state.list.labelSize,
  labelList: state.list.labelList
});

LabelView.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number,
  labelList: PropTypes.array
};

export default connect(
  mapStateToProps
)(withStyles(LabelViewStyle)(LabelView));
