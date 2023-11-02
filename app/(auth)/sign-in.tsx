import styled, {css} from '@emotion/native';
import {Button, Typography} from 'dooboo-ui';
import {Image} from 'expo-image';
import {Stack} from 'expo-router';

import useFuro from '../../src/hooks/useFuro';
import {IC_MASK} from '../../src/icons';
import {t} from '../../src/STRINGS';

const Container = styled.View`
  background-color: ${({theme}) => theme.bg.basic};

  padding: 0px 44px;
  flex: 1;
  align-items: center;
`;

export default function SignIn(): JSX.Element {
  const {loginWithRedirect} = useFuro();

  return (
    <Container>
      <Stack.Screen
        options={{
          title: t('SIGN_IN'),
        }}
      />
      <Typography.Heading2
        style={css`
          text-align: center;
          margin: 40px 0 8px;
        `}
      >
        Login
      </Typography.Heading2>

      <Image
        source={IC_MASK}
        style={{height: 48, width: 48, marginTop: 48, marginBottom: 60}}
      />

      <Button
        onPress={() => loginWithRedirect()}
        style={css`
          align-self: stretch;
          margin: 0px 16px 8px;
        `}
        styles={{
          container: css`
            padding: 16px 0;
          `,
          text: css`
            font-family: Pretendard-Bold;
          `,
        }}
        text="Login"
      />
    </Container>
  );
}
