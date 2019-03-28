const PlaybackControllerStyle = theme => ({
  root: {
    height: theme.spacing.component.playerControls,
    backgroundColor: theme.palette.grey[600],
    position: 'fixed',
    bottom: 0
  },
  playerText: {
    maxWidth: 420,
  }
});

export default PlaybackControllerStyle;
