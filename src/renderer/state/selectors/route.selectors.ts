import createPropertySelector from '../../utils/createPropertySelector';
import store from '../store';

export const routeSelector =
  createPropertySelector(store)(state => state.route);
