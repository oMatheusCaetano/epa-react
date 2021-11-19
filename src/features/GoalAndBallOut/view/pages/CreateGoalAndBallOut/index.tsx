import React from 'react';

import * as C from '~/core/view/components';
import * as S from './styles';

const CreateGoalAndBallOut: React.FC = () => (
  <C.PageContainer
    title="Qual foi o chute de hoje?"
    actions={(
      <C.Link href="pesquisa_gol.php?cbotipo=1" toLegacyEpa>
        <C.IconButton styleAs={C.IconButtonType.RETURN} />
      </C.Link>
    )}
  >
    <C.SectionContainer title="Descreva o chute">
      <h6>asda</h6>
    </C.SectionContainer>
  </C.PageContainer>
);

export default CreateGoalAndBallOut;
