const fontFamily = ['NotoSansJP', 'sans-serif'].join(',');

const pxToRem = px => `${px / 16}rem`;

export default {
  pxToRem,
  fontFamily,
  h1: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(112),
    letterSpacing: pxToRem(-1.5)
  },
  h2: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(72),
    letterSpacing: pxToRem(-0.5)
  },
  h3: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(56),
    letterSpacing: 0
  },
  h4: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(40),
    letterSpacing: pxToRem(0.25)
  },
  h5: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(28),
    letterSpacing: pxToRem(0)
  },
  h6: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(20),
    letterSpacing: pxToRem(0.25)
  },
  body: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(13),
    letterSpacing: pxToRem(0.5)
  },
  subtitle: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(12),
    letterSpacing: pxToRem(0.25)
  },
  caption: {
    fontFamily,
    fontWeight: 400,
    fontSize: pxToRem(10),
    letterSpacing: pxToRem(0.5)
  }
};
