import type {User} from 'firebase/auth';
import {getAuth, signInWithCustomToken} from 'firebase/auth';
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from 'firebase/functions';

import {app} from '../../app/_layout';

export const signInUser = async (code: string): Promise<{user: User}> => {
  const functions = getFunctions(app, 'asia-northeast3');
  // Emulator
  if (__DEV__) {
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
  }

  const auth = httpsCallable(functions, 'auth');

  return auth({code}).then(async (result) => {
    const data = result.data as {token: string};
    const user = await signInWithCustomToken(getAuth(), data.token)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        throw new Error(error);
      });

    return {token: data?.token, user};
  });
};
