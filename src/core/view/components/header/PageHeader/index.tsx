import React from 'react';

import * as S from './styles';

export interface PageHeaderProps {
  title?: string;
  subTitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle, children }) => (
  <S.Container>
    <S.Left>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.Left>

    <S.Aside>{children}</S.Aside>
  </S.Container>
);

export default PageHeader;
