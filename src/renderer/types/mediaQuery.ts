export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Breakpoint = `${Size}-w` | `${Size}-h`;
export type Axis = 'min-width' | 'max-width' | 'min-height' | 'max-height';

export type MediaQuery = {
  axis: Axis
  breakpoint: Breakpoint
};
