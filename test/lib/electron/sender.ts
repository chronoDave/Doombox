import type { WebContents } from 'electron';

const sender = {
  send: () => {}
} as unknown as WebContents;

export default sender;
