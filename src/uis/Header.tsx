import type {ReactElement} from 'react';
import {css} from '@emotion/native';
import {Icon} from 'dooboo-ui';
import CustomPressable from 'dooboo-ui/uis/CustomPressable';
import {useRouter} from 'expo-router';

import {delayPressIn} from '../utils/constants';

export default function HeaderBack(): ReactElement | null {
  const {back} = useRouter();

  return (
    <CustomPressable
      delayHoverIn={delayPressIn}
      onPress={back}
      style={[
        css`
          margin: 4px;
          padding: 9px;
          border-radius: 48px;
        `,
      ]}
      hitSlop={{top: 8, left: 8, right: 8, bottom: 8}}
    >
      <Icon name="CaretLeft" size={20} />
    </CustomPressable>
  );
}
