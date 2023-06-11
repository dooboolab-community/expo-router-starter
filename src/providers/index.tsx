import type {ReactElement} from 'react';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import type {ThemeType} from 'dooboo-ui';
import {DoobooProvider} from 'dooboo-ui';
import {RecoilRoot} from 'recoil';

import {theme} from '../theme';

interface Props {
  initialThemeType?: ThemeType;
  children?: ReactElement;
}

const RootProvider = ({initialThemeType, children}: Props): ReactElement => {
  return (
    <RecoilRoot>
      <DoobooProvider
        themeConfig={{
          initialThemeType: initialThemeType ?? undefined,
          customTheme: theme,
        }}
      >
        <ActionSheetProvider>{children}</ActionSheetProvider>
      </DoobooProvider>
    </RecoilRoot>
  );
};

export default RootProvider;
