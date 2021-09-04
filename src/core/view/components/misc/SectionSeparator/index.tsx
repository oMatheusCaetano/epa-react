import React from 'react';

import * as Styled from './styles';

interface IProps {
  className?: string;
  title: string;
}

const SectionSeparator: React.FC<IProps> = (props) => (
  <Styled.Container className={`${props.className}`}>
    <Styled.Left>
      <Styled.Title>{props.title}</Styled.Title>
    </Styled.Left>
    <Styled.Right />
  </Styled.Container>
);

export default SectionSeparator;
