import { makeStyles } from '@material-ui/core/styles';

export const useTypographyStyles = makeStyles(theme => ({
  clamp: ({ clamp }) => ({
    width: '100%',
    display: '-webkit-box',
    '-webkit-line-clamp': clamp,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  }),
  helperText: {
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    margin: theme.spacing(1)
  }
}));
