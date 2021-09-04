import React from 'react';
import SectionSeparator from '../SectionSeparator';

import * as Styled from './styles';

interface Props {
  title?: string;
  className?: string;
}

const SectionContainer: React.FC<Props> = ({ className, children, title }) => (
  <Styled.SectionContainer className={className}>
    {title?.length && <SectionSeparator title={title} />}
    <Styled.ChildrenContainer>
      {children}
    </Styled.ChildrenContainer>
  </Styled.SectionContainer>
);

export default SectionContainer;
