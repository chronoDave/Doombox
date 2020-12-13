import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(-0.5),
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
      marginBottom: 0
    }
  }
}), 'playerControls');
