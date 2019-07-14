// Hooks
import { useSubscribeUser } from '../../hooks';

const Listener = ({ children }) => {
  useSubscribeUser();

  return children;
};

export default Listener;
