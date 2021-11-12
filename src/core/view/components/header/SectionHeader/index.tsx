import React from 'react';

import * as S from './styles';

export interface SectionHeaderProps {
  actions?: React.ReactNode;
  title?: string;
  subTitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subTitle, actions }) => (
  <S.Container>
    <S.Aside>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.Aside>

    <S.Aside>{actions}</S.Aside>
  </S.Container>
);

export default SectionHeader;
