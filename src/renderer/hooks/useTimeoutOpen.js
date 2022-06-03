import { useState } from 'react';

// Hooks
import useTimeout from './useTimeout';

export default delay => {
  const [open, setOpen] = useState(false);

  const [onEnter, cancelOnEnter] = useTimeout(() => setOpen(true), delay);
  const [onLeave, cancelOnLeave] = useTimeout(() => setOpen(false), delay);

  return ({
    open,
    setOpen,
    handleEnter: () => {
      onEnter();
      cancelOnLeave();
    },
    handleLeave: () => {
      onLeave();
      cancelOnEnter();
    }
  });
};
