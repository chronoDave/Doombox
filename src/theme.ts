export interface Theme {
  dark: boolean,
  palette: {
    primary: string
    black: string
    white: string
    grey: {
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
    }
  }
}

export const theme: Readonly<Theme> = {
  dark: true,
  palette: {
    primary: '#664d82',
    black: '#040405',
    white: '#f6f6f7',
    grey: {
      100: '#18191c',
      200: '#202225',
      300: '#36393f',
      400: '#4f545c',
      500: '#72767d',
      600: '#b9bbbe',
      700: '#dcddde'
    }
  }
};
