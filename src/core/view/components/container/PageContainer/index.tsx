import React from 'react';

import { PageHeaderProps } from '~/core/view/components';

import * as C from '~/core/view/components';
// import { Container } from './styles';

export interface PageContainerProps extends PageHeaderProps {
  pageActions?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = (props) => (
  <div>
    <C.Navbar />

    <main>
      <C.PageHeader {...props}>
        {props.pageActions}
      </C.PageHeader>
    </main>
  </div>
);

export default PageContainer;
