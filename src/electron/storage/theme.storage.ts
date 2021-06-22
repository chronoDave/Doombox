import * as yup from 'yup';
import theme, { Theme } from '@doombox-theme';

import Storage from './storage';

export default (root: string) => new Storage<Theme>(root, 'theme', yup.object().shape({
  dark: yup.boolean().required().default(theme.dark),
  palette: yup.object().shape({
    primary: yup.string().required().default(theme.palette.primary),
    black: yup.string().required().default(theme.palette.black),
    white: yup.string().required().default(theme.palette.white),
    background: yup.string().required().default(theme.palette.background)
  }).required().default(theme.palette)
}));
