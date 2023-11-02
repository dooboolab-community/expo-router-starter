# Expo Starter with Router

[![CI](https://github.com/dooboolab-community/expo-router-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/dooboolab-community/expo-router-starter/actions/workflows/ci.yml)

The `expo` template generated with `dooboo-cli`.

We believe that the fastest way to build the app is using [Expo](https://expo.io).
You can create app even more easily with the cli tool [dooboo-cli](https://github.com/dooboolab-community/dooboo-cli).

## Stacks used

- [react-native](https://github.com/facebook/react-native)
- [expo-router](https://expo.github.io/router)
- [emotion](https://emotion.sh)
- [dooboo-ui](https://github.com/dooboolab/dooboo-ui)
- [jest](https://github.com/facebook/jest)
- [react-native-testing-library](https://github.com/callstack/react-native-testing-library)
- [typescript](https://github.com/Microsoft/TypeScript)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [prettier](https://prettier.io)
- [react-native-web](https://github.com/necolas/react-native-web)
- [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization)

## Quick News

- In default, [dooboo-ui](https://github.com/dooboolab/dooboo-ui), a ui framework for [Expo](https://expo.io) is preinstalled in the project. Hope you like it 🧡.
- Default package manager is set to [bun](https://bun.sh) which is fastest in 2023.


## Stacks used for business logics

- [furo](https://iam.furo.one)
  - [firebase function](https://firebase.google.com/docs/functions)
    - Used to authorize with custom token with Furo
  - [google secret manager](https://cloud.google.com/secret-manager)
    - Used to upload service account key
- [firebase hosting](https://firebase.google.com/docs/hosting)
  - Set `read and write` permission to github action
    - https://github.com/FirebaseExtended/action-hosting-deploy/issues/108#issuecomment-885215418

### Notes

You need below role when deploying firebase function for your account.
<img width="557" alt="roles" src="https://github.com/dooboolab-community/expo-router-starter/assets/27461460/69dd49e0-2580-4dde-a3b4-13538f5d8d81">

- [Reference](https://github.com/firebase/firebase-tools/issues/5244)
