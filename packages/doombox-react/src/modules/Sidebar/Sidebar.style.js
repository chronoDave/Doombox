import { makeStyles } from '@material-ui/core/styles';

export const useSidebarStyle = makeStyles(theme => ({
  paper: {
    width: theme.component.sidebar,
    backgroundColor: theme.palette.grey[400],
  },
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
  },
  button: {
    padding: theme.spacing(),
    color: theme.palette.grey[50]
  },
  img: {
    width: 60,
    height: 60,
    overflow: 'hidden'
  }
}));
