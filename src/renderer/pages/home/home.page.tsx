import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Button from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { addFolders } from '../../ipc/library';

import './home.page.scss';

export type HomePageProps = {};

export const HomePage: Component<HomePageProps> = () => new forgo.Component({
  render() {
    return (
      <div class='HomePage'>
        <h1 class="text-header">
          <Icon id="libraryMusic" />
          Create library
        </h1>
        <p class="text-body">Start using Doombox by selecting a folder containing music files.</p>
        <Button onclick={() => addFolders().then(console.log)} variant="filled">
          <Icon id="folderAdd" />
          <p>Select folder</p>
        </Button>
      </div>
    );
  }
});
