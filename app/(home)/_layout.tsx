import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {css} from '@emotion/native';
import {useDooboo} from 'dooboo-ui';
import StatusBarBrightness from 'dooboo-ui/uis/StatusbarBrightness';
import {SplashScreen, Stack} from 'expo-router';

function Index(): React.ReactElement {
  const {assetLoaded} = useDooboo();

  if (!assetLoaded) {
    return <SplashScreen />;
  }

  return (
    <GestureHandlerRootView
      style={css`
        flex: 1;
      `}
    >
      <StatusBarBrightness />
      <Stack>{/* Note: Only modals are written here.  */}</Stack>
    </GestureHandlerRootView>
  );
}

export default Index;
