import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.5, 1),
    minWidth: 0,
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.sm
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.xs
      )
    )]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing()
    }
  }
}), 'playlistTitle');
