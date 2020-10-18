// Default style specifity
export const menuStyles = theme => ({
  paperRoot: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemRoot: {
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1.5),
    transition: theme.transitions.create(
      ['background-color'],
      { duration: theme.transitions.duration.shortest }
    ),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  }
});
