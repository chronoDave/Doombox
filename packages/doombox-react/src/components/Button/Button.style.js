export const ButtonStyles = theme => ({
  avatarRoot: {
    borderRadius: '50%'
  },
  hover: {
    transition: theme.transitions.create(['border-radius'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      borderRadius: '25%'
    }
  }
});
