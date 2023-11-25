import { atom } from 'recoil';
import { getUserFromSessionStorage } from '../bundle/sessionStorage';
// import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

export const adminUserState = atom({
  key: 'cihAdminUserState',
  default: getUserFromSessionStorage(),
  /*
  default: {
    email: '',
    phone: '',
    password: '',
    name: '',
    userId: '',
    cCode: '',
    adminLevel: '',
    churchName: '',
    regDate: '',
    updDate: '',
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
  */
});
