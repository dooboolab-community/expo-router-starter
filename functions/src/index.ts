import axios from 'axios';
import * as admin from 'firebase-admin';
import type {UserRecord} from 'firebase-admin/lib/auth/user-record';
import * as functions from 'firebase-functions';
import {defineSecret} from 'firebase-functions/params';
import {onCall} from 'firebase-functions/v2/https';

const serviceAccountKey = defineSecret('SERVICE_ACCOUNT_KEY');

const getAdminApp = (accountKey: string): admin.app.App => {
  const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(accountKey)),
      })
    : admin.app();

  return app;
};

type FuroAuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};

const authenticateFuroWithCode = async (
  code: string,
): Promise<FuroAuthResponse> => {
  const {data} = await axios.post(
    'https://api.furo.one/sessions/code/authenticate',
    {code},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        origin: 'exp://',
      },
    },
  );

  return data;
};

type FuroUser = {
  uid: string;
  migration_uid: string;
  project_id: string;
  email: string;
  name: Name;
  address: string;
  verified: Verified;
  social: string;
  sign_in_methods: SignInMethods;
  display_name: string;
  preferred_username: string;
  profile_url: string;
  thumbnail_url: string;
  about_me: string;
  current_location: string;
  wallet: Wallet;
  created_at: Date;
  modified_at: Date;
  photos: any[];
  urls: any[];
  last_sign_in_at: Date;
};

export type Name = {
  given_name: string;
  family_name: string;
  formatted: string;
};

export type SignInMethods = {
  google: Google;
};

export type Google = {
  enabled: boolean;
};

export type Verified = {
  email: boolean;
};

export type Wallet = {
  address: string;
  type: string;
};

const fetchFuroMe = async (token: string): Promise<FuroUser> => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const {data} = await axios.get('https://api.furo.one/users/me', config);

    return data;
  } catch (error: any) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

const updateOrCreateUser = async ({
  user,
  accountKey,
}: {
  user: FuroUser;
  accountKey: string;
}): Promise<UserRecord> => {
  const app = getAdminApp(accountKey);
  const auth = admin.auth(app);

  const properties = {
    uid: `furo:${user.uid}`,
    provider: 'FURO',
    displayName: user?.display_name,
    email: user?.email,
  };

  try {
    return await auth.updateUser(properties.uid, properties);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return await auth.createUser(properties);
    }

    throw error;
  }
};

exports.auth = onCall(
  {
    cors: [
      /firebase\.com$/,
      /https:\/\/[a-z0-9-]+\.web\.app$/,
      'http://localhost:8081',
      'https://expo.dooboolab.com',
      'https://api.furo.one',
    ],
    region: 'asia-northeast3',
    // https://console.cloud.google.com/security/secret-manager
    secrets: [serviceAccountKey],
  },
  async ({data}) => {
    const accountKey = serviceAccountKey.value();

    if (!data.code || !accountKey) {
      throw new functions.https.HttpsError('invalid-argument', 'Bad Request!');
    }

    try {
      const {access_token} = await authenticateFuroWithCode(data.code);
      const user = await fetchFuroMe(access_token);
      const authUser = await updateOrCreateUser({user, accountKey});
      const token = await admin.auth().createCustomToken(authUser.uid);

      return {token};
    } catch (error) {
      //? This part needs to be configured differently depending on the error handling.
      throw new functions.https.HttpsError(
        'internal',
        'An internal error occurred.',
      );
    }
  },
);
