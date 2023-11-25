import { atom } from 'recoil';

export const activeSideItemState = atom({
  key: 'activeSideItemState',
  default: '',
});

export const smallMenuState = atom({
  key: 'smallMenuState',
  default: false,
});

export const searchTextState = atom({
  key: 'searchTextState',
  default: '',
});
