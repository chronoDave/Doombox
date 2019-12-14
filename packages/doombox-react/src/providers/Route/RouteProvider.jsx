import React, {
  useState,
  useMemo
} from 'react';
import PropTypes from 'prop-types';

// Utils
import { PATH } from '../../utils/const';
import { RouteContext } from '../../utils/context';

const Router = ({ children }) => {
  const [domain, setDomain] = useState(PATH.DOMAIN.ROOT);
  const [page, setPage] = useState(PATH.PAGE.ALBUM);

  const methodValue = useMemo(() => ({
    setDomain: newDomain => setDomain(newDomain),
    setPage: newPage => setPage(newPage)
  }), []);

  const locationValue = useMemo(() => ({
    domain, page
  }), [domain, page]);

  return (
    <RouteContext.Method.Provider value={methodValue}>
      <RouteContext.Location.Provider value={locationValue}>
        {children}
      </RouteContext.Location.Provider>
    </RouteContext.Method.Provider>
  );
};

Router.propTypes = {
  children: PropTypes.element.isRequired
};

export default Router;
