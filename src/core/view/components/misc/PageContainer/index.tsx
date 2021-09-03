import React from 'react';

import * as Styled from './styles';

interface Props {
  className?: string;
}

const PageContainer: React.FC<Props> = ({ className, children }) => (
  <Styled.PageContainer className={className}>
    {children}
  </Styled.PageContainer>
);

export default PageContainer;
