import { makeStyles } from '@material-ui/core/styles';

export const useFieldStyle = makeStyles(theme => ({
  menuItemRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  selectMenu: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1)
  },
  iconDatabaseCheck: {
    color: theme.palette.success.main
  },
  iconDatabaseError: {
    color: theme.palette.error.main
  },
  inputLabelPropsDisabled: {
    color: `${theme.palette.success.main} !important`
  },
  inputPropsDisabled: {
    color: `${theme.palette.success.main} !important`,
    '& fieldset': {
      borderColor: `${theme.palette.success.main} !important`
    }
  },
  icon: {
    color: theme.palette.grey[50]
  }
}));
