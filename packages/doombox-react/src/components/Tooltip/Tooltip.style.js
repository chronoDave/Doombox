import { makeStyles } from '@material-ui/core/styles';

export const useTooltipStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[theme.isDarkTheme ? 50 : 800]
  },
  arrow: {
    color: theme.palette.grey[theme.isDarkTheme ? 50 : 800]
  }
}));
