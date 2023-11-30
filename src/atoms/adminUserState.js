import { atom } from 'recoil';
import { getUserFromSessionStorage } from '../bundle/sessionStorage';
// import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

export const adminUserState = atom({
  key: 'cihAdminUserState',
  default: getUserFromSessionStorage(),
  /*
  default: {
    uid
    email
    phone
    password
    admin_level
    c_code
    name
    nickname
    comment
    pic
    token
    regid
    regdate
    updid
    upddate
        },  },
  effects_UNSTABLE: [persistAtom],
  */
});
