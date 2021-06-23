export interface Theme {
  dark: boolean,
  palette: {
    primary: {
      main: string
      text: string
    }
    black: string
    white: string
    background: string
  }
}

const theme: Readonly<Theme> = {
  dark: true,
  palette: {
    primary: {
      main: '#664d82',
      text: '#f6f6f7',
    },
    black: '#040405',
    white: '#f6f6f7',
    background: '#202225'
  }
};

export default theme;
