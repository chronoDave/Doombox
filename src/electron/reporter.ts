import fs from 'fs';
import path from 'path';

export default class Reporter {
  private root: string;

  constructor(root: string) {
    this.root = root;

    fs.mkdirSync(root, { recursive: true });
  }

  private getTimestamp() {
    const now = new Date();

    const y = now.getFullYear();
    const m = `${now.getUTCMonth() + 1}`.padStart(2, '0');
    const d = now.getUTCDate();

    return `${y}-${m}-${d}`;
  }

  log(text: string, title: string, type: 'log' | 'error' = 'log') {
    fs.writeFileSync(
      path.join(this.root, `[${this.getTimestamp()}] ${title} (${type})`),
      text
    );
  }

  logError(error: Error, title: string) {
    this.log([
      `TIME\n${new Date().toLocaleDateString()} (local time)`,
      `MESSAGE\n${error.message}`,
      `STACK\n${error.stack}`
    ].join('\n\n'), title, 'error');
  }
}
