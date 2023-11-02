import {useCallback, useState} from 'react';
import {Linking, Platform} from 'react-native';
import type {User as AuthUser} from 'firebase/auth';

import {furoClientId} from '../../config';
import {signInUser} from '../apis/furo';

type ReturnType = {
  loginWithRedirect: () => Promise<void>;
  authenticateWithCode: (code: string) => Promise<{user: AuthUser} | undefined>;
  error: any;
};

const CLIENT_ID = furoClientId || '';
let fetching = false;

export default function useFuro(): ReturnType {
  const [error, setError] = useState<any>();
  const loginUrl = `https://auth.furo.one/login/${CLIENT_ID}`;

  const loginWithRedirect = async (): Promise<void> => {
    if (Platform.OS === 'web') {
      window.location.href = loginUrl;

      return;
    }

    Linking.openURL(loginUrl);
  };

  const authenticateWithCode = useCallback(
    async (code: string): Promise<{user: AuthUser} | undefined> => {
      if (!fetching) {
        fetching = true;
        try {
          const result = await signInUser(code);

          return result;
        } catch (err) {
          setError(err);
        } finally {
          fetching = false;
        }
      }
    },
    [],
  );

  return {loginWithRedirect, authenticateWithCode, error};
}
