export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_JSDOM = process.env.DOM === 'development';

export const MIN_WIDTH = 480;
export const MIN_HEIGHT = 360;

type Theme = {
  text: string
  background: string
  primary: string
  secondary: string
  accent: string
};

export const THEME_DARK: Theme = {
  text: '#edf2f5',
  background: '#1c1f21',
  primary: '#674d84',
  secondary: '#503e6b',
  accent: '#a67bb3'
};

export const THEME_LIGHT: Theme = {
  text: '#09070c',
  background: '#fcfbfd',
  primary: '#957bb2',
  secondary: '#d0aeca',
  accent: '#b580a3'
};
