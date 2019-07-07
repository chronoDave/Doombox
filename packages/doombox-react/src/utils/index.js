export const isDev = () => process.env.NODE_ENV === 'development';
export const isEmptyObj = obj => Object.keys(obj).length === 0;
