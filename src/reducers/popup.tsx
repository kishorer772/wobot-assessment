import { useReducer } from 'react';

function reducer(_, action) {
  if (action.type === 'open') {
    return {
      open: true,
      data: action.data,
      mode: action.mode,
    };
  } else if (action.type === 'close') {
    return {
      open: false,
      data: null,
      mode: '',
    };
  }
}
export const usePopup = () => {
  const [state, dispatch] = useReducer(reducer, {
    open: false,
    data: null,
    mode: '',
  });
  return { state, dispatch };
};
