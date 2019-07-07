import React, { useEffect } from 'react';

// Core
import { Main } from '../components/Main';

// Actions
import { fetchUser } from '../actions/fetchActions';

const HomePage = () => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Main>HomePage</Main>
  );
};

export default HomePage;
