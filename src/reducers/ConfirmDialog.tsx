import { useReducer } from 'react';
import { CameraProps } from '../types/camera';
export type Action =
  | { type: 'open'; data: CameraProps; mode: string }
  | { type: 'close' };

function reducer(_, action) {
  if (action.type === 'open') {
    return {
      open: true,
      mode: action.mode,
      data: action.data,
    };
  } else if (action.type === 'close') {
    return {
      open: false,
      mode: '',
      data: null,
    };
  }
}
export const useConfirm = () => {
  const [state, dispatch] = useReducer(reducer, {
    open: false,
    mode: 'Active',
    data: null,
  });
  return { state, dispatch };
};
