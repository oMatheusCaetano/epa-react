import React from 'react';

import { PageHeaderProps } from '~/core/view/components';

import * as C from '~/core/view/components';

export interface PageContainerProps extends PageHeaderProps {
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  showFilters?: boolean;
  filtersContainerId?: string;
}

const PageContainer: React.FC<PageContainerProps> = (props) => (
  <div>
    <C.Navbar />

    <main>
      <C.PageHeader {...props}>
        {props.actions}
      </C.PageHeader>
      <section className="mx-3">
        <C.FiltersContainer show={props.showFilters ?? false} id={props.filtersContainerId}>
          {props.filters}
        </C.FiltersContainer>

        <main>
          {props.children}
        </main>
      </section>
    </main>
  </div>
);

export default PageContainer;
