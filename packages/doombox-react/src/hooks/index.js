// Core
import { makeStyles } from '@material-ui/core/styles';

export {
  useAudio,
  useIpc,
  useTheme
} from './useContext';

export const useGlobalStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: 14,
      height: 14
    },
    '*::-webkit-scrollbar-corner': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[50],
      border: `4px solid ${theme.palette.grey[400]}`
    },
    '*::-webkit-scrollbar-track': {
      backgroundClip: 'padding-box',
      backgroundColor: theme.palette.grey[400]
    }
  }
}));
