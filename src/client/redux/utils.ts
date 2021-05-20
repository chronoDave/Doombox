import produce, { Draft } from 'immer';

type Reducer<S> = (draft: Draft<S>, payload: any) => void;
type Action = { type: string, payload: any };
type Dispatch = (payload: any) => Action;

export const createReduxSlice = <S, R extends Record<string, Reducer<S>>>(
  name: string,
  reducers: R,
  initialState: S
) => {
  const reducer = produce((draft, action: Action) => {
    const type = action.type.split('.').pop();
    if (type && reducers[type]) reducers[type](draft, action.payload);
  }, initialState);

  const actions = {} as Record<keyof R, Dispatch>;
  for (let i = 0, k = Object.keys(reducers); i < k.length; i += 1) {
    const type = k[i] as keyof R;
    const dispatch: Dispatch = payload => ({ type: `${name}.${type}`, payload });

    actions[type] = dispatch;
  }

  return { name, reducer, actions };
};
