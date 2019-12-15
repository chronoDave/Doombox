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
  const [dialog, setDialog] = useState(null);

  const methodValue = useMemo(() => ({
    setDomain: newDomain => setDomain(newDomain),
    setPage: newPage => setPage(newPage),
    openDialog: newDialog => setDialog(newDialog),
    closeDialog: () => setDialog(null)
  }), []);

  const locationValue = useMemo(() => ({
    domain, page, dialog
  }), [domain, page, dialog]);

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
