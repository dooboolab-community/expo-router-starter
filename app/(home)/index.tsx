import type {ReactElement} from 'react';
import styled, {css} from '@emotion/native';
import {Button, useDooboo} from 'dooboo-ui';
import {Stack, useRouter} from 'expo-router';

import {t} from '../../src/STRINGS';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.bg.basic};
`;

const Content = styled.View`
  padding: 16px;

  justify-content: center;
  align-items: center;
`;

export default function Home(): ReactElement {
  const {theme} = useDooboo();
  const {push} = useRouter();

  return (
    <Container
      style={css`
        flex: 1;
        background-color: ${theme.bg.basic};
        justify-content: center;
        align-items: center;
      `}
    >
      <Stack.Screen
        options={{
          title: t('HOME'),
        }}
      />
      <Content>
        <Button
          style={css`
            margin-top: 28px;
            margin-bottom: 40px;
          `}
          text={t('SEE_DETAILS')}
          onPress={() => push('/details')}
        />
      </Content>
    </Container>
  );
}
