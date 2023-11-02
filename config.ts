import Constants from 'expo-constants';

const extra = Constants?.expoConfig?.extra;

export const ROOT_URL = extra?.ROOT_URL;
export const furoClientId = extra?.furoClientId;
export const appVersion = Constants?.expoConfig?.version;

const firebaseApiKey = extra?.firebaseApiKey;
const firebaseAuthDomain = extra?.firebaseAuthDomain;
const firebaseProjectId = extra?.firebaseProjectId;
const firebaseStorageBucket = extra?.firebaseStorageBucket;
const firebaseMessagingSenderId = extra?.firebaseMessagingSenderId;
const firebaseAppId = extra?.firebaseAppId;
const firebaseMeasurementId = extra?.firebaseMeasurementId;

export const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};
