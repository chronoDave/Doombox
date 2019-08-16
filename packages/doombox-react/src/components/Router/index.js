import { useContext } from 'react';
import { RouteContext } from './RouteContext';

export const useRoute = () => useContext(RouteContext);
export { default as RouteProvider } from './RouteProvider';
