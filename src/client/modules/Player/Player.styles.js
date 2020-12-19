import url from 'url';

import { makeStyles } from '../../theme';

// Assets
import backgroundDefault from '../../assets/images/backgroundDefault.png';

export default makeStyles(theme => ({
  root: ({ cover = {} }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: theme.createImage((cover.file ?
      url.pathToFileURL(cover.file).href :
      backgroundDefault
    )),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(0.5),
    height: 80,
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.xs
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.xs
      )
    )]: {
      height: theme.mixins.player.xs.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.sm
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.sm
      )
    )]: {
      height: theme.mixins.player.sm.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.md
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.md
      )
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
