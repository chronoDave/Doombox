import createPropertySelector from '../../utils/createPropertySelector';
import store from '../store';

export const themeSelector =
  createPropertySelector(store)(state => state.theme.theme);
