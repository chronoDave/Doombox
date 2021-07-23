const theme = {
  type: 'dark',
  palette: {
    primary: {
      main: '#664d82',
      text: '#f6f6f7',
    },
    error: {
      main: '#f04747',
      text: '#f6f6f7'
    },
    black: '#040405',
    white: '#f6f6f7',
    grey: {
      100: '#18191c',
      200: '#202225',
      300: '#36393f'
    }
  }
};

export default theme;
export type Theme = Readonly<typeof theme>;
