import React from 'react';

import * as Styled from './styles';

const Measure: React.FC = () => (
  <Styled.Container>
    <Styled.Header>
      <p>FIB - Felicidade Interna Bruta</p>
    </Styled.Header>

    <Styled.Main>
      <Styled.Left>
        <Styled.LeftHeader>
          <Styled.UserHumor>
            <p>Humor</p>
          </Styled.UserHumor>

          <Styled.UserHumorIdentification>
            <p>Mais identifica</p>
          </Styled.UserHumorIdentification>
        </Styled.LeftHeader>

        <Styled.UserSpace>
          <p>Espaço</p>
        </Styled.UserSpace>

        <Styled.UserGoal>
          <p>Meta</p>
        </Styled.UserGoal>
      </Styled.Left>

      <Styled.Right>
        <p>FIB</p>
      </Styled.Right>
    </Styled.Main>
  </Styled.Container>
);

export default Measure;
