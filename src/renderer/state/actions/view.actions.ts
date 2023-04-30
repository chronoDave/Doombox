import type { RendererShape } from '../../../types/shapes/renderer.shape';
import type { AppView, SettingsView } from '../../../types/views';

import produce from 'immer';

import store from '../store';

export const setViewApp = async (view: AppView) => {
  const current = store.get();
  if (current.view.app !== view) {
    store.dispatch(produce(draft => {
      draft.view.app = view;
    }), 'view.setViewApp');

    const cache = await window.ipc.cache.get();
    window.ipc.cache.set(produce<RendererShape>(draft => {
      draft.tab = view;
    })(cache));
  }
};

export const setViewSettings = (view: SettingsView) => {
  const current = store.get();
  if (current.view.settings !== view) {
    store.dispatch(produce(draft => {
      draft.view.settings = view;
    }), 'view.setViewSettings');
  }
};
