import { useState, useEffect } from 'react';
import { css } from '@emotion/css';

type Styles = Record<string, Record<string, any>>;

export const makeStyles = <T extends Styles>(
  label: string,
  styles: (theme: any) => T
) => {
  const userTheme = useTheme();

  const createClasses = (theme: any) => {
    const classes: Record<string, string> = {};
    for (let i = 0, e = Object.entries(styles); i < e.length; i += 1) {
      const [key, style] = e[i];
      classes[key] = css(style(theme), { label });
    }
  };

  const [classes, setClasses] = useState(createClasses(userTheme));

  useEffect(() => {

  }, []);

  return classes;
  // const userTheme = useTheme();

  // const classes: Record<string, string> = {};
  // for (let i = 0, c = Object.entries(styles); i < c.length; i += 1) {
  //   const [key, style] = c[i];

  //   classes[key] = css(style(userTheme), { label });
  // }

  // return classes as Record<keyof T, string>;
};

const classes = makeStyles(
  'makeStyles',
  () => ({ root: { a: '3' } })
);
