import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Actions
import { fetchSongList } from '../../actions/databaseActions';
import { setStatus } from '../../actions/songActions';

// Style
import SongViewStyle from './SongViewStyle';

function convertToMinutes(time) {
  const date = new Date(time);

  const addZero = i => (i < 10 ? `0${i}` : i);

  return `${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`;
}

class LabelView extends Component {
  componentDidMount() {
    const { getSongList } = this.props;

    getSongList();
  }

  render() {
    const {
      songList,
      count,
      setSongIndex,
      songIndex,
      classes
    } = this.props;

    // return (
    //   !songList ? (
    //     <CircularProgress />
    //   ) : (
    //     <AutoSizer>
    //       {({ width, height }) => (
    //         <ColumnSizer
    //           columnMinWidth={30}
    //           columnCount={5}
    //           width={width}
    //         >
    //           {({ adjustedWidth, registerChild }) => (
    //             <Table
    //               ref={registerChild}
    //               width={width}
    //               height={height}
    //               headerHeight={45}
    //               rowHeight={39}
    //               rowCount={count}
    //               rowGetter={({ index }) => songList[index]}
    //               overscanRowCount={5}
    //               onRowDoubleClick={event => setSongIndex(event.index)}
    //               // Custom rendering
    //               gridClassName={classes.table}
    //               headerRowRenderer={({
    //                 className,
    //                 columns,
    //                 style
    //               }) => (
    //                 <div
    //                   className={classNames(classes.tableHeaderRow, className)}
    //                   rolw='row'
    //                   style={style}
    //                 >
    //                   {columns}
    //                 </div>
    //               )}
    //               rowRenderer={({
    //                 index,
    //                 columns,
    //                 style,
    //                 className,
    //                 onRowDoubleClick,
    //                 rowData,
    //                 key
    //               }) => {
    //                 const a11yProps = { 'aria-rowindex': index + 1 };

    //                 if (onRowDoubleClick) {
    //                   a11yProps['aria-label'] = 'row';
    //                   a11yProps.tabIndex = 0;

    //                   if (onRowDoubleClick) {
    //                     a11yProps.onDoubleClick = event => onRowDoubleClick({ event, index, rowData });
    //                   }
    //                 }

    //                 return (
    //                   <div
    //                     {...a11yProps}
    //                     style={style}
    //                     key={key}
    //                     className={classNames(
    //                       (index % 2) ? classes.tableRowEven : classes.tableRowOdd,
    //                       index === songIndex && classes.tableRowActive,
    //                       classes.tableRow,
    //                       className
    //                     )}
    //                   >
    //                     {columns}
    //                   </div>
    //                 );
    //               }}
    //             >
    //               <Column
    //                 width={adjustedWidth}
    //                 maxWidth={30}
    //                 label='#'
    //                 cellDataGetter={({ rowData }) => (rowData.track !== 0 ? rowData.track : undefined)}
    //               />
    //               <Column
    //                 width={adjustedWidth}
    //                 label='Title'
    //                 dataKey='title'
    //               />
    //               <Column
    //                 width={adjustedWidth}
    //                 label='Artist'
    //                 dataKey='artist'
    //               />
    //               <Column
    //                 width={adjustedWidth}
    //                 label='Album'
    //                 dataKey='album'
    //               />
    //               <Column
    //                 width={adjustedWidth}
    //                 label='Duration'
    //                 cellDataGetter={({ rowData }) => convertToMinutes(rowData.duration * 1000)}
    //               />
    //             </Table>
    //           )}
    //         </ColumnSizer>
    //       )}
    //     </AutoSizer>
    //   )
    // );
    return (null);
  }
}

const mapStateToProps = state => ({
  count: state.list.songList.count,
  songList: state.list.songList.songs,
  songIndex: state.song.index
});

const mapDispatchToProps = dispatch => ({
  getSongList: () => dispatch(fetchSongList()),
  setSongStatus: status => dispatch(setStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(SongViewStyle)(LabelView));
