import { makeStyles } from '@material-ui/core/styles';

export const useFieldPaletteStyles = makeStyles(theme => ({
  textField: {
    margin: 0,
    width: theme.spacing(12)
  },
  button: {
    margin: theme.spacing(1),
    borderRadius: 4
  }
}));
