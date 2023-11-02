import type {User} from 'firebase/auth';
import {atom} from 'recoil';

export const authRecoilState = atom<User | null>({
  key: 'userState',
  default: null,
});
