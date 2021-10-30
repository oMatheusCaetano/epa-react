import React from 'react';
import { Navbar } from '~/core/view/components';

import * as Styled from './styles';

interface Props {
  className?: string;
}

const PageContainer: React.FC<Props> = ({ className, children }) => (
  <>
    <Navbar />
    <Styled.PageContainer className={className}>
      {children}
    </Styled.PageContainer>
  </>
);

export default PageContainer;
