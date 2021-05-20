import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from '@emotion/css';

import store from '../../redux';

export interface AppProps {
  children: React.ReactElement
}

export default ({ children }: AppProps) => {
  useEffect(() => {
    injectGlobal({
      body: {
        margin: 0
      }
    });
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
