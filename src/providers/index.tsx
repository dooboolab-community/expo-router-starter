import ErrorBoundary from 'react-native-error-boundary';
import FallbackComponent from 'react-native-error-boundary/lib/ErrorBoundary/FallbackComponent';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import type {ThemeType} from 'dooboo-ui';
import {DoobooProvider} from 'dooboo-ui';
import {RecoilRoot} from 'recoil';

import {theme} from '../theme';
import {handleErrorConsole} from '../utils/error';

interface Props {
  initialThemeType?: ThemeType;
  children?: JSX.Element;
}

const RootProvider = ({initialThemeType, children}: Props): JSX.Element => {
  return (
    <RecoilRoot>
      <DoobooProvider
        themeConfig={{
          initialThemeType: initialThemeType ?? undefined,
          customTheme: theme,
        }}
      >
        <ErrorBoundary
          onError={handleErrorConsole}
          FallbackComponent={FallbackComponent}
        >
          <ActionSheetProvider>{children}</ActionSheetProvider>
        </ErrorBoundary>
      </DoobooProvider>
    </RecoilRoot>
  );
};

export default RootProvider;
