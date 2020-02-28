import { makeStyles, fade } from '@material-ui/core/styles';

export const useContextStyles = makeStyles(theme => ({
  dividerLine: {
    height: 1,
    flexGrow: 1,
    backgroundColor: fade(theme.palette.text.primary, 0.25),
  }
}));
