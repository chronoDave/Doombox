import { makeStyles } from '@material-ui/core/styles';

export const useSidebarPlayerStyle = makeStyles(theme => ({
  sliderRoot: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.5)
  },
  sliderThumb: {
    marginTop: -4,
    width: 9,
    height: 9
  },
  sliderValueLabel: {
    fontSize: '0.66em'
  }
}));
