import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import './input-folder.scss';

export type InputFoldersProps = {
  id: string
  label: string
  folders: string[]
  onadd: (folders: string[]) => void
  onremove: (folder: string[]) => void
};

const InputFolders: Component<InputFoldersProps> = () => {
  const selected: Set<string> = new Set();

  const component = new forgo.Component<InputFoldersProps>({
    render(props) {
      const handleChange = (event: forgo.JSX.TargetedEvent<HTMLUListElement, Event>) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
          selected.add(target.id);
        } else {
          selected.delete(target.id);
        }
        component.update();
      };

      return (
        <div class='input-folder form-group'>
          <fieldset name='folders'>
            <legend>{props.label}</legend>
            {props.folders.length === 0 ? (
              <span>No folders selected</span>
            ) : (
              <ul class='vertical' onchange={handleChange}>
                {props.folders.map(folder => (
                  <li key={folder}>
                    <input id={folder} type='checkbox' />
                    <label for={folder}>{folder}</label>
                  </li>
                ))}
              </ul>
            )}
          </fieldset>
          <div class='toolbar'>
            <button
              class='primary'
              type='button'
              onclick={async () => {
                const folders = await window.ipc.os.folders();
                if (folders.length > 0) props.onadd(folders);
              }}
            >
              <Icon id='folder-plus' />
              <span>Add folder(s)</span>
            </button>
            <button
              class='primary'
              type='button'
              disabled={selected.size === 0}
              onclick={async () => {
                props.onremove(Array.from(selected));
                selected.clear();
              }}
            >
              <Icon id='folder-minus' />
              <span>Remove folder(s)</span>
            </button>
          </div>
        </div>
      );
    }
  });

  return component;
};

export default InputFolders;
