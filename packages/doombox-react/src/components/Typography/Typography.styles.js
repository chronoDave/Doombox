import { makeStyles } from '@material-ui/core';

export const useTypographyStyles = makeStyles(() => ({
  clamp: ({ clamp }) => ({
    width: '100%',
    display: '-webkit-box',
    '-webkit-line-clamp': clamp,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  })
}));
