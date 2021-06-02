import * as yup from 'yup';
import { Theme, theme } from '@doombox-theme';

import Storage from './storage';

export default (root: string) => new Storage<Theme>(root, 'theme', yup.object({
  dark: yup.boolean().default(theme.dark),
  palette: yup.object({
    primary: yup.string().default(theme.palette.primary),
    black: yup.string().default(theme.palette.black),
    white: yup.string().default(theme.palette.white),
    grey: yup.object({
      100: yup.string().default(theme.palette.grey[100]),
      200: yup.string().default(theme.palette.grey[200]),
      300: yup.string().default(theme.palette.grey[300]),
      400: yup.string().default(theme.palette.grey[400]),
      500: yup.string().default(theme.palette.grey[500]),
      600: yup.string().default(theme.palette.grey[600]),
      700: yup.string().default(theme.palette.grey[700])
    }).default(theme.palette.grey)
  }).default(theme.palette)
}));
