import React, { Fragment } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { withTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Link
} from '@material-ui/core';

import {
  BgImageProvider,
  BgColorProvider
} from '../../components/Background';
import { FormCreateProfile } from '../../components/Form';
import { Typography } from '../../components/Typography';

const CreateProfilePage = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <BgImageProvider>
      <BgColorProvider color={theme.palette.getAlpha(theme.palette.grey[500], 0.66)}>
        <Fragment>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Card>
              <Box pt={3} display="flex" justifyContent="center">
                <Typography variant="h6" align="center">
                  {t('title:createProfile')}
                </Typography>
              </Box>
              <Box p={3} pb={2} minWidth={300}>
                <FormCreateProfile />
              </Box>
            </Card>
            <Box pl={12}>
              <Typography variant="h1">
                Doombox
              </Typography>
              <Typography variant="h4" color="textTertiary">
                {t('title:slogan')}
              </Typography>
            </Box>
          </Box>
          <Box
            position="fixed"
            bottom={16}
            left={0}
            width="100%"
            display="flex"
            justifyContent="center"
            color={theme.palette.getAlpha(theme.palette.grey[0], 0.5)}
          >
            <Typography variant="caption">
              <Trans i18nKey="description:bgCredits">
                Photo by&nbsp;
                <Link href="https://unsplash.com/@dafidvor?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  David Dvořáček
                </Link>
                &nbsp;on&nbsp;
                <Link href="https://unsplash.com/search/photos/koi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Unsplash
                </Link>
              </Trans>
            </Typography>
          </Box>
        </Fragment>
      </BgColorProvider>
    </BgImageProvider>
  );
};

CreateProfilePage.propTypes = {
  theme: PropTypes.object.isRequired
};

export default withTheme(CreateProfilePage);
