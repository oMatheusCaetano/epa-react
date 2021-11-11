import React from 'react';

import * as S from './styles';

export interface PageHeaderProps {
  title?: string;
  subTitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle, children }) => (
  <S.Container>
    <S.Aside>
      {!!title?.length && <S.Title>{title}</S.Title>}
      {!!subTitle?.length && <S.SubTitle>{subTitle}</S.SubTitle>}
    </S.Aside>

    <S.Aside>{children}</S.Aside>
  </S.Container>
);

export default PageHeader;
