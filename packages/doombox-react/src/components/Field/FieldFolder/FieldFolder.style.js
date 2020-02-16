import { makeStyles, fade } from '@material-ui/core/styles';

export const useFieldFolderStyles = makeStyles(theme => ({
  listItem: {
    backgroundColor: fade(theme.palette.grey[200], 0.8),
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1, 2)
  }
}));
