import { fade } from '@material-ui/core/styles';

const SettingsPageStyle = theme => ({
  iconError: {
    color: theme.palette.error.main
  },
  listItemRoot: {
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25)
    }
  },
  listItemSelected: {
    backgroundColor: `${fade(theme.palette.primary.main, 0.9)} !important`
  },
  listSubheaderRoot: {
    whiteSpace: 'nowrap',
    color: fade(theme.palette.grey[100], 0.8)
  },
  listLanguageSelected: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius
  },
  listItemPaddingRight: {
    paddingRight: theme.spacing(10)
  }
});

export default SettingsPageStyle;
