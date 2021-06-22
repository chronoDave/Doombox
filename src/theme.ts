export interface Theme {
  dark: boolean,
  palette: {
    primary: string
    black: string
    white: string
    background: string
  }
}

const theme: Readonly<Theme> = {
  dark: true,
  palette: {
    primary: '#664d82',
    black: '#040405',
    white: '#f6f6f7',
    background: '#202225'
  }
};

export default theme;
