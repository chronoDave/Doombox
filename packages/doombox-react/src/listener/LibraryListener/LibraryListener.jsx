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
import { useLibrary } from '../../hooks/useContext';

// Utils
import { HOOK } from '../../utils/const';

const LibraryListener = ({ children }) => {
  const { songs } = useIpc(TYPE.IPC.LIBRARY);
  const setSongValue = useLibrary(HOOK.LIBRARY.METHOD);

  useEffect(() => {
    sendIpc(TYPE.IPC.LIBRARY, {
      action: ACTION.CRUD.READ,
      data: {}
    });
  }, []);

  useEffect(() => {
    setSongValue(songs || null);
  }, [songs]);

  return useMemo(() => children, []);
};

export default LibraryListener;
