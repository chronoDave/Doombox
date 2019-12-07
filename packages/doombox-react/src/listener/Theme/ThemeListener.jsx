import {
  useMemo,
  useEffect
} from 'react';
import {
  TYPE,
  ACTION
} from '@doombox/utils';

// Actions
import { sendIpc } from '../../actions';

// Hooks
import { useIpc } from '../../hooks';
import { useTheme } from '../../hooks/useContext';

// Utils
import { HOOK } from '../../utils/const';

const ThemeListener = ({ children }) => {
  const { setDarkMode, setColors } = useTheme(HOOK.THEME.METHOD);
  const { darkMode, colors } = useIpc(TYPE.IPC.CONFIG);

  useEffect(() => {
    sendIpc(TYPE.IPC.CONFIG, {
      action: ACTION.CRUD.READ,
      data: { configKey: 'color' }
    });
  }, []);

  useEffect(() => {
    setDarkMode(darkMode);
  }, [darkMode]);

  useEffect(() => {
    setColors(colors);
  }, [colors]);

  return useMemo(() => children, []);
};

export default ThemeListener;
