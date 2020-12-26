import url from 'url';

import { makeStyles } from '../../theme';

// Assets
import backgroundDefault from '../../assets/images/backgroundDefault.png';

export default makeStyles(theme => ({
  root: ({ image }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: theme.createImage((image ?
      url.pathToFileURL(image).href :
      backgroundDefault
    )),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(0.5),
    height: 80,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'xs'),
      theme.breakpoints.create('minHeight', 'xs')
    )]: {
      height: theme.mixins.player.xs.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      height: theme.mixins.player.sm.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'md'),
      theme.breakpoints.create('minHeight', 'md')
    )]: {
      height: theme.mixins.player.md.height
    }
  }),
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  duration: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  controls: {
    backgroundColor: theme.palette.grey[0]
  }
}), 'player');
