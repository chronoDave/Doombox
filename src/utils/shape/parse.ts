import isShape from '../validation/isShape';

export default (x: string) => {
  try {
    const json = JSON.parse(x);
    return isShape(json) ?
      json :
      null;
  } catch (err) {
    return null;
  }
};
