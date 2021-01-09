import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  h1: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(112),
    letterSpacing: theme.pxToRem(-1.5)
  },
  h2: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(72),
    letterSpacing: theme.pxToRem(-0.5)
  },
  h3: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(56),
    letterSpacing: 0
  },
  h4: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(40),
    letterSpacing: theme.pxToRem(0.25)
  },
  h5: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(28),
    letterSpacing: theme.pxToRem(0)
  },
  h6: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(16),
    letterSpacing: theme.pxToRem(0.25)
  },
  body: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(13),
    letterSpacing: theme.pxToRem(0.5)
  },
  subtitle: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(12),
    letterSpacing: theme.pxToRem(0.25)
  },
  caption: {
    fontFamily: 'NotoSansJP, sans-serif',
    fontWeight: 400,
    fontSize: theme.pxToRem(10),
    letterSpacing: theme.pxToRem(0.5)
  },
  root: {
    margin: 0
  },
  noWrap: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }
}), 'typography');
