// Core
import { makeStyles } from '@material-ui/core/styles';

export {
  useAudio,
  useRoute
} from './useContext';

export const useGlobalStyles = makeStyles(theme => ({
  '@global': {
    body: {
      overflow: 'hidden'
    },
    '*::-webkit-scrollbar': {
      backgroundColor: theme.palette.grey[300],
      width: theme.spacing()
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400]
    }
  }
}));
