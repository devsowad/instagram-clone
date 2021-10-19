import { atom, useRecoilState } from 'recoil';

const modalState = atom({
  key: 'modalState',
  default: false,
});

export const useModalState = () => {
  return useRecoilState(modalState);
};
