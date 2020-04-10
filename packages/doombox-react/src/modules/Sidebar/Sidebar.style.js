import { makeStyles } from '@material-ui/core/styles';

const calc = n => `calc(100% - ${n}px)`;

export const useSidebarStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: ({ hidePanel }) => (
      theme.dimensions.sidebar.tab +
      (!hidePanel ? theme.dimensions.sidebar.panel.xs : 0)
    ),
    height: calc(theme.dimensions.appBar),
    [theme.breakpoints.up('md')]: {
      width: ({ hidePanel }) => (
        theme.dimensions.sidebar.tab +
        (!hidePanel ? theme.dimensions.sidebar.panel.md : 0)
      ),
    }
  },
  tab: {
    width: theme.dimensions.sidebar.tab,
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    flexDirection: 'column'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.dimensions.sidebar.panel.xs,
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('md')]: {
      width: theme.dimensions.sidebar.panel.md
    }
  },
  children: {
    position: 'fixed',
    paddingLeft: 1,
    left: ({ hidePanel }) => (
      theme.dimensions.sidebar.tab +
      (!hidePanel ? theme.dimensions.sidebar.panel.xs : 0)
    ),
    height: calc(theme.dimensions.appBar),
    width: ({ hidePanel }) => calc(
      theme.dimensions.sidebar.tab +
      (!hidePanel ? theme.dimensions.sidebar.panel.xs : 0)
    ),
    overflow: 'auto',
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('md')]: {
      left: ({ hidePanel }) => (
        theme.dimensions.sidebar.tab +
        (!hidePanel ? theme.dimensions.sidebar.panel.md : 0)
      ),
      width: ({ hidePanel }) => calc(
        theme.dimensions.sidebar.tab +
        (!hidePanel ? theme.dimensions.sidebar.panel.md : 0)
      ),
    }
  }
}));
