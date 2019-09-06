import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';


// Icon
import IconVisible from '@material-ui/icons/Visibility';
import IconHidden from '@material-ui/icons/VisibilityOff';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { IconDatabaseRemove } from '../components/Icon';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';

// Validation
import { propError } from '../validation/propTypes';

const OfflinePage = () => {
  const { t } = useTranslation();
  // const [open, setOpen] = useState(false);
  // const [visible, setVisible] = useState(false);

  return (
    <div>ErrorPage</div>
    // <Fragment>
    //   <Box
    //     display="flex"
    //     justifyContent="center"
    //     alignItems="center"
    //     height="100vh"
    //   >
    //     <Box
    //       display="flex"
    //       flexDirection="column"
    //       maxWidth={720}
    //       p={2}
    //     >
    //       <Box fontSize="4em">
    //         <IconDatabaseRemove fontSize="inherit" />
    //       </Box>
    //       <Typography variant="h5" paragraph>
    //         {t('error:mongodb', { context: 'connection' })}
    //       </Typography>
    //       <Typography>
    //         {t('error:mongodb', { context: 'connectionWhy' })}
    //       </Typography>
    //       <Box
    //         display="flex"
    //         justifyContent="space-between"
    //         alignItems="center"
    //         mt={3}
    //         pl={3}
    //         pr={1}
    //         py={2}
    //         borderRadius="borderRadius"
    //         bgcolor="grey.500"
    //         border={1}
    //         borderColor="grey.600"
    //       >
    //         <Typography
    //           align="center"
    //           color="grey.100"
    //           breakWord
    //         >
    //           {visible ? error.message : '*'.repeat(error.message.length)}
    //         </Typography>
    //         <Box ml={1} color="grey.50">
    //           <IconButton
    //             onClick={() => setVisible(!visible)}
    //             color="inherit"
    //           >
    //             {visible ? <IconVisible /> : <IconHidden />}
    //           </IconButton>
    //         </Box>
    //       </Box>
    //       <Box display="flex" justifyContent="flex-end" pt={4}>
    //         <Button
    //           mr={1}
    //           onClick={() => setOpen(true)}
    //         >
    //           {t('edit', { context: 'connection' })}
    //         </Button>
    //         <Button
    //           color="primary"
    //           variant="contained"
    //           onClick={() => window.location.reload(true)}
    //           ml={1}
    //         >
    //           {t('retry')}
    //         </Button>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Fragment>
  );
};

OfflinePage.propTypes = {
  error: propError.isRequired
};

export default OfflinePage;
