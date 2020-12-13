import { useEffect } from 'react';
import Mousetrap from 'mousetrap';

export default (keybind, fn) => {
  useEffect(() => {
    Mousetrap.bind(keybind, fn);
    return () => Mousetrap.unbind(keybind);
  }, [keybind, fn]);
};
