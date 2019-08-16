import React, { createElement } from 'react';

// Core
import { useRoute } from '../components/Router';

// Views
import * as Views from './views';

// Template
import { MainTemplate } from './templates';

const HomePage = () => {
  const { view } = useRoute();

  return (
    <MainTemplate>
      {createElement(Views[`${view}View`])}
    </MainTemplate>
  );
};

export default HomePage;
