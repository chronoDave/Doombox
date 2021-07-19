export interface Theme {
  dark: boolean,
  palette: {
    primary: {
      main: string
      text: string
    }
    error: {
      main: string
      text: string
    }
    black: string
    white: string
    grey: {
      100: string
      200: string,
      300: string
    }
  }
}

export interface Cache {
  window: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
}

export const theme: Readonly<Theme> = {
  dark: true,
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
