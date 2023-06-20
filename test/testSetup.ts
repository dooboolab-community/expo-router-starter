// import {GlobalWithFetchMock} from 'jest-fetch-mock';
/**
 * monkey patching the locale to avoid the error:
 * Something went wrong initializing the native ReactLocalization module
 * https://gist.github.com/MoOx/08b465c3eac9e36e683929532472d1e0
 */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

global.__reanimatedWorkletInit = jest.fn();

jest.mock('expo-font');
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// const customGlobal: any = global;

// customGlobal.fetch = require('jest-fetch-mock');
// customGlobal.fetchMock = customGlobal.fetch;

if (!global.Window) {
  Object.defineProperty(global, 'Window', {
    value: window.constructor,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}
