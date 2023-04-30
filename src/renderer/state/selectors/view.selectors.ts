import createPropertySelector from '../../utils/createPropertySelector';
import store from '../store';

export const appViewSelector =
  createPropertySelector(store)(state => state.view.app);

export const settingsViewSelector =
  createPropertySelector(store)(state => state.view.settings);
