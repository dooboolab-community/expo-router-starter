import type {ReactElement} from 'react';
import styled, {css} from '@emotion/native';
import {Typography} from 'dooboo-ui';
import {Stack} from 'expo-router';

import {t} from '../../src/STRINGS';

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  padding: 16px;
`;

export default function Details(): ReactElement {
  return (
    <Container
      style={css`
        flex: 1;
      `}
    >
      <Stack.Screen
        options={{
          title: t('DETAILS'),
        }}
      />
      <Content>
        <Typography.Body1>{t('DETAILS')}</Typography.Body1>
      </Content>
    </Container>
  );
}
