import * as yup from 'yup';
import { theme, Theme } from '@doombox/config';

import Storage from './storage';

export default new Storage<Theme>('theme', yup.object().shape({
  dark: yup.boolean().required().default(theme.dark),
  palette: yup.object().shape({
    primary: yup.object().shape({
      main: yup.string().required().default(theme.palette.primary.main),
      text: yup.string().required().default(theme.palette.primary.text),
    }).default(theme.palette.primary),
    error: yup.object().shape({
      main: yup.string().required().default(theme.palette.error.main),
      text: yup.string().required().default(theme.palette.error.text),
    }).default(theme.palette.error),
    grey: yup.object().shape({
      100: yup.string().required().default(theme.palette.grey[100]),
      200: yup.string().required().default(theme.palette.grey[200]),
      300: yup.string().required().default(theme.palette.grey[300])
    }).default(theme.palette.grey),
    black: yup.string().required().default(theme.palette.black),
    white: yup.string().required().default(theme.palette.white),
  }).required().default(theme.palette)
}));
