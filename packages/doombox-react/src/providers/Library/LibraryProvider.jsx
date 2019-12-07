import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Utils
import { LibraryContext } from '../../utils/context';

const LibraryProvider = ({ children }) => {
  const [songValue, setSongValue] = useState(null);

  return (
    <LibraryContext.Method.Provider value={setSongValue}>
      <LibraryContext.Songs.Provider value={songValue}>
        {children}
      </LibraryContext.Songs.Provider>
    </LibraryContext.Method.Provider>
  );
};

LibraryProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default LibraryProvider;
