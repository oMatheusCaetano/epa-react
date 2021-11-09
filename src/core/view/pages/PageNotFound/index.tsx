import React from 'react';

import * as Svg from '~/core/view/assets/images/svg';
import * as C from '~/core/view/components';
import * as S from './styles';

const PageNotFound: React.FC = () => (
  <S.Container>
    <S.StatusCode src={Svg.PageNotFoundImg} />

    <S.Message>
      Parece que a página que você está procurando não existe.
    </S.Message>

    <C.Link toLegacyEpa href="principal.php">
      <S.RedirectButton>Voltar para a página inicial</S.RedirectButton>
    </C.Link>
  </S.Container>
);

export default PageNotFound;
