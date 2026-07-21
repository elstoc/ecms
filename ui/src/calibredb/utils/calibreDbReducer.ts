import { getRandomSeed } from '@/utils';

import { CalibreDbState, StateAction, initialFilters } from '../hooks/useCalibreDb';

export const calibreDbReducer: (state: CalibreDbState, action: StateAction) => CalibreDbState = (
  state,
  action,
) => {
  if (action.type === 'setPages') {
    return { ...state, pages: action.payload };
  }
  if (action.type === 'setApiFilter') {
    const { key, value } = action.payload;
    return {
      ...state,
      pages: 1,
      apiFilters: {
        ...state.apiFilters,
        [key]: value,
        shuffleSeed:
          key === 'sortOrder' && value === 'shuffle'
            ? getRandomSeed()
            : state.apiFilters.shuffleSeed,
      },
    };
  }
  if (action.type === 'resetFilters') {
    return {
      ...state,
      pages: 1,
      mode: 'browse',
      apiFilters: { ...initialFilters },
    };
  }
  if (action.type === 'toggleMode') {
    const newMode = state.mode === 'browse' ? 'search' : 'browse';
    const { devices, bookPath, sortOrder } = state.apiFilters;
    return {
      ...state,
      mode: newMode,
      pages: 1,
      apiFilters: {
        ...initialFilters,
        devices,
        bookPath,
        sortOrder,
        exactPath: newMode === 'browse',
      },
    };
  }
  return state;
};
