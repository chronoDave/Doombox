import Button from '../components/Button';
import Icon from '../components/Icon';

import Theme from '../theme';
import { minimize, maximize, close } from '../ipc/window.ipc';

export default () => (
  <div className="Window">
    <div className="icon">
      <img
        src={`../icons/icon_${Theme.dark ? 'dark' : 'light'}.png`}
        alt="Doombox icon"
        width={32}
        height={32}
      />
    </div>
    <div className="title">
      <p className="body">Doombox</p>
    </div>
    <div className="buttons">
      <Button title="Minimize" onClick={minimize}>
        <Icon id="minimize" small />
      </Button>
      <Button title="Maximize" onClick={maximize}>
        <Icon id="maximize" small />
      </Button>
      <Button title="Close" onClick={close}>
        <Icon id="close" small />
      </Button>
    </div>
  </div>
);
