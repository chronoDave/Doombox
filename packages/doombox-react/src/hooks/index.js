// Core
import { makeStyles } from '@material-ui/core/styles';

export {
  useAudio,
  useIpc,
  useTheme,
  useRoute
} from './useContext';

export const useGlobalStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      backgroundColor: theme.palette.grey[0],
      width: theme.spacing(0.5)
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[300]
    }
  }
}));
