import { makeStyles } from '@material-ui/core/styles';

export const useSliderStyle = makeStyles(theme => ({
  sliderRoot: {
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(2),
  },
  sliderRail: {
    height: theme.spacing(0.5),
    color: theme.palette.grey[200]
  },
  sliderTrack: {
    height: theme.spacing(0.5),
    color: theme.palette.grey[50]
  },
  sliderThumb: {
    color: theme.palette.grey[50],
    marginTop: -theme.spacing(0.5),
    width: theme.spacing(1.5),
    height: theme.spacing(1.5)
  },
  sliderValueLabel: {
    color: theme.palette.primary.main,
    fontSize: '0.66em'
  }
}));
