import type { ThumbarButton } from 'electron';

import { nativeImage } from 'electron';
import path from 'path';

export type ThumbarButtonProps = {
  tooltip: string
  icon: string
  hidden?: boolean
  click: () => void
};

export default (props: ThumbarButtonProps): ThumbarButton => ({
  tooltip: props.tooltip,
  icon: nativeImage.createFromPath(path.resolve(__dirname, `assets/icons/${props.icon}-white.png`)),
  flags: props.hidden ? ['hidden'] : undefined,
  click: props.click
});
