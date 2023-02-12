import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';
import InputCheckbox from '../inputCheckbox/inputCheckbox';

import './inputFolders.scss';

export type InputFoldersProps = {
  label: string
  folders: string[]
  onadd: (folders: string[]) => void
  onremove: (folder: string[]) => void
};

const InputFolders: Component<InputFoldersProps> = () => {
  const selected: Set<string> = new Set();

  const setSelected = (folder: string) => selected.has(folder) ?
    selected.delete(folder) :
    selected.add(folder);

  const component = new forgo.Component<InputFoldersProps>({
    render(props) {
      return (
        <fieldset class='InputFolders'>
          <legend>{props.label}</legend>
          <div
            class='options'
            role='presentation'
            onchange={e => {
              const { value } = e.target as HTMLInputElement;
              if (value) setSelected(value);
              component.update();
            }}
          >
            {props.folders.map(folder => (
              <InputCheckbox
                id={folder}
                label={folder}
                value={folder}
                checked={selected.has(folder)}
              />
            ))}
          </div>
          <div class='toolbar'>
            <button
              type='button'
              aria-label='remove selected folders'
              disabled={selected.size === 0}
              onclick={() => {
                props.onremove(Array.from(selected));
                selected.clear();
              }}
            >
              <Icon id='folderRemove' />
            </button>
            <button
              type='button'
              aria-label='add folders'
              onclick={async () => {
                const folders = await window.ipc.app.selectFolders();
                if (folders.length > 0) props.onadd(folders);
              }}
            >
              <Icon id='folderPlus' />
            </button>
          </div>
        </fieldset>
      );
    }
  });

  return component;
};

export default InputFolders;
