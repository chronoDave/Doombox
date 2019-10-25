import React, {
  Fragment,
  createElement,
  useEffect
} from 'react';
import { useTranslation } from 'react-i18next';

// Core
import { useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Box,
  Hidden
} from '@material-ui/core';

import {
  BackgroundImage,
  BackgroundFade
} from '../components/Background';
import { Typography } from '../components/Typography';

// Hooks
import { useRoute } from '../hooks';

// Views
import * as Views from '../views/Landing';

// Utils
import { isValidView } from '../utils';
import { LANDING_VIEWS } from '../utils/const';
import { version } from '../../package.json';

const LandingPage = () => {
  const { t } = useTranslation();
  const { breakpoints } = useTheme();
  const isDownSm = useMediaQuery(breakpoints.down('sm'));
  const { view, setView } = useRoute();

  useEffect(() => {
    if (!isValidView(LANDING_VIEWS, view)) setView(LANDING_VIEWS.CREATE);
  }, [view]);

  return (
    <Fragment>
      <BackgroundImage />
      <BackgroundFade />
      <Box
        display="flex"
        justifyContent="center"
        flexDirection={isDownSm ? 'column' : 'row-reverse'}
        alignItems="center"
        height="100%"
        minHeight="100vh"
        p={4}
      >
        <Box
          pb={isDownSm ? 4 : 0}
          display="flex"
          justifyContent="center"
          flexGrow={isDownSm ? 0 : 0.33}
        >
          <Box>
            <Box display="flex" alignItems="baseline">
              <Typography variant="h1">
                Doombox
              </Typography>
              <Hidden smDown>
                <Box pl={1}>
                  <Typography>
                    {version}
                  </Typography>
                </Box>
              </Hidden>
            </Box>
            <Typography
              variant={isDownSm ? 'subtitle1' : 'h5'}
              align={isDownSm ? 'center' : 'left'}
            >
              {isDownSm ? version : t('slogan')}
            </Typography>
          </Box>
        </Box>
        {isValidView(LANDING_VIEWS, view) ? (
          createElement(Views[`Landing${view}View`], { view })
        ) : null}
      </Box>
    </Fragment>
  );
};

export default LandingPage;
